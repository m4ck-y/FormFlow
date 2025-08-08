import Card from "@/components/card";
import {
    Button,
} from "@heroui/react";
import React from "react";
import { Flex } from "antd";
import SVG_Options from "@/assets/icons/options";

import SVG_Sheets from "@/assets/icons/sheets";

const COMPONENT = "forms/design/components/answer_report/content.tsx";

interface IProps {
}

const CardContent: React.FC<IProps> = () => {

    return (
        <Card>
            <Flex justify="center" align="center">
                <h1>Esperando Respuestas</h1>
            </Flex>
        </Card>
    )

}

export default CardContent;