"use client"
import { NextResponse } from "next/server";
import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";

const DecorativeGrid = () => (
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
)

const FormInput = ({ id, label, name, type, placeholder, required = true }) => (
    <div className='flex flex-col gap-2'>
        <label className='text-stone-700 font-semibold' htmlFor={id}>
            {label}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className='p-2 rounded-md border border-neutral-400 outline-none focus:border-stone-500 focus:shadow-[0_0_0_1px_rgb(120,113,108)] transition'
        />
    </div>

)
export default function page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        setError(null);
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
                if (data.error) {
                    setError(data.error);
                } else {
                    router.push("/todo")
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <div className='flex flex-col items-center justify-center bg-linear-to-br from-zinc-200 via-neutral-200 to-stone-200 h-screen'>
            <DecorativeGrid />
            <div className='relative z-10 w-3/12'>
                <h1 className="text-3xl font-bold text-stone-700 font-sans p-6 text-center">
                    Sign In to Avi Studio
                </h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-6'>
                    <FormInput
                        label="Email Address"
                        name="username"
                        type="email"
                        placeholder="Email Address"
                        id="username"
                        required
                    />
                    <FormInput
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        id="password"
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className='p-2 bg-black text-amber-50 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500 disabled:opacity-50 transition-opacity'
                    >
                        {isLoading ? "Signing In..." : "Sign In"}
                    </button>

                    {/* Reserved space for error message to prevent the box from jumping */}
                    <div className="h-14 mt-1 transition-all">
                        {error && (
                            <div className="p-3 font-bold bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}
