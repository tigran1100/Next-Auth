// React
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Radix UI
import { Button, Container, Flex, Heading } from "@radix-ui/themes";

// Css
import styles from "./styles.module.css";

const loginForm = () => {
	return (
		<>
			<div className="max-w-96 w-full flex flex-col items-center">
				<Heading as="h2" size="7" className="!mb-6">
					Login
				</Heading>
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
			</div>
		</>
	);
};

export default loginForm;
