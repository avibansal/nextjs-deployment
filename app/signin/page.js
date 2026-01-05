"use client"
import React from 'react'

export default function page() {
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const email = formData.get('username')
        const password = formData.get('password')

        console.log(email, password)
    }

    return (
        <div className='flex flex-col items-center justify-center bg-linear-to-br from-zinc-200 via-neutral-200 to-stone-200 h-screen'>
            <div className='w-3/12'>
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
                        className='p-2 border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500'
                    />

                    <label className='text-stone-700 font-semibold' htmlFor="password">
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className='p-2 border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500'
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
