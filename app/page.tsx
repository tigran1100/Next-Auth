import Link from "next/link";

const Page = () => {
	return (
		<>
			<Link href="/auth/login">Go to login page</Link>
			<br />
			<Link href="/auth/register">Go to register page</Link>
		</>
	);
};

export default Page;
