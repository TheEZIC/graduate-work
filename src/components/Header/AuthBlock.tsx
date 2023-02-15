import React, { useCallback, useState } from "react";
import { Button, HStack, } from "@chakra-ui/react";
import AuthModal from "./AuthModal";

const AuthBlock = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = useCallback(() => setIsModalOpen((value) => !value), []);

  return (
    <HStack>
      <Button
        colorScheme={"green"}
        variant={"solid"}
        onClick={toggleModal}
      >
        Авторизация
      </Button>
      <AuthModal
        isOpen={isModalOpen}
        toggle={toggleModal}
      />
    </HStack>
  );
};

export default AuthBlock;
