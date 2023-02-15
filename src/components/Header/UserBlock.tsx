import React from "react";
import { HStack } from "@chakra-ui/react";
import AuthBlock from "./AuthBlock";

const UserBlock = () => {
  const authorized = false;

  if (!authorized) {
    return <AuthBlock/>;
  } else {
    return (
      <HStack></HStack>
    );
  }
};

export default UserBlock;
