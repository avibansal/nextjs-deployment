import React, { useState } from 'react'

export const AddItem = ({ setOpen, setTaskUpdated, taskUpdated }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');

    const updateTask = async () => {
        try {
            const res = await fetch("/api/todo_events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, priority })
            })
            const data = await res.json()
            setOpen(false)
            setTaskUpdated(!taskUpdated)
        } catch (error) {
            console.error("Update failed:", error)
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[420px] rounded-2xl bg-black p-6 shadow-2xl transition-all duration-200 scale-100"
            >
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Add New Task</h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-zinc-500 hover:text-zinc-800"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="mt-4 flex items-center gap-4">
                    <label
                        htmlFor="title"
                        className="w-20 text-sm font-medium text-white"
                    >
                        Title
                    </label>

                    <input
                        id="title"
                        placeholder="Enter title..."
                        className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mt-4 flex items-center gap-4">
                    <label
                        htmlFor="priority"
                        className="w-20 text-sm font-medium text-white"
                    >
                        Priority
                    </label>

                    <input
                        id="priority"
                        placeholder="Enter priority..."
                        className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                </div>


                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={() => setOpen(false)} className="text-sm">
                        Cancel
                    </button>
                    <button onClick={() => updateTask()} className="rounded-lg bg-zinc-900 px-4 py-2 text-sm text-white">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
