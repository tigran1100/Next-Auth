import * as React from "react";

interface EmailTemplateProps {
	name: string;
	code: number;
}

export const EmailSentEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	name,
	code,
}) => (
	<div>
		<h1>Welcome, {name}!</h1>
		Your verification code is {code}
	</div>
);
