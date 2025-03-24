import React from "react";
import { Flex } from "antd";
import { PropsWithChildren } from "react";

import HHeader from "../components/hheader";

const LayoutForm: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex vertical>
      <HHeader />
        {children}
    </Flex>
  );
};

export default LayoutForm;
