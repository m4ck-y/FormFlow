import { Accordion, AccordionItem } from "@heroui/react";
import { useState } from "react";
import Card from "@/modules/forms/main/components/card";
import { Flex } from "antd";

interface IProps {
    Button?: React.FC;
}

const List: React.FC<IProps> = ({ Button }) => {
    // Estado para controlar el acordeón
    const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

    //Button.

    // Función para manejar el cambio de selección
    const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
        if (keys !== "all") {
            setSelectedKeys(keys as Set<string>);
        }
    };

    // Función para manejar el clic en el botón
    const handleButtonClick = (): void => {
        const newKeys = new Set(selectedKeys);
        if (newKeys.has("1")) {
            newKeys.delete("1");
        } else {
            newKeys.add("1");
        }
        setSelectedKeys(newKeys);
    };

    return (
        <Accordion
            selectedKeys={selectedKeys}
            //onSelectionChange={handleSelectionChange}
            className="px-8"
        >
            <AccordionItem
                key="1"
                aria-label="Sección expandible"
                title="Información adicional"
                classNames={{
                    heading: "hidden", // Oculta completamente el heading del acordeón
                    trigger: "hidden", // Oculta el trigger del acordeón
                    titleWrapper: "hidden", // Oculta el wrapper del título
                }}
                //subtitle="Esta sección se controla desde el header"
                hideIndicator={true} // Ocultamos el indicador ya que el control está en el header
            >
                <Flex
                    vertical={false}
                    className="width-full"
                    style={{
                        //backgroundColor: "blue",
                        padding: "20px",
                    }}
                    justify="center"
                    gap={5}
                >
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </Flex>
            </AccordionItem>
        </Accordion>
    );
};

export default List;
