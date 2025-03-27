import React from "react";
import { Flex } from "antd";
import { PropsWithChildren } from "react";

import Header from "../components/form/header/header";

const LayoutForm: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex vertical={true}>
      <Header />
        {children}
    </Flex>
  );
};

export default LayoutForm;
