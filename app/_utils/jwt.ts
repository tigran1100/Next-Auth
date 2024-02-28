// Jose
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.NEXT_APP_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

// JWT
export async function encrypt(payload: any, expiresDate: Date) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(expiresDate)
		// .setExpirationTime("10 sec from now")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	try {
		const { payload } = await jwtVerify(input, key, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch (error) {
		console.warn(error);
		return false;
	}
}
