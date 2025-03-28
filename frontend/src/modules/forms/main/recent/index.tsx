import { Button } from "@heroui/react";
import { Flex } from "antd";
import SVG_PLUS from "@/assets/icons/plus";
import Card from "@/modules/forms/main/components/card";
import SVG_Export from "@/assets/icons/export";
import List from "./list";
import { useNavigate } from "react-router-dom";
const Recent: React.FC = () => {

    const navigate = useNavigate();

    return (
        <Flex
            className="width-full"
            style={{ border: "1px solid red", backgroundColor: "#faf9f8" }}
            justify="center"
        >
            <Flex
                vertical
                className="max-w-[1024px] "
                style={{
                    padding: "20px",
                }}
                justify="center"
                gap={5}
            >
                <Flex justify="space-between" className="width-full">
                    <Flex gap={5}>
                        <Button variant="shadow" color="success" onPress={()=>navigate("/form/design")}>
                            <SVG_PLUS /> Nuevo formulario{" "}
                        </Button>
                        <Button variant="ghost" color="success">
                            <SVG_Export />
                            Importacion de formularios
                        </Button>
                    </Flex>
                </Flex>

                <List />
            </Flex>
        </Flex>
    );
};

export default Recent;
