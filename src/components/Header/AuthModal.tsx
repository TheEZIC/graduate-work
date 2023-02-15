import React, { FC, useCallback, useState } from "react";
import {
  Button, FormControl, FormLabel, Input, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export type AuthModalProps = {
  isOpen: boolean;
  toggle: () => void;
}

const AuthModal: FC<AuthModalProps> = ({isOpen, toggle}) => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  const toggleAuth = useCallback(() => setIsAuth((value) => !value), []);

  const renderModalTitle = () => isAuth
    ? "Авторизация"
    : "Регистрация";

  const renderForm = () => isAuth
    ? <SignInForm toggleAuth={toggleAuth}/>
    : <SignUpForm toggleAuth={toggleAuth}/>;

  return (
    <Modal isOpen={isOpen} onClose={toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{renderModalTitle()}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {renderForm()}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
