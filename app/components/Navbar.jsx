import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSession } from '@/lib/auth'
import { LogoutButton } from './LogoutButton'

export const Navbar = async () => {
    const session = await getSession();

    const links = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Todo",
            href: "/todo"
        },
        {
            name: "Youtube",
            href: "/youtube"
        }
    ]

    return (
        <div className="sticky top-4 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md rounded-full px-6 py-2 max-w-2xl mx-auto border border-neutral-200 shadow-lg">

            <Image
                src="/logo.png" alt="logo" width={30} height={30} className='rounded-full' />

            <div className='flex items-center gap-4 text-sm text-neutral-500 mr-10'>
                {links.map((link) => (
                    <Link className='hover:text-neutral-900 transition' href={link.href} key={link.name}>
                        {link.name}
                    </Link>
                ))}
                {session ? (
                    <LogoutButton />
                ) : (
                    <Link className='hover:text-neutral-900 transition' href="/signin">Sign In</Link>
                )}
            </div>
        </div>
    )
}