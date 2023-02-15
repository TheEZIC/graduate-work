import { FC } from "react";
import { Container, Heading, HStack } from "@chakra-ui/react";
import styles from "./index.module.scss";
import UserBlock from "./UserBlock";

const Header: FC = () => {
  return (
    <HStack className={styles.header}>
      <Container className={styles.container} w={"5xl"} maxW={"5xl"}>
        <Heading size={"md"} as={"h1"}>Докторы</Heading>
        <UserBlock/>
      </Container>
    </HStack>
  );
};

export default Header;
