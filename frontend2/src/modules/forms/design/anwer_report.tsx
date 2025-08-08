import { Flex } from "antd";
import React, { useEffect } from "react";
import CardContent from "./components/answer_report/content";
import CardCount from "./components/answer_report/count";


const COMPONENT = "forms/design/answer_report.tsx"

interface IProps {
    
}

const FormAnswerReport: React.FC<IProps> = ({ }) => {
    return <Flex
        style={{
        minHeight: "100vh",
        backgroundColor: "rgb(222,209,255)",
        background: "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)",
        paddingBottom: "20px",
      }}
      align="center"
      vertical={true}>
        <CardCount />
        <CardContent />
    </Flex>
}

export default FormAnswerReport;