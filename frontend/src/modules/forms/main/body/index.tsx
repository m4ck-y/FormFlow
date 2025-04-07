import { Flex } from "antd";
import { Select, SelectItem } from "@heroui/select";
import Grid_Mode from "./grid";
import { Button } from "@heroui/react";
import SVG_List from "@/assets/icons/view_list";
import SVG_Filter from "@/assets/icons/filter";
import { Card, CardBody } from "@heroui/card";

const options = [
    { key: "all", label: "Todos" },
    { key: "owner", label: "De mi propiedad" },
    { key: "tenant", label: "Ajenos a mi propiedad" },
    { key: "favorite", label: "favoritos" },
];

const orders = [
    { key: "date", label: "Fecha de modificacion" },
    { key: "name", label: "Nombre" },
    //{ key: "owner", label: "Propietario" },
];

const Body: React.FC = () => {
    return (
        <Flex
            justify="center"
            style={{ backgroundColor: "#faf9f8" }}
            className="h-screen"
        >
            <Card className="max-w-[1024px] w-full">
                <CardBody>
                    <Flex vertical className="max-w-[1024px] w-full">
                        <Flex justify="right">
                            <div>Formularios recientes</div>

                            <Select
                                style={{ maxWidth: "190px" }}
                                selectedKeys={new Set(["all"])}
                            >
                                {options.map((option) => (
                                    <SelectItem key={option.key}>{option.label}</SelectItem>
                                ))}
                            </Select>
                            <Flex align="center" gap={5} justify="center">
                                <Button isIconOnly radius="full">
                                    <SVG_List />
                                </Button>
                                <Select
                                    style={{}}
                                    startContent={<SVG_Filter />}
                                    selectedKeys={new Set(["date"])}
                                >
                                    {orders.map((option) => (
                                        <SelectItem key={option.key}>{option.label}</SelectItem>
                                    ))}
                                </Select>
                            </Flex>
                        </Flex>
                        <Grid_Mode />
                    </Flex>
                </CardBody>
            </Card>
        </Flex>
    );
};

export default Body;
