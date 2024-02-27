// NextJS
import { NextRequest, NextResponse } from "next/server";

// AuthJS
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Prisma
import prisma from "@/prisma/client";

// Zod
import { z } from "zod";
import { loginSchema } from "@/schemas/auth";

// Utils
import { getUserByEmail, getUserByUsername } from "@/app/_utils/user";

export async function POST(request: NextRequest) {
	// Validating the request body
	if (
		!request.headers.get("Content-Length") ||
		request.headers.get("Content-Length") === "0"
	) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Request body is required",
				data: { request: request },
			},
			{ status: 400 }
		);
	}

	const body = await request.json();
	const validation = loginSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(
			{
				success: 0,
				reason: validation.error.errors[0].message,
				data: { body: body },
			},
			{ status: 400 }
		);
	}

	try {
		await signIn("credentials", {
			usernameOrEmail: body.usernameOrEmail,
			password: body.password,
			redirect: false,
		});

		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: { body: body },
			},
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin": {
					return NextResponse.json(
						{
							success: 0,
							reason: "Invalid Credentials",
							data: { body: body },
						},
						{ status: 400 }
					);
				}
				default: {
					return NextResponse.json(
						{
							success: 0,
							reason: "Something went wrong",
							data: { body: body },
						},
						{ status: 400 }
					);
				}
			}
		}

		throw error;
	}
}
