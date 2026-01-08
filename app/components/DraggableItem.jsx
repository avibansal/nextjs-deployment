"use client"
import React from 'react'
import { useDraggable } from '@dnd-kit/core'

export const DraggableItem = ({ task, heading }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task._id
    })

    // If we are using DragOverlay, the transform is only applied to the overlay.
    // The original item in the list stays put but can be styled (e.g., lower opacity).
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className={`flex flex-col gap-2 p-2 border-2 bg-neutral-100 mb-2 border-neutral-300 cursor-grab active:cursor-grabbing shadow-2xs overflow-auto`}>
                <span className="font-bold text-neutral-900">{task.title}</span>
                <div className='flex gap-2 items-center justify-between'>
                    <span className='text-sm flex items-center justify-center text-neutral-700 bg-neutral-200 p-1'>
                        {task.priority}
                    </span>
                    <p className="text-sm text-neutral-700">
                        {task.createdAt ? new Date(task.createdAt).toDateString() : "No Date"}
                    </p>
                </div>
            </div>
        </div>
    )
}
