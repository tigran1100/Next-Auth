// NextJS
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// React
import React from "react";

// AuthJS
import { auth, signOut } from "@/auth";

// Radix UI
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";

// React Icons
import { Tb2Fa } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";

// Components
import AlertDialoge2FA from "./_components/alertDialogeEmail/alertDialoge";

// Css
import "./styles.css";

const Page = async () => {
	const session = await auth();
	const email = session?.user?.email;
	const name = session?.user?.name;
	const isEmailVerified = (session as any)?.user?.custom_is_logged_from_form
		? (session as any)?.user?.custom_emailVerified
			? true
			: false
		: true;

	return (
		<>
			{JSON.stringify(session)}
			<br />
			{JSON.stringify(isEmailVerified)}
			<div className="c_body">
				<div className="c_page_inner page_content_small">
					<div className="c_body_greetings w-full">
						<h1 className="text-2xl">
							Hello, {session?.user?.name}!
						</h1>
					</div>
					<div className="c_body_actions w-full">
						<Card
							style={{
								width: "fit-content",
								paddingRight: "6px",
							}}
						>
							<Flex gap="3" align="center">
								<HiOutlineMail
									style={{ width: "auto", height: "40px" }}
								/>
								<Box>
									<Text as="div" size="2" weight="bold">
										{isEmailVerified
											? "Email is verified"
											: "Emali Not Verified"}
									</Text>
									{!isEmailVerified && (
										<Text as="div" size="2" color="blue">
											<AlertDialoge2FA
												email={email}
												name={name}
											/>
										</Text>
									)}
								</Box>
							</Flex>
						</Card>
					</div>
					<form
						className="self-start"
						action={async () => {
							"use server";
							await signOut({
								redirect: true,
								redirectTo: "/auth/login",
							});
						}}
					>
						<Button className="!cursor-pointer">Log out</Button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Page;
