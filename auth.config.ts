// AuthJS
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

// Zod
import { loginSchema } from "./schemas/auth";

// Bcrypt
import bcrypt from "bcryptjs";

// Custom Utils
import { getUserByEmail, getUserByUsername } from "./app/_utils/user";

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				// Checking fields validity
				const validatedFields = loginSchema.safeParse(credentials);
				if (!validatedFields.success) {
					return null;
				} else {
					const { usernameOrEmail, password } = validatedFields.data;

					if (!usernameOrEmail || !password) {
						return null;
					}

					// Checking user existence
					let usernameCheck = await getUserByUsername(
						usernameOrEmail
					);
					let emailCheck;
					let user;
					if (usernameCheck) {
						user = usernameCheck;
					} else {
						emailCheck = await getUserByEmail(usernameOrEmail);
						if (emailCheck) {
							user = emailCheck;
						} else {
							return null;
						}
					}
					if (!user || !user.username || !user.password) {
						return null;
					}

					// Checking password validity
					const passwordsMach = await bcrypt.compare(
						password,
						user.password
					);
					// Continue if everything is ok
					if (passwordsMach) {
						return {
							name: user.username,
							email: user.email,
							image: null,
						};
					}
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
