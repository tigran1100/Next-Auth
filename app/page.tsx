import Link from "next/link";

const Page = () => {
	return (
		<>
			<Link href="/auth/signin">Go to Signin page</Link>
			<br />
			<Link href="/auth/signup">Go to Signup page</Link>
		</>
	);
};

export default Page;
