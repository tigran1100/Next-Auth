// React Icons
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

// Radix UI
import { Button, Flex } from "@radix-ui/themes";

// Css
import styles from "./styles.module.css";

const Buttons = () => {
	return (
		<>
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
		</>
	);
};

export default Buttons;
