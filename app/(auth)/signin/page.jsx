"use client"
import { NextResponse } from "next/server";
import React from 'react'
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get('username')
        const password = formData.get('password')

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                router.push("/todo")
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className='flex flex-col items-center justify-center bg-linear-to-br from-zinc-200 via-neutral-200 to-stone-200 h-screen'>
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Horizontal lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-30">
                    <div className="border-t border-dotted border-stone-300" />
                    <div className="border-t border-dotted border-stone-300" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-between py-35">
                    <div className="border-t border-dotted border-stone-300" />
                    <div className="border-t border-dotted border-stone-300" />
                </div>

                {/* Vertical lines */}
                <div className="absolute inset-0 flex justify-between px-90">
                    <div className="border-l border-dotted border-stone-300" />
                    <div className="border-l border-dotted border-stone-300" />
                </div>

                <div className="absolute inset-0 flex justify-between px-85">
                    <div className="border-l border-dotted border-stone-300" />
                    <div className="border-l border-dotted border-stone-300" />
                </div>
            </div>


            <div className='relative z-10 w-3/12'>
                <h1 className="text-3xl font-bold text-stone-700 font-sans p-6">
                    Sign In to Avi Studio
                </h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-6'>
                    <label className='text-stone-700 font-semibold' htmlFor="username">
                        Email Address:
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="email"
                        placeholder="Email Address"
                        className='p-2 rounded-md border border-neutral-400 outline-none focus:border-stone-500 focus:shadow-[0_0_0_1px_rgb(120,113,108)] transition'
                    />

                    <label className='text-stone-700 font-semibold' htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className='p-2 rounded-md border border-neutral-400 outline-none focus:border-stone-500 focus:shadow-[0_0_0_1px_rgb(120,113,108)] transition'
                    />

                    <button
                        type="submit"
                        className='p-2 bg-black text-amber-50 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500'
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
