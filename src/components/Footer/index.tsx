import React from "react";
import { Container, Heading, HStack } from "@chakra-ui/react";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <HStack className={styles.footer}>
      <Container className={styles.container} w={"5xl"} maxW={"5xl"} centerContent>
        <span>Created by TheEZIC</span>
      </Container>
    </HStack>
  );
};

export default Footer;
