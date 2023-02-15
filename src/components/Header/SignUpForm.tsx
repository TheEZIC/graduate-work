import React, { FC, useState } from "react";
import { Button, Checkbox, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import styles from "./index.module.scss";
import PasswordInput from "./PasswordInput";

export type SignUpFormProps = {
  toggleAuth: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({toggleAuth}) => {
  const [isMiddleName, setIsMiddleName] = useState<boolean>(true);

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
      <FormControl
        className={styles.formItem}
        isRequired={true}
      >
        <FormLabel as='legend'>Фамилия</FormLabel>
        <Input
          type={"text"}
          placeholder={"Фамилия"}
        />
      </FormControl>
      <FormControl
        className={styles.formItem}
        isRequired={true}
      >
        <FormLabel as='legend'>Имя</FormLabel>
        <Input
          type={"text"}
          placeholder={"Имя"}
        />
      </FormControl>
      <FormControl className={styles.formItem}>
        {isMiddleName && <>
          <FormLabel as='legend'>Отчество</FormLabel>
          <Input
            type={"text"}
            placeholder={"Отчество"}
          />
        </>}
        <Checkbox
          className={styles.checkbox}
          onChange={(e) => setIsMiddleName(!e.target.checked)}
        >
          Без отчества
        </Checkbox>
      </FormControl>
      <Text
        className={styles.changeText}
        as={"u"}
        onClick={toggleAuth}
      >
        Уже есть аккаунт? Войти!
      </Text>
      <Button
        className={styles.submitBtn}
        colorScheme={"green"}
        type={"submit"}
      >
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default SignUpForm;
