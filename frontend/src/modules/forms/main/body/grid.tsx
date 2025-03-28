import Card from "@/modules/forms/main/components/card";
import { Flex } from "antd";

const Grid: React.FC = () => {
    return (
        <Flex gap={27} wrap justify="center" style={{padding:"20px"}}>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </Flex>
    )
}

export default Grid;