import { z } from "zod";

export const loginSchema = z.object({
	usernameOrEmail: z
		.string()
		.min(3, "Username or email must be at lease 4 characters long")
		.max(65535, "Username or email can't be longer than 65,535 characters"),
	password: z
		.string()
		.min(1, "Password is required")
		.max(65535, "Username or email can't be longer than 65,535 characters"),
});

export const registerSchema = z
	.object({
		username: z
			.string()
			.min(2, "Username must be at lease 2 characters long")
			.max(65535, "Username can't be longer than 65,535 characters"),
		email: z
			.string()
			.min(3, "Email must be at lease 3 characters long")
			.max(65535, "Email can't be longer than 65,535 characters")
			.email("Please provide valid email address"),
		password: z
			.string()
			.min(6, "Password must be at lease 6 characters long")
			.max(
				65535,
				"Username or email can't be longer than 65,535 characters"
			),
		passwordConfirm: z
			.string()
			.min(6, "Password must be at lease 6 characters long")
			.max(
				65535,
				"Username or email can't be longer than 65,535 characters"
			),
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
			});
		}
	});
