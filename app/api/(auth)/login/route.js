import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import logAudit from "@/lib/audit.js"
import User from "@/models/auth/user.js"
import bcrypt from "bcryptjs"
import { createSession } from "@/lib/auth.js"
import Session from "@/models/auth/session.js"

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Create Session
        const ipAddress = request.headers.get("x-forwarded-for") || "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";

        const existingSession = await Session.findOne({
            user: user._id,
            userAgent,
            ipAddress
        });

        if (existingSession) {
            return NextResponse.json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                session: existingSession
            });
        }
        const session = await createSession(user._id, ipAddress, userAgent);

        // Log Audit
        await logAudit({
            user: user._id,
            action: "USER_LOGIN",
            metadata: {
                method: "password"
            },
            ipAddress
        })

        return NextResponse.json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            session
        });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}