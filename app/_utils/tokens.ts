// NextJS
import { NextRequest, NextResponse } from "next/server";

// AuthJS
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

// Prisma
import prisma from "@/prisma/client";

// UUid generator
import { v4 as uuidv4 } from "uuid";

// randomatic
const randomize = require("randomatic");

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
	const code = randomize("0", 6);
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
			code: code,
			expires: expires,
		},
	});

	return verificationToken;
};

export const verifyVerificationCodeByEmail = async (
	email: string,
	code: string
) => {
	const isValid = await prisma.verificationToken.findFirst({
		where: {
			email: email,
			code: code,
		},
	});

	return isValid;
};
