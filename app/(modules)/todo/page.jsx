"use client"
import React, { useState, useEffect } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { TodoContainer } from '../../components/TodoContainer.jsx'
import { DraggableItem } from '../../components/DraggableItem.jsx'

export default function Page() {
    const [tasks, setTasks] = useState([])
    const [activeId, setActiveId] = useState(null)
    const [taskUpdated, setTaskUpdated] = useState(false)

    const fetchTasks = async () => {
        const res = await fetch("/api/todo_events")
        const data = await res.json()
        setTasks(data.tasks || [])
    }

    useEffect(() => {
        fetchTasks()
    }, [taskUpdated])

    function handleDragStart(event) {
        setActiveId(event.active.id)
    }

    async function handleDragEnd(event) {
        setActiveId(null)
        const { active, over } = event

        if (over && active.id !== over.id) {
            const taskId = active.id
            const newStatus = over.id

            setTasks(prev => prev.map(task =>
                task._id === taskId ? { ...task, status: newStatus } : task
            ))

            try {
                await fetch("/api/todo_events", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: taskId, status: newStatus })
                })
            } catch (error) {
                console.error("Update failed:", error)
                fetchTasks()
            }
        }
    }

    const activeTask = activeId ? tasks.find(t => t._id === activeId) : null

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className='flex flex-col items-center bg-linear-to-br from-zinc-200 via-neutral-200 to-stone-200 h-screen'>
                <div className="inline-block bg-linear-to-br from-white via-zinc-50 to-neutral-100/80 px-10 py-6 rounded-3xl shadow-lg ring-1 ring-neutral-200/30 mt-6">
                    <h1 className="text-5xl font-bold text-stone-700 mb-3 font-sans">
                        Weekly Todo List
                    </h1>
                    <div className="flex gap-6 justify-center text-sm">
                        <div>
                            <span className="font-bold text-neutral-900">{tasks.length}</span>
                            <span className="text-neutral-500 ml-1">Tasks</span>
                        </div>
                        <div className="w-px bg-neutral-300"></div>
                        <div>
                            <span className="font-bold text-emerald-600">{tasks.filter(t => t.status === "completed").length}</span>
                            <span className="text-neutral-500 ml-1">Done</span>
                        </div>
                    </div>
                </div>
                <div className='flex gap-6 p-10 justify-center h-screen'>
                    <TodoContainer
                        heading="pending"
                        tasks={tasks.filter(t => t.status === "pending")}
                        setTaskUpdated={setTaskUpdated}
                        taskUpdated={taskUpdated}
                    />
                    <TodoContainer
                        heading="inprogress"
                        tasks={tasks.filter(t => t.status === "inprogress")}
                    />
                    <TodoContainer
                        heading="completed"
                        tasks={tasks.filter(t => t.status === "completed")}
                    />
                </div>
            </div>

            <DragOverlay>
                {activeId && activeTask ? (
                    <DraggableItem task={activeTask} heading={activeTask.status} />
                ) : null}
            </DragOverlay>
        </DndContext >
    )
}
