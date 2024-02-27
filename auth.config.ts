// AuthJS
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Zod
import { loginSchema } from "./schemas/auth";

// Bcrypt
import bcrypt from "bcryptjs";

// Custom Utils
import { getUserByEmail, getUserByUsername } from "./app/_utils/user";

export default {
	events: {
		async linkAccount({ user }) {
			if (user.email) {
				await prisma?.user.update({
					data: {
						emailVerified: new Date(),
					},
					where: {
						email: user.email,
					},
				});
			}
			console.log("User from linkAccount: ", user);
		},
	},
	providers: [
		GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
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
							custom_is_logged_from_form: true,
							custom_id: user.id || null,
							custom_username: user.username || null,
							custom_email: user.email || null,
							custom_emailVerified: user.emailVerified || null,
							name: user.username || null,
							email: user.email || null,
							image: null,
						};
					}
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
