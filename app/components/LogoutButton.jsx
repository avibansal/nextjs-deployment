"use client";
import React from 'react';

export const LogoutButton = () => {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });
            if (response.ok) {
                window.location.href = "/signin";
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className='hover:text-neutral-900 transition-colors'
        >
            Sign Out
        </button>
    );
};
