"use client";
export default function Logout() {
    const handleLogout = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/logout", {
            method: "POST",
        });
        if (response.ok) {
            window.location.href = "/signin";
        }
    };
    return (
        <div>
            <h1>Logout</h1>
            <form onSubmit={handleLogout}>
                <button className="btn btn-primary" type="submit">Logout</button>
            </form>
        </div>
    );
}