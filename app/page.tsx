import { auth, signOut } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const Page = async () => {
	//
	const session = await auth();

	return (
		<>
			<Link href="/auth/login">Go to login page</Link>
			<br />
			<Link href="/auth/register">Go to register page</Link>
			<br /> <br />
			<form
				action={async () => {
					"use server";
					await signOut({
						redirect: true,
						redirectTo: "/auth/login",
					});
				}}
			>
				<button>Sign out</button>
			</form>
			<br />
			{JSON.stringify(session)}
		</>
	);
};

export default Page;
