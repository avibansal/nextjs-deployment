import { NextResponse } from "next/server";
import dbConnect from "@/lib/db.js";
import Task from "@/models/todo/task.js";
import { getSession } from "@/lib/auth.js";

export async function GET(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect()
        const tasks = await Task.find({ user: session.user._id, isDeleted: { $ne: true } })

        return NextResponse.json({
            message: "GET request received",
            tasks
        })
    }
    catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({
            message: "Error in GET request"
        }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect()
        const body = await request.json()
        const task = await Task.create({ ...body, user: session.user._id })
        return NextResponse.json({
            message: "POST request received",
            content: task
        })

    }
    catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({
            message: "Error in POST request",
            error: error.message
        }, { status: 500 })
    }
}

export async function DELETE(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect()
        const id = request.nextUrl.searchParams.get("id")
        if (!id) {
            return NextResponse.json({
                message: "ID is required for deletion (e.g., ?id=...)",
                status: 400
            })
        }
        const task = await Task.findOneAndUpdate(
            { _id: id, user: session.user._id },
            { isDeleted: true },
            {
                new: true,
                runValidators: true
            }
        )
        if (!task) {
            return NextResponse.json({
                message: "Task not found",
                status: 404
            })
        }
        return NextResponse.json({
            message: "DELETE request received",
            content: task
        })
    }
    catch (error) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json({
            message: "Error in DELETE request",
            error: error.message
        }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect()
        const body = await request.json()
        const id = body.id

        const task = await Task.findOneAndUpdate(
            { _id: id, user: session.user._id, isDeleted: { $ne: true } },
            body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!task) {
            return NextResponse.json({
                message: "Task not found",
                status: 404
            })
        }
        return NextResponse.json({
            message: "Task updated successfully",
            content: task
        })

    }
    catch (error) {
        console.error("Error in PUT request:", error);
        return NextResponse.json({
            message: "Error in PUT request",
            error: error.message
        }, { status: 500 })
    }
}
