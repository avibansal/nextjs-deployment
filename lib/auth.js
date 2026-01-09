import { cookies } from "next/headers";
import Session from "@/models/auth/session";
import dbConnect from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/auth/user";

const COOKIE_NAME = "session_token";

export async function createSession(userId, ipAddress, userAgent) {
    await dbConnect();
    const token = uuidv4();
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await Session.create({
        token,
        user: userId,
        ipAddress,
        userAgent,
        expireAt
    });

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: expireAt
    })
    return session;
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    console.log("token", token);
    if (!token) return null;

    await dbConnect();

    const existingSession = await Session.findOne({
        token,
        expireAt: {
            $gt: Date.now()
        }
    }).populate({ path: "user", model: User, select: "-password" });

    console.log("Session User:", existingSession?.user);

    if (!existingSession) return null;

    return existingSession;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    console.log("token", token);
    if (!token) return false;

    await dbConnect();
    await Session.deleteOne({ token });

    cookieStore.delete(COOKIE_NAME);

    return true;
}