import { FC, PropsWithChildren } from "react";
import { Container, Divider, VStack } from "@chakra-ui/react";
import styles from "./index.module.scss";
import Header from "../Header";
import Footer from "../Footer";

export type LayoutProps = PropsWithChildren & {
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <VStack className={styles.layout}>
      <Header/>
      <Divider/>
      <Container w={"5xl"} maxW={"5xl"} className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </Container>
      <Divider/>
      <Footer/>
    </VStack>
  );
};

export default Layout;
