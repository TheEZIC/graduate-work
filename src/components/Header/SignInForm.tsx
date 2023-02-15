import React, { FC } from "react";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import styles from "./index.module.scss";
import PasswordInput from "./PasswordInput";

export type SignInFormProps = {
  toggleAuth: () => void;
}

const SignInForm: FC<SignInFormProps> = ({toggleAuth}) => {
  return (
    <form>
      <FormControl
        className={styles.formItem}
        isRequired={true}
      >
        <FormLabel as='legend'>Почта</FormLabel>
        <Input
          type={"email"}
          placeholder={"Почта"}
        />
      </FormControl>
      <PasswordInput/>
      <Text
        className={styles.changeText}
        as={"u"}
        onClick={toggleAuth}
      >
        Нет аккаунта? Регистрация!
      </Text>
      <Button
        className={styles.submitBtn}
        colorScheme={"green"}
        type={"submit"}
      >
        Авторизоваться
      </Button>
    </form>
  );
};

export default SignInForm;
