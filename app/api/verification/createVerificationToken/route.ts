// NextJS
import { verificationTokenByEmail } from "@/schemas/emailValidation";
import { NextRequest, NextResponse } from "next/server";

// Utils
import { generateVerificationToken } from "@/app/_utils/tokens";

// Resend
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

// Email Templates
import { EmailSentEmailTemplate } from "@/app/_global.components/emailTemplates/emailSent/template";

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
	const validation = verificationTokenByEmail.safeParse(body);

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

	const verificationToken = (await generateVerificationToken(
		body.email
	)) as any;
	const resendResponse = await resend.emails.send({
		from: "Acme <onboarding@tigranbalayan.com>",
		to: [body.email],
		subject: "NextAuth - Email Verification",
		react: EmailSentEmailTemplate({
			name: body.name,
			code: verificationToken.code,
		}),
	} as any);

	return NextResponse.json(
		{
			success: 1,
			reason: "1",
			data: { body, verificationToken, resendResponse },
		},
		{ status: 200 }
	);
}
