import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("session_token")?.value;
    const { pathname } = request.nextUrl;

    // 1. If user is logged in and tries to access /signin, redirect to /
    if (token && pathname === "/signin") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. Protect routes logic
    const protectedRoutes = ["/", "/todo", "/youtube"];
    const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(route + "/"));

    if (!token && isProtectedRoute) {
        console.log("No session token found in middleware, redirecting to /signin");
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

// This control when middleware runs
export const config = {
    matcher: ["/", "/todo/:path*", "/youtube/:path*", "/signin"],
};
