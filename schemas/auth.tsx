import { z } from "zod";

export const loginSchema = z.object({
	usernameOrEmail: z
		.string()
		.min(4, "Username or email must be at lease 3 characters long"),
	password: z.string().min(1, "Password is required"),
});
