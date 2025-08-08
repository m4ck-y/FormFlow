import Card from "@/components/card";
import {
    Button,
} from "@heroui/react";
import React from "react";
import { Flex } from "antd";
import SVG_Options from "@/assets/icons/options";

import SVG_Sheets from "@/assets/icons/sheets";

const COMPONENT = "forms/design/components/answer_report/count.tsx";

interface IProps {
}

const CardCount: React.FC<IProps> = () => {

    const [nAnswers, setNAnswers] = React.useState<number>(0);

    return (
        <Card>
            <Flex justify="space-between" align="center">
                <h1>{nAnswers} Respuestas</h1>
                <div>
                    <Button variant="bordered" color="success"><SVG_Sheets /> Vincular a Hojas de calculo</Button>
                    <Button variant="light" isIconOnly radius="full"><SVG_Options /></Button>
                </div>
            </Flex>
        </Card>
    )

}

export default CardCount;