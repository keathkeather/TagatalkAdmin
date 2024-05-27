import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./app/api/auth";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    console.log(`middleware Token: ${token}`)
    const verifiedToken = token && (await verifyToken(String(token)).catch((error) => { console.log(error) }));

    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname.startsWith('/login')) {
        if (verifiedToken) {
            // If the token is verified, redirect to the dashboard
            return NextResponse.redirect(new URL('/dashboard', req.url));
        } else if (req.nextUrl.pathname !== '/login') {
            // If the token is not verified, and the route is not login, redirect to login
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    if (!verifiedToken && req.nextUrl.pathname.startsWith('/dashboard')) {
        // If trying to access dashboard without verified token, redirect to login
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard', '/login']
}
