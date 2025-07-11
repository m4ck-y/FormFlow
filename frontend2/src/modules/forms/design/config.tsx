import { Flex } from "antd";
import React, { useEffect } from "react";
import CardForm from "./components/CardForm";
import CardQuestion from "./components/CardQuestion";
import type { IDetailForm } from "@/domain/models/form";
import CardMetadata from "./components/CardMetadata";
import CardObservaciones from "./components/CardObservaciones";
import CardReferences from "./components/CardReferences";


const COMPONENT = "forms/design/config.tsx"

interface IProps {
    
}

const FormConfig: React.FC<IProps> = ({ }) => {
    return <Flex
        style={{
        minHeight: "100vh",
        backgroundColor: "rgb(222,209,255)",
        background: "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)",
        paddingBottom: "20px",
      }}
      align="center"
      vertical={true}>
        <CardMetadata />
        <CardObservaciones />
        <CardReferences />
    </Flex>
}

export default FormConfig;