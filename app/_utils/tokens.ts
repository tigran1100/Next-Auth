import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";

export const getVerificationTokenByEmail = async (email: string) => {
	try {
		return await prisma.verificationToken.findFirst({
			where: {
				email: email,
			},
		});
	} catch (error) {
		return null;
	}
};

export const getVerificationTokenByToken = async (token: string) => {
	try {
		return await prisma.verificationToken.findFirst({
			where: {
				token: token,
			},
		});
	} catch (error) {
		return null;
	}
};

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expires = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);
	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id,
			},
		});
	}

	const verificationToken = await prisma.verificationToken.create({
		data: {
			token: token,
			email: email,
			expires: expires,
		},
	});

	return verificationToken;
};
