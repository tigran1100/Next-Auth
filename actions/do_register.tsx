"use server";

// Zod
import { z } from "zod";
import { registerSchema } from "@/schemas/auth";

export const do_register = async (formData: z.infer<typeof registerSchema>) => {
	const validation = registerSchema.safeParse(formData);
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
