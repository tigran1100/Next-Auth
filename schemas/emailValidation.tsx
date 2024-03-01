import { z } from "zod";

export const verificationTokenByEmail = z.object({
	email: z
		.string()
		.min(3, "Email must be at lease 3 characters long")
		.max(65535, "Email can't be longer than 65,535 characters")
		.email("Email should be valid"),
});
export const verifyVerificationCode = z.object({
	email: z
		.string()
		.min(3, "Email must be at lease 3 characters long")
		.max(65535, "Email can't be longer than 65,535 characters")
		.email("Email should be valid"),
	code: z
		.string()
		.min(6, "Code must be 6 characters long")
		.max(6, "Code must be 6 characters long"),
});
