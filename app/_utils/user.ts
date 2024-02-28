import prisma from "@/prisma/client";

export async function getUserByEmail(email: string) {
	try {
		return await prisma?.user.findUnique({
			where: {
				email: email,
			},
		});
	} catch (err) {
		return null;
	}
}

export async function getUserByUsername(username: string) {
	try {
		return await prisma?.user.findUnique({
			where: {
				username: username,
			},
		});
	} catch (err) {
		return null;
	}
}
