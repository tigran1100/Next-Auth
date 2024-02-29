// NextJS
import type { Metadata } from "next";

// NextAuth
import { SessionProvider } from "next-auth/react";

// Radix UI
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

// Css
import "./global.styles.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Theme>
					<SessionProvider>{children}</SessionProvider>
				</Theme>
			</body>
		</html>
	);
}
