// NextJS
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// JWT
import { encrypt, decrypt } from "./jwt";

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
