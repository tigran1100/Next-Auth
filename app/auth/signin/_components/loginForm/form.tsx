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

// Actions
import { do_login } from "@/actions/do_login";

// Css
import styles from "./styles.module.css";

const LoginForm = () => {
	const useFormVar = useForm();

	const [form_is_submittimg, set_form_is_submittimg] = useState(false);
	const [custom_error, set_custom_error] = useState("");

	const do_submit = async (formData: z.infer<typeof loginSchema>) => {
		set_custom_error("");
		set_form_is_submittimg(true);

		const result = await do_login(formData);
		useFormVar.reset();

		set_form_is_submittimg(false);

		if (result.success === 0) {
			console.log(result);
			set_custom_error(result.reason as string);
		}
	};

	const CalloutButtons = () => {
		return (
			(useFormVar.formState.errors.usernameOrEmail ||
				useFormVar.formState.errors.password ||
				custom_error) && (
				<>
					<Callout.Root size="1" color="red" className="!py-2">
						<Callout.Text>
							<>
								{useFormVar.formState.errors?.usernameOrEmail
									?.message ||
									useFormVar.formState.errors?.password
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
							disabled={form_is_submittimg}
						/>
						<TextField.Input
							{...useFormVar.register("password", {
								// required: "Password is required",
							})}
							type="password"
							placeholder="Password"
							className="!w-full !max-w-none !py-5"
							disabled={form_is_submittimg}
						/>
						<CalloutButtons />
						<Button
							type="submit"
							disabled={form_is_submittimg}
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
					Don&apos;t have an account?&nbsp;
					<Link
						href="/signin"
						className="text-blue-600 hover:!underline"
					>
						Signin
					</Link>
				</Text>
			</div>
		</>
	);
};

export default LoginForm;
