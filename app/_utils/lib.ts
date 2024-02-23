// NextJS
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// React
import { useEffect, useState } from "react";

// Jose
import { SignJWT, jwtVerify } from "jose";

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

// Cookies
export async function setCookie(name: string, value: any, expires: number) {
	let expiresDate = new Date(Date.now() + expires * 1000);

	cookies().set({
		name: name,
		value: value,
		httpOnly: true,
		expires: expiresDate,
	});
}

export async function setCookieFromResponse(
	NextResponse: NextResponse,
	name: string,
	value: any,
	expires: number
) {
	let expiresDate = new Date(Date.now() + expires * 1000);

	NextResponse.cookies.set({
		name: name,
		value: value,
		httpOnly: true,
		expires: expiresDate,
	});

	return {
		success: 1,
		response: NextResponse,
	};
}

export async function setJWTCookie(name: string, value: any, expires: number) {
	let expiresDate = new Date(Date.now() + expires * 1000);

	cookies().set({
		name: name,
		value: await encrypt(value, expiresDate),
		httpOnly: true,
		expires: expiresDate,
	});
}

export async function setJWTCookieFromResponse(
	NextResponse: NextResponse,
	name: string,
	value: any,
	expires: number
) {
	let expiresDate = new Date(Date.now() + expires * 1000);

	const response = NextResponse;
	response.cookies.set({
		name: name,
		value: await encrypt(value, expiresDate),
		httpOnly: true,
		expires: expiresDate,
	});

	return {
		success: 1,
		response: response,
	};
}

export async function getCookie(name: string) {
	const cookie = cookies().get(name);

	if (!cookie?.value) {
		return null;
	}

	return cookie.value;
}

export async function getJWTCookie(name: string) {
	const cookie = cookies().get(name);

	if (!cookie?.value) {
		return null;
	}

	return await decrypt(cookie.value);
}

// JWT
export async function encrypt(payload: any, expiresDate: Date) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(expiresDate)
		// .setExpirationTime("10 sec from now")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	try {
		const { payload } = await jwtVerify(input, key, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.warn(error);
		return false;
	}
}
