"use server";

// Zod
import { z } from "zod";
import { loginSchema } from "@/schemas/auth";

export const do_login = async (formData: z.infer<typeof loginSchema>) => {
	const validation = loginSchema.safeParse(formData);
	if (!validation.success) {
		return {
			success: 0,
			reason: validation.error.errors[0].message,
		};
	}

	return {
		success: 1,
		reason: 1,
	};
};
