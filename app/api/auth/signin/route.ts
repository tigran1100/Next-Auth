// NextJS
import { NextRequest, NextResponse } from "next/server";

// NextAuth
import { getServerSession } from "next-auth";

// Prisma
import prisma from "@/prisma/client";

// Zod
import { z } from "zod";
import { registerSchema } from "@/schemas/auth";

// Bcrypt
import bcrypt from "bcrypt";

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
	const usernameCheck = await prisma?.user.findUnique({
		where: {
			username: body.username,
		},
	});

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

	const emailCheck = await prisma?.user.findUnique({
		where: {
			email: body.email,
		},
	});

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
		return NextResponse.json(
			{
				success: 1,
				reason: "User successfully created",
				data: { body: body },
			},
			{ status: 201 }
		);
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
