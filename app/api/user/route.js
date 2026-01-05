import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import User from "@/models/user";

export async function POST(request) {
    try {
        await dbConnect()
        const body = await request.json()
        const user = await User.create(body)
        return NextResponse.json({
            message: "User created successfully",
            content: user
        })
    }
    catch (error) {
        return NextResponse.json({
            message: "Error in POST request",
            error: error.message
        })
    }
}

