// NextJS
import Link from "next/link";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

// AuthJS
import { auth, signOut } from "@/auth";

// Radix UI
import { Avatar, Box, Button, Card, Flex, Text } from "@radix-ui/themes";

// React Icons
import { Tb2Fa } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";

// Components

// Css
import "./styles.css";

const Page = async () => {
	const session = await auth();

	return (
		<>
			{/* {JSON.stringify(session)} */}
			<div className="c_body">
				<div className="c_page_inner page_content_small">
					<div className="c_body_greetings w-full">
						<h1 className="text-2xl">
							Hello, {session?.user?.name}!
						</h1>
						Complete the essential actions all from one page.
					</div>
					<div className="c_body_actions w-full">
						<Card style={{ width: "100%" }}>
							<Flex gap="3" align="center">
								<Tb2Fa
									style={{ width: "auto", height: "40px" }}
								/>
								<Box>
									<Text as="div" size="2" weight="bold">
										Two Factor Authentication (Disabled)
									</Text>
									<Text as="div" size="2" color="blue">
										<Link href="/">Enable</Link>
									</Text>
								</Box>
							</Flex>
						</Card>
						<Card style={{ width: "100%" }}>
							<Flex gap="3" align="center">
								<HiOutlineMail
									style={{ width: "auto", height: "40px" }}
								/>
								<Box>
									<Text as="div" size="2" weight="bold">
										Emali Verification (Not Verified)
									</Text>
									<Text as="div" size="2" color="blue">
										<Link href="/">Verify</Link>
									</Text>
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
