import React from "react";
import { Flex } from "antd";
import type { PropsWithChildren } from "react";
import FullSize from "@/layouts/full_size";

const LayoutForm: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <FullSize>

    <Flex vertical={true}>
      {/* <Header /> */}
        {children}
    </Flex>
    </FullSize>
  );
};

export default LayoutForm;
