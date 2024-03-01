import type { Config } from "tailwindcss";
const {
	mauve,
	red,
	blackA,
	green,
	slate,
	violet,
} = require("@radix-ui/colors");

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				...mauve,
				...red,
				...blackA,
				...green,
				...slate,
				...violet,
			},
			keyframes: {
				overlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				contentShow: {
					from: {
						opacity: "0",
						transform: "translate(-50%, -48%) scale(0.96)",
					},
					to: {
						opacity: "1",
						transform: "translate(-50%, -50%) scale(1)",
					},
				},
				hide: {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				slideIn: {
					from: {
						transform:
							"translateX(calc(100% + var(--viewport-padding)))",
					},
					to: { transform: "translateX(0)" },
				},
				swipeOut: {
					from: {
						transform: "translateX(var(--radix-toast-swipe-end-x))",
					},
					to: {
						transform:
							"translateX(calc(100% + var(--viewport-padding)))",
					},
				},
			},
			animation: {
				overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				hide: "hide 100ms ease-in",
				slideIn: "slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				swipeOut: "swipeOut 100ms ease-out",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [],
};
export default config;
