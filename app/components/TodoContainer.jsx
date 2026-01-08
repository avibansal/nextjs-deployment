"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { DraggableItem } from './DraggableItem.jsx'
import { AddItem } from './AddItem.jsx'

export const TodoContainer = ({ heading, tasks, setTaskUpdated, taskUpdated }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: heading,
    })
    const [open, setOpen] = useState(false);

    // Close on ESC
    useEffect(() => {
        const handler = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    return (
        <div ref={setNodeRef} className={`w-[400px] h-[500px] p-2  transition-all border-2 border-transparent `}>
            <span className={`${heading === 'pending' ? 'bg-rose-700' : heading === 'inprogress' ? 'bg-yellow-600' : 'bg-emerald-700'} font-bold flex justify-between items-center p-2 mb-4 text-white rounded-lg uppercase tracking-wider`}>
                {heading} ({tasks?.length || 0})
                {heading == 'pending' && <button onClick={() => setOpen(true)} className="text-xl font-semibold ">＋</button>}

                {open && (
                    <AddItem setOpen={setOpen} setTaskUpdated={setTaskUpdated} taskUpdated={taskUpdated} />
                )}
            </span>
            <div className={`todo-container p-2 rounded-xl transition-colors ${isOver ? 'bg-neutral-100' : heading === 'pending' ? 'bg-rose-50/50' : heading === 'inprogress' ? 'bg-yellow-50/50' : 'bg-emerald-50/50'}`}>
                <ul className="flex flex-col gap-3 max-h-[500px] overflow-y-auto overflow-x-hidden pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400">
                    {tasks && tasks.length > 0 ? tasks.map((task) => (
                        <DraggableItem key={task._id} task={task} heading={heading} />
                    )) : (
                        <div className="text-zinc-600 text-center mt-2 text-sm italic">Empty</div>
                    )}
                </ul>
            </div>
        </div >
    )
}
