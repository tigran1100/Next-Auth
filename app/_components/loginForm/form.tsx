"use client";

//Next JS
import { redirect } from "next/navigation";
import Link from "next/link";

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

// Zod
import { z } from "zod";
import { loginSchema } from "@/schemas/auth";

// React Hook Form
import { useForm } from "react-hook-form";

// Css
import styles from "./styles.module.css";

const loginForm = () => {
	const useFormVar = useForm();

	const do_submit = (formData: z.infer<typeof loginSchema>) => {};

	return (
		<>
			<div className="max-w-96 w-full flex flex-col items-center">
				<Heading as="h2" size="7" className="!mb-10">
					Login
				</Heading>
				<form
					onSubmit={useFormVar.handleSubmit((formData) => {
						do_submit(formData as z.infer<typeof loginSchema>);
					})}
					className="!w-full"
				>
					<Flex className="!w-full" direction="column" gap="3">
						<TextField.Input
							{...useFormVar.register("usernameOrEmail", {
								required: "Username or Email is required",
								minLength: {
									value: 3,
									message:
										"Username or email must be at lease 3 characters long",
								},
							})}
							type="email"
							placeholder="Username or Email"
							className="!w-full !max-w-none !py-5"
						/>
						<TextField.Input
							{...useFormVar.register("password", {
								required: "Password is required",
							})}
							type="password"
							placeholder="Password"
							className="!w-full !max-w-none !py-5"
						/>
						{/* {form_error && (
							<>
								<Callout.Root
									size="1"
									color="red"
									className="!py-2"
								>
									<Callout.Text>{form_error}</Callout.Text>
								</Callout.Root>
							</>
						)} */}

						{(useFormVar.formState.errors.usernameOrEmail ||
							useFormVar.formState.errors.password) && (
							<>
								<Callout.Root
									size="1"
									color="red"
									className="!py-2"
								>
									<Callout.Text>
										<>
											{useFormVar.formState.errors
												?.usernameOrEmail?.message ||
												useFormVar.formState.errors
													?.password?.message ||
												"asd"}
										</>
									</Callout.Text>
								</Callout.Root>
							</>
						)}
						<Button
							type="submit"
							disabled={useFormVar.formState.isSubmitting}
							className="!cursor-pointer !transition-all"
						>
							Submit
						</Button>
					</Flex>
				</form>
				<div className="w-full my-4 flex justify-between items-center">
					<div className="h-[1px] flex flex-1 bg-slate-300"></div>
					<div className="px-4 text-slate-500">or</div>
					<div className="h-[1px] flex flex-1 bg-slate-300"></div>
				</div>
				<Flex
					gap="2"
					direction="row"
					justify="between"
					className="!w-full !min-h-fit"
				>
					<Button className={styles.button_google}>
						<FcGoogle size="18px" />
					</Button>
					<Button className={styles.button_github}>
						<FaGithub
							size="20px"
							className={styles.button_github_icon}
						/>
					</Button>
				</Flex>
				<Text className="!mt-3 !text-center">
					Don't have an account?{" "}
					<Link
						href="/signin"
						className="text-blue-600 hover:!underline"
					>
						Signin
					</Link>{" "}
				</Text>
			</div>
		</>
	);
};

export default loginForm;
