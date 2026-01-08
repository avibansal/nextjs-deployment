import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import logAudit from "@/lib/audit.js"
import User from "@/models/auth/user.js"
import bcrypt from "bcryptjs"

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, password, name } = body;

        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            role: "user"
        });

        await logAudit({
            user: newUser._id,
            action: "USER_REGISTER",
            metadata: {
                name,
                email,
                role: "user"
            },
            ipAddress: request.headers.get("x-forwarded-for") || "unknown"
        })

        return NextResponse.json({
            message: "User registered successfully",
        }, { status: 201 })
    }
    catch (error) {
        console.error("Failed to register user:", error)
        return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
    }
}