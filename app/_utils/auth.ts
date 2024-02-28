// NextJS
import { NextRequest, NextResponse } from "next/server";

// JWT
import { encrypt, decrypt } from "./jwt";

const secretKey = process.env.NEXT_APP_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

// Auth
export async function updateAuthCookie(
	NextRequest: NextRequest,
	NextResponse: NextResponse
) {
	const session = NextRequest.cookies.get("authSession")?.value;
	if (!session) {
		return {
			success: 0,
			response: NextResponse,
		};
	}

	const expiresDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days
	const decryptedSession = await decrypt(session);

	NextResponse.cookies.set({
		name: "authSession",
		value: await encrypt(decryptedSession, expiresDate),
		httpOnly: true,
		expires: expiresDate,
	});

	return {
		success: 1,
		response: NextResponse,
	};
}
