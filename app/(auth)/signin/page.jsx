"use client"
import { NextResponse } from "next/server";
import React from 'react'
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
        <label className='text-cyan-900 font-semibold' htmlFor={id}>
            {label}
        </label>
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className='p-2 rounded-md border border-cyan-700 outline-none focus:border-cyan-500 focus:shadow-[0_0_0_1px_rgb(120,113,108)] transition'
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
                    window.location.href = "/";
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
        <div className="flex flex-row w-full h-screen">
            <div className='flex-1 flex flex-col items-center justify-center bg-zinc-100'>
                {/* <DecorativeGrid /> */}
                <div className='relative z-10 w-full max-w-md'>
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

                        <div className="flex items-center gap-2 my-1">
                            <div className="flex-1 h-px bg-stone-300"></div>
                            <span className="text-stone-500 text-xs font-semibold">OR</span>
                            <div className="flex-1 h-px bg-stone-300"></div>
                        </div>

                        <a
                            href="/api/auth/google"
                            className='p-2 flex items-center justify-center gap-2 bg-white text-stone-700 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors'
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </a>

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
            <div className="flex-1 relative">
                <Image src="/signin.png" alt="Signin background" fill className="object-cover" priority />
            </div>
        </div>
    )
}
