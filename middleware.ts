import { NextRequest, NextResponse } from "next/server";
import {
	updateAuthCookie,
	setCookie,
	setCookieFromResponse,
	setJWTCookieFromResponse,
} from "@/app/_utils/lib";

export async function middleware(request: NextRequest) {
	// Redirections
	if (request.nextUrl.pathname === "/auth") {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	// Other
	let response = NextResponse.next();
	response = (
		await updateAuthCookie(request as NextRequest, response as NextResponse)
	).response;

	return response;
}

export const config = {
	matcher: ["/auth", "/auth/signin"],
};
