// NextJS
import { NextRequest, NextResponse } from "next/server";

// AuthJS
import { auth, unstable_update } from "@/auth";

// Zod
import { verifyVerificationCode } from "@/schemas/emailValidation";

// Utils
import {
	generateVerificationToken,
	verifyVerificationCodeByEmail,
} from "@/app/_utils/tokens";
import { TbBodyScan } from "react-icons/tb";

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
	const validation = verifyVerificationCode.safeParse(body);

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

	const verification = !!(await verifyVerificationCodeByEmail(
		body.email,
		body.code
	));

	if (verification) {
		const newDate = new Date();
		await prisma?.user.update({
			data: {
				emailVerified: newDate,
			},
			where: {
				email: body.email,
			},
		});

		await prisma?.verificationToken.delete({
			where: {
				email: body.email,
				code: body.code,
			},
		});

		let oldSession = await auth();
		let newSession: any = await auth();
		let newUser = oldSession?.user;
		// newSession.user.custom_emailVerified = newDate;
		const update = await unstable_update({
			user: {
				name: "651asd1wa2s0d",
			},
		});

		return NextResponse.json(
			{
				success: 1,
				reason: "1",
				data: { body, verification, oldSession, newSession, update },
			},
			{ status: 200 }
		);
	} else {
		return NextResponse.json(
			{
				success: 0,
				reason: "0",
				data: { body, verification },
			},
			{ status: 200 }
		);
	}
}
