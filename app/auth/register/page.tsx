"use client";

//Next JS
import Link from "next/link";
import { useRouter } from "next/navigation";

// React
import { FormEvent, useState } from "react";

// React Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Radix UI
import {
	Button,
	Callout,
	Flex,
	Heading,
	Text,
	TextField,
} from "@radix-ui/themes";

// Axios
import axios from "axios";

// Zod
import { z } from "zod";
import { registerSchema } from "@/schemas/auth";

// React Hook Form
import { useForm } from "react-hook-form";

// Components
import OAuthButtons from "../_components/oauthButtons/buttons";
import OrDivider from "../_components/orDivider/divider";

export default function Home() {
	const router = useRouter();
	const useFormVar = useForm();

	const [form_is_submittimg, set_form_is_submittimg] = useState(false);
	const [custom_error, set_custom_error] = useState("");

	const do_submit = async (formData: z.infer<typeof registerSchema>) => {
		set_custom_error("");
		set_form_is_submittimg(true);

		await axios
			.post("/api/auth/signup", formData)
			.then((res) => {
				let data = res.data;
				if (data.success === 1) {
					set_custom_error("");
					router.push("/");
					router.refresh();
					useFormVar.reset();
				} else {
					set_custom_error(data.reason);
				}
			})
			.catch((err) => {
				console.warn(err);
				let data = err.response.data;

				if (data?.reason) {
					set_custom_error(data.reason);
				} else {
					set_custom_error("Something went wrong");
				}
			});

		set_form_is_submittimg(false);
	};

	const CalloutButtons = () => {
		return (
			(useFormVar.formState.errors.username ||
				useFormVar.formState.errors.email ||
				useFormVar.formState.errors.password ||
				useFormVar.formState.errors.passwordConfirm ||
				custom_error) && (
				<>
					<Callout.Root size="1" color="red" className="!py-2">
						<Callout.Text>
							<>
								{useFormVar.formState.errors.username
									?.message ||
									useFormVar.formState.errors.email
										?.message ||
									useFormVar.formState.errors.password
										?.message ||
									useFormVar.formState.errors.passwordConfirm
										?.message ||
									custom_error ||
									""}
							</>
						</Callout.Text>
					</Callout.Root>
				</>
			)
		);
	};

	return (
		<>
			<div className="page_content_large h-full">
				<div className="w-full h-full flex justify-center items-center">
					<div className="max-w-96 w-full flex flex-col items-center">
						<Heading as="h2" size="7" className="!mb-10">
							Register
						</Heading>
						<form
							onSubmit={useFormVar.handleSubmit((formData) => {
								do_submit(
									formData as z.infer<typeof registerSchema>
								);
							})}
							className="!w-full"
						>
							<Flex
								className="!w-full"
								direction="column"
								gap="3"
							>
								<TextField.Input
									{...useFormVar.register("username", {
										required: "Username is required",
										minLength: {
											value: 2,
											message:
												"Username must be at lease 2 characters long",
										},
									})}
									type="text"
									placeholder="Username"
									className="!w-full !max-w-none !py-5"
									disabled={form_is_submittimg}
								/>
								<TextField.Input
									{...useFormVar.register("email", {
										required: "Email is required",
										minLength: {
											value: 3,
											message:
												"Email must be at lease 3 characters long",
										},
									})}
									type="email"
									placeholder="Email"
									className="!w-full !max-w-none !py-5"
									disabled={form_is_submittimg}
								/>
								<TextField.Input
									{...useFormVar.register("password", {
										required: "Password is required",
										minLength: {
											value: 6,
											message:
												"Password must be at lease 6 characters long",
										},
									})}
									type="password"
									placeholder="Password"
									className="!w-full !max-w-none !py-5"
									disabled={form_is_submittimg}
								/>
								<TextField.Input
									{...useFormVar.register("passwordConfirm", {
										required:
											"Password confirmation is required",
										minLength: {
											value: 6,
											message:
												"Password must be at lease 6 characters long",
										},
										validate: (val: string) => {
											if (
												useFormVar.watch("password") !=
												val
											) {
												return "The passwords did not match";
											}
										},
									})}
									type="password"
									placeholder="Confirm password"
									className="!w-full !max-w-none !py-5"
									disabled={form_is_submittimg}
								/>
								<CalloutButtons />
								<Button
									type="submit"
									disabled={form_is_submittimg}
									className="!cursor-pointer !transition-all"
								>
									Create an account
								</Button>
							</Flex>
						</form>
						<OrDivider />
						<OAuthButtons />
						<Text className="!mt-3 !text-center">
							Already have an account?&nbsp;
							<Link
								href="/auth/login"
								className="text-blue-600 hover:!underline"
							>
								Login
							</Link>
						</Text>
					</div>
				</div>
			</div>
		</>
	);
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
