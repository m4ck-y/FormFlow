import Card from "@/components/card";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useEffect } from "react";
import { NodeIndexOutlined } from "@ant-design/icons";
import type { IDetailForm } from "@/domain/models/form";
import { Flex } from "antd";
import SVG_Plus from "@/assets/icons/plus";
import {Textarea} from "@heroui/input";


const CardObservaciones: React.FC = () => {
    return (
        <Card>
            <h1>Observaciones</h1>
            <Flex>
            <Textarea/>
            </Flex>
        </Card>

    )
}

export default CardObservaciones