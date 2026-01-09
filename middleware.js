import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("session_token")?.value;
    const { pathname } = request.nextUrl;

    // Check if the path starts with /todo
    // Using startsWith is generally safer than includes for route protection
    if (!token) {
        console.log("No session token found in middleware, redirecting to /signin");
        return NextResponse.redirect(new URL("/signin", request.url));

    }

    return NextResponse.next();
}

export const config = {
    // Only run middleware on paths that start with /todo
    matcher: ["/", "/todo/:path*"],
};
