import { Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

const Page = () => {
	return (
		<>
			<div className="page_content_large h-full">
				<div className="w-full h-full flex justify-center items-center">
					<div className="max-w-96 w-full flex flex-col items-center">
						<Heading as="h2" size="7" className="!mb-4 text-center">
							Authentication error
						</Heading>
						<Text color="gray" className="text-center">
							Something went wrong, click{" "}
							<Text color="blue">
								<Link href="/auth/login">Here</Link>
							</Text>{" "}
							to go back{" "}
						</Text>
					</div>
				</div>
			</div>
		</>
	);
};

export default Page;
