// Next Auth
import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "@/auth.config";

// Prisma
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		async session({ user, token, session }) {
			// console.log("Session Token: ", token);

			if (!!(token as any)?.user?.custom_is_logged_from_form) {
				if (session && token) {
					(session as any).user.custom_is_logged_from_form = !!(
						token as any
					)?.user?.custom_is_logged_from_form;
					(session as any).user.custom_id = (
						token as any
					)?.user?.custom_id;
					(session as any).user.custom_username = (
						token as any
					)?.user?.custom_username;
					(session as any).user.custom_email = (
						token as any
					)?.user?.custom_email;
					(session as any).user.custom_emailVerified = (
						token as any
					)?.user?.custom_emailVerified;
				}
			}
			return session;
		},
		async jwt({ token, account, user }) {
			if (user) {
				token.user = {
					...user,
					custom_is_logged_from_form: (user as any)
						.custom_is_logged_from_form,
					custom_id: (user as any).custom_id,
					custom_username: (user as any).custom_username,
					custom_email: (user as any).custom_email,
					custom_emailVerified: (user as any).custom_emailVerified,
				};
			}
			return token;
		},
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});
