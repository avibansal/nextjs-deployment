import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Task from "@/models/task";

export async function GET(request) {
    try {
        await dbConnect()
        const tasks = await Task.find({ isDeleted: { $ne: true } })

        return NextResponse.json({
            message: "GET request received",
            tasks
        })
    }
    catch (error) {
        return NextResponse.json({
            message: "Error in GET request"
        })
    }
}

export async function POST(request) {
    try {
        await dbConnect()
        const body = await request.json()
        const task = await Task.create(body)
        return NextResponse.json({
            message: "POST request received",
            content: task
        })

    }
    catch (error) {
        return NextResponse.json({
            message: "Error in POST request",
            error: error.message
        })
    }
}

export async function DELETE(request) {
    try {
        await dbConnect()
        const id = request.nextUrl.searchParams.get("id")
        if (!id) {
            return NextResponse.json({
                message: "ID is required for deletion (e.g., ?id=...)",
                status: 400
            })
        }
        const task = await Task.findByIdAndUpdate(id, { isDeleted: true },
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
        return NextResponse.json({
            message: "Error in DELETE request",
            error: error.message
        })
    }
}

export async function PUT(request) {
    try {
        await dbConnect()
        const body = await request.json()
        const id = body.id

        const task = await Task.findOneAndUpdate(
            { _id: id, isDeleted: { $ne: true } },
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
        return NextResponse.json({
            message: "Error in PUT request",
            error: error.message
        })
    }
}
