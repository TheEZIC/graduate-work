import React, { useState } from "react";
import { Button, FormControl, FormLabel, Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import styles from "./index.module.scss";

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordShow = () => setShowPassword((value) => !value);

  const renderShowItemIcon = () => showPassword
    ? <BsEyeSlashFill/>
    : <BsEyeFill/>;

  return (
    <FormControl
      className={styles.formItem}
      isRequired={true}
    >
      <FormLabel as='legend'>Пароль</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Пароль"
        />
        <InputRightElement width="3rem">
          <Button h="1.5rem" size="sm" onClick={togglePasswordShow}>
            {renderShowItemIcon()}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordInput;
