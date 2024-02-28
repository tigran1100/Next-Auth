// NextJS
import { NextRequest, NextResponse } from "next/server";

// NextAuth
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// Prisma
import prisma from "@/prisma/client";

// Zod
import { z } from "zod";
import { registerSchema } from "@/schemas/auth";

// Bcrypt
import bcrypt from "bcrypt";

// Utils
import { getUserByEmail, getUserByUsername } from "@/app/_utils/user";
import { generateVerificationToken } from "@/app/_utils/tokens";

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
	const validation = registerSchema.safeParse(body);

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

	// Checking if email exists
	const usernameCheck = await getUserByUsername(body.username);

	if (usernameCheck) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Username is already taken",
				data: { body: body },
			},
			{ status: 409 }
		);
	}

	const emailCheck = await getUserByEmail(body.email);

	if (emailCheck) {
		return NextResponse.json(
			{
				success: 0,
				reason: "Email is already taken",
				data: { body: body },
			},
			{ status: 409 }
		);
	}

	// Hashing the password
	const hashedPassword = await bcrypt.hash(body.password, 10);

	const create_user_request = await prisma.user.create({
		data: {
			username: body.username,
			email: body.email,
			password: hashedPassword,
		},
	});

	if (create_user_request) {
		try {
			await signIn("credentials", {
				usernameOrEmail: body.username,
				password: body.password,
				redirect: false,
			});

			return NextResponse.json(
				{
					success: 1,
					reason: "1",
					data: { body: body },
				},
				{ status: 202 }
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
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "Something went wrong",
				data: { body: body },
			},
			{ status: 500 }
		);
	}
}
