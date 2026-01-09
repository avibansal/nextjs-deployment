import { NextResponse } from "next/server";
import { getSession, deleteSession } from "@/lib/auth";
import logAudit from "@/lib/audit";

export async function POST(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await deleteSession();

        // Log Audit
        await logAudit({
            user: session.user._id,
            action: "USER_LOGOUT",
            metadata: {
                method: "password"
            },
            ipAddress: request.headers.get("x-forwarded-for") || "unknown"
        })

        return NextResponse.json({ message: "Logout successful" });

    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}   