import React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Flex } from "antd";
import type { PropsWithChildren } from "react";
//import flow from "../assets/flow.png";
import flow from "@/assets/react.svg";


const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex style={{ background: "#f6fcff", height: "100%" }} align="center">
            <Container>
                <Paper elevation={0} style={{ padding: "20px" }}>
                    <Stack spacing={2}>
                        <img src={flow} alt="" height="80px" width="80px" />
                        <Flex vertical={false} justify="space-between">
                        {children}
                        </Flex>
                    </Stack>
                </Paper>
            </Container>
        </Flex>
    );
};

export default AuthLayout;
