import { NextRequest } from "next/server";
import { updateAuthCookie } from "./_assets/lib";

export async function middleware(request: NextRequest) {
	return await updateAuthCookie(request);
}
