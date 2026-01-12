"use client";
import React from 'react'
import Image from 'next/image'

import {
    IconDashboard,
    IconUser,
    IconSettings,
    IconBell,
    IconChartBar,
    IconFileText,
    IconLogout,
} from "@tabler/icons-react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import { usePathname } from 'next/navigation';
const menuItems = [
    { label: "Dashboard", icon: IconDashboard },
    { label: "Profile", icon: IconUser },
    { label: "Analytics", icon: IconChartBar },
    { label: "Notifications", icon: IconBell },
    { label: "Reports", icon: IconFileText },
    { label: "Settings", icon: IconSettings },
];
export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    if (pathname === '/signin' || pathname === '/logout') return null;

    return (
        <div className="sticky top-0 h-screen">
            <div
                className={`h-screen bg-neutral-200 border border-neutral-400 shadow-2xl transition-all duration-300 relative flex flex-col justify-between ${isOpen ? "w-[200px]" : "w-[60px]"}`}>
                <button onClick={() => setIsOpen(!isOpen)} className='absolute flex justify-center items-center border border-neutral-400 top-20 right-[-5px] w-[20px] h-[20px] bg-neutral-200 rounded-full'>
                    {isOpen ? <IconChevronLeft /> : <IconChevronRight />}
                </button>
                <div>
                    <div className='p-2 bg-cyan-700 flex gap-5 items-center'>
                        <Image src="/logo.png" alt="Logo" width={40} height={40} />
                        {isOpen && <span
                            className="text-xl font-bold text-white"
                        >
                            Avi
                        </span>}
                    </div>
                    {menuItems.map((item) => (
                        <div key={item.label} className='flex gap-5 items-center px-4 py-2 hover:bg-neutral-300 cursor-pointer'>
                            <item.icon />
                            {isOpen && (
                                <span>
                                    {item.label}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div
                    key="Logout"
                    onClick={async () => {
                        const res = await fetch('/api/logout', { method: 'POST' });
                        if (res.ok) window.location.href = '/signin';
                    }}
                    className={`flex gap-5 items-center px-4 py-2 bg-cyan-700 hover:bg-cyan-800 transition-colors cursor-pointer mb-2  ${isOpen ? "mr-2 ml-2" : "mr-0 ml-0"}`}>
                    <IconLogout className="text-white" />
                    {isOpen && <span
                        className="text-xl font-bold text-white"
                    >
                        Logout
                    </span>}
                </div>
            </div >
        </div>
    )
}
