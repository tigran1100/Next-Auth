import { z } from "zod";

export const loginSchema = z.object({
	usernameOrEmail: z
		.string()
		.min(3, "Username or email must be at lease 4 characters long"),
	password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
	.object({
		name: z.string().min(2, "Name must be at lease 2 characters long"),
		usernameOrEmail: z
			.string()
			.min(3, "Username or email must be at lease 4 characters long"),
		password: z
			.string()
			.min(6, "Password must be at lease 6 characters long"),
		passwordConfirm: z
			.string()
			.min(6, "Password must be at lease 6 characters long"),
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
			});
		}
	});
