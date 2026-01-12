import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import User from "@/models/auth/user";
import dbConnect from "@/lib/db";
import { createSession } from "@/lib/auth";
import logAudit from "@/lib/audit";

export async function GET(request) {
    const origin = request.nextUrl.origin;
    const redirectUri = process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`
        : `${origin}/api/auth/callback/google`;

    const client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectUri
    );
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    try {
        await dbConnect();

        // 1. Exchange code for tokens
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);

        // 2. Get user info from Google
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture: avatarUrl } = payload;

        // 3. Find or create user
        let user = await User.findOne({
            $or: [{ googleId }, { email }]
        });

        if (!user) {
            // New user via Google SSO
            user = await User.create({
                email,
                name,
                googleId,
                avatarUrl,
                googleAccessToken: tokens.access_token,
                googleRefreshToken: tokens.refresh_token,
            });
        } else {
            // Update existing user with Google info
            user.googleId = googleId;
            user.googleAccessToken = tokens.access_token;
            if (tokens.refresh_token) {
                user.googleRefreshToken = tokens.refresh_token;
            }
            if (!user.avatarUrl) user.avatarUrl = avatarUrl;
            await user.save();
        }

        // 4. Create Session
        const ipAddress = request.headers.get("x-forwarded-for") || "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";
        await createSession(user._id, ipAddress, userAgent);

        // 5. Log Audit
        await logAudit({
            user: user._id,
            action: "GOOGLE_SSO_LOGIN",
            metadata: {
                hasYouTubeAccess: true
            },
            ipAddress
        });

        // 6. Redirect to Home
        return NextResponse.redirect(new URL("/", request.nextUrl.origin));

    } catch (error) {
        console.error("Google SSO Callback Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
