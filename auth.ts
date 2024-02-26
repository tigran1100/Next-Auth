// Next Auth
import NextAuth from "next-auth";
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
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
});
