"use client";

// React
import React, { useEffect, useState } from "react";

// Radix UI
import { Button } from "@radix-ui/themes";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Toast from "@radix-ui/react-toast";

// Axios
import axios from "axios";

// Other
import VerificationInput from "react-verification-input";
import { ToastDemo } from "@/app/_global.components/toast/toast";

// Css
import "./styles.css";

// Utils
import { generateVerificationToken } from "@/app/_utils/tokens";

interface Props {
	email: string | null | undefined;
	name: string | null | undefined;
}

const AlertDialoge = (Props: Props) => {
	const [isCodeSent, setisCodeSent] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [isToastOpen, setIsToastOpen] = useState(false);

	const sendVerificationCode = async () => {
		if (isCodeSent) {
			return;
		}

		setisCodeSent(true);
		setIsToastOpen(true);

		axios
			.post("/api/verification/createVerificationToken", {
				email: Props.email,
				name: Props.name,
			})
			.then((res) => {
				let response = res.data;
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const maskEmail = (email: string) => {
		const [username, domain] = email.split("@");
		const maskedUsername = username.replace(/./g, (char, index) =>
			index === 0 ? char : "*"
		);
		const maskedEmail = `${maskedUsername}@${domain}`;
		return maskedEmail;
	};

	const confirmVerificationCode = (e: any) => {
		axios
			.post("/api/verification/verifyVerificationToken", {
				email: Props.email,
				code: verificationCode,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.warn(err);
			});

		return;
	};

	useEffect(() => {
		console.log(verificationCode);
	}, [verificationCode]);

	return (
		<>
			<ToastDemo
				headerText="Verification code"
				descriptionText="Email has been successfully sent"
				closeButtonText="Close"
				isToastOpen={isToastOpen}
				setIsToastOpen={setIsToastOpen}
			/>
			<AlertDialog.Root>
				<AlertDialog.Trigger asChild>
					<button
						className={`shadow-blackA4 inline-flex font-medium cursor-pointer`}
						onClick={() => {
							sendVerificationCode();
						}}
					>
						{isCodeSent ? "Enter the code" : "Send the code"}
					</button>
				</AlertDialog.Trigger>
				<AlertDialog.Portal>
					<AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
					<AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
						<AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
							Please enter verification code
						</AlertDialog.Title>
						<AlertDialog.Description>
							Code is sent to {maskEmail(Props.email as string)}
						</AlertDialog.Description>
						<AlertDialog.Overlay className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
							<VerificationInput
								length={6}
								validChars="0-9"
								placeholder="&nbsp;"
								onChange={(val) => {
									setVerificationCode(val);
								}}
								classNames={{
									container: "c-vi-container",
									character: "c-vi-character",
									characterInactive:
										"c-vi-character--inactive",
									characterSelected:
										"c-vi-character--selected",
									characterFilled: "c-vi-character--filled",
								}}
							/>
						</AlertDialog.Overlay>
						<div className="flex justify-end gap-[10px]">
							<AlertDialog.Cancel asChild>
								<button className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
									Cancel
								</button>
							</AlertDialog.Cancel>
							<AlertDialog.Action asChild>
								<button
									onClick={(e) => {
										confirmVerificationCode(e);
									}}
									className="text-white bg-[#3e63dd] hover:bg-[#3358d4] inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
								>
									Confirm
								</button>
							</AlertDialog.Action>
						</div>
					</AlertDialog.Content>
				</AlertDialog.Portal>
			</AlertDialog.Root>
		</>
	);
};

export default AlertDialoge;
