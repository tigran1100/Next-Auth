// NextJS
import type { Metadata } from "next";

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
				<Theme>{children}</Theme>
			</body>
		</html>
	);
}
