// NextJS
import { NextRequest, NextResponse } from "next/server";

// AuthJS
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Routes
const publicRoutes = ["/", "/auth/login", "/auth/register", "/auth/error"];
const apiAuthPrefix = "/api/auth";

// AuthJS
const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
	const session = req.auth;
	const pathname = req.nextUrl.pathname;
	let modifiableResponse = NextResponse.next();

	// Redirections
	if (pathname === "/auth") {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	if (
		!session &&
		!publicRoutes.includes(pathname) &&
		!pathname.startsWith(apiAuthPrefix)
	) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	// Returning response
	return modifiableResponse;
});

export const config = {
	matcher: ["/((?!_next/image|_next/static|favicon.ico).*)", "/"],
};
