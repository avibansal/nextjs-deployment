import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

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
    // Define the scopes needed
    const scopes = [
        "openid",
        "email",
        "profile",
        "https://www.googleapis.com/auth/youtube.readonly" // YouTube view access
    ];

    const authorizeUrl = client.generateAuthUrl({
        access_type: "offline", // Required to get a refresh token
        scope: scopes,
        prompt: "consent" // Force show consent screen to ensure refresh token
    });

    return NextResponse.redirect(authorizeUrl);
}
