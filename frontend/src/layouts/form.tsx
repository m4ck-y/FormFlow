import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Flex } from "antd";
import { PropsWithChildren } from "react";
import flow from "../assets/flow.png";
import HHeader from "../components/hheader"


const LayoutForm: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex vertical>
            <HHeader/>
            {children}
        </Flex>
    );
};

export default LayoutForm;