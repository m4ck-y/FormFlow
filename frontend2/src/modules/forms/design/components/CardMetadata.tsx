import Card from "@/components/card";
import {
    Accordion,
    AccordionItem,
    Button,
    Checkbox,
    CheckboxGroup,
    Chip,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Input,
    Select,
    SelectItem,
    Tooltip,
    useDisclosure,
} from "@heroui/react";
import React, { useEffect } from "react";
import { NodeIndexOutlined } from "@ant-design/icons";
import type { IDetailForm } from "@/domain/models/form";
import { Flex } from "antd";
import SVG_Plus from "@/assets/icons/plus";
import type { THUIColor } from "@/types/colors";
import SVG_Trash from "@/assets/icons/trash";
import SVG_Search from "@/assets/icons/search";

const COMPONENT = "forms/design/components/CardForm.tsx";

// If you want to type color_input, use the type from Input props
// import type { InputProps } from "@heroui/react"; // Uncomment if needed
// const color_input: InputProps["color"] = "primary";
const color_input: THUIColor = "primary";

interface IProps {
    key?: string;
    what_it_evaluates?: string[];
    target_age_group?: string;
    target_sex?: string;
    setForm: React.Dispatch<React.SetStateAction<IDetailForm>>;
}

const CardMetadata: React.FC<IProps> = ({ title, description }) => {
    const [formTitle, setFormTitle] = React.useState(title);
    const [formDescription, setFormDescription] = React.useState(description);


    const [tmpListWhatItEvaluates, setTmpListWhatItEvaluates] = React.useState<string[]>([]);
    const [selectedWhatItEvaluates, setSelectedWhatItEvaluates] = React.useState<string[]>([]);
    const [tmpListCategory, setTmpCategory] = React.useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [tmpTargetAgeGroup, setTmpTargetAgeGroup] = React.useState<string>("");
    const [tmpTargetSex, setTmpTargetSex] = React.useState<string>("");

    const { isOpen: isOpenWhatItEvaluates, onOpen: onOpenWhatItEvaluates, onOpenChange: onOpenChangeWhatItEvaluates } = useDisclosure();

    const { isOpen: isOpenCategory, onOpen: onOpenCategory, onOpenChange: onOpenChangeCategory } = useDisclosure();


    useEffect(() => {
        setTmpListWhatItEvaluates(["Reflujo gastrointestinal", "Discapacidad para la Lumbalgia", "Severidad de la enfermedad de crohn"]);
        setTmpCategory(["Bienestar físico", "Bienestar social", "Bienestar mental"]);
    }, []);

    console.error(
        ">>>",
        COMPONENT,
        "CardForm rendered with title:",
        title,
        "and description:",
        description
    );

    useEffect(() => {
        console.log(
            ">>>",
            COMPONENT,
            "CardForm mounted with title:",
            title,
            "and description:",
            description
        );
        setFormTitle(title || "");
        setFormDescription(description || "");
    }, [title, description]);

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormTitle(e.target.value);
    };

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDescription(e.target.value);
    };

    const handleUnSelectCategory = (categoryToRemove: any) => {
        //setTmpCategory(tmpListCategory.filter((value) => value !== categoryToRemove));
        setSelectedCategory(selectedCategory.filter((value) => value !== categoryToRemove));
        console.warn(">>>", COMPONENT, "handleUnSelectCategory called with categoryToRemove:", categoryToRemove, selectedCategory);
        if (tmpListCategory.length === 1) {
            //setTmpCategory([]); // Clear the list if it was the last item
            setSelectedCategory([]); // Clear the selected categories
        }
    }

    return (
        <Card>
            <Flex vertical gap={10}>
                <Input
                    placeholder="Clave"
                    value={formTitle}
                    //isClearable
                    //onClear={() => setFormTitle("")}
                    variant="underlined"
                    size="lg"
                    color="primary"
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <NodeIndexOutlined />
                        </div>
                    }
                    onChange={titleHandler}
                />

                <Flex align="center" gap={5}>
                    <Select
                        label="Grupo etario"
                        variant="underlined"
                        color={color_input}
                        labelPlacement="outside"
                    >
                        <SelectItem>15- 90 años o más</SelectItem>
                        <SelectItem>mayores de 60 años</SelectItem>
                        <SelectItem>12-15 años</SelectItem>
                    </Select>
                    <Button
                        size="sm"
                        isIconOnly
                        color={color_input}
                        variant="shadow"
                        radius="full"
                    >
                        <SVG_Plus />
                    </Button>
                </Flex>

                <Flex align="center" gap={5}>
                    <Select
                        label="Sexo"
                        variant="underlined"
                        color={color_input}
                        labelPlacement="outside"
                    >
                        <SelectItem>Hombres</SelectItem>
                        <SelectItem>Mujeres</SelectItem>
                    </Select>
                    <Button
                        size="sm"
                        isIconOnly
                        color={color_input}
                        variant="shadow"
                        radius="full"
                    >
                        <SVG_Plus />
                    </Button>
                </Flex>

                <Accordion>
                    <AccordionItem title="¿Que evalua?">
                        <Flex className="w-full" vertical gap={10}>
                            <Button
                                size="sm"
                                isIconOnly
                                color={color_input}
                                variant="shadow"
                                radius="full"
                                onPress={onOpenWhatItEvaluates}
                            >
                                <SVG_Plus />
                            </Button>


                            {
                                tmpListWhatItEvaluates.map((item, index) => (
                                    <div className="flex justify-between items-center">
                                        <p key={index}>{item}</p>
                                        <Tooltip content="Eliminar">
                                            <Button color="danger" isIconOnly radius="full">
                                                <SVG_Trash />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                ))
                            }
                        </Flex>
                    </AccordionItem>
                </Accordion>
                <Drawer isOpen={isOpenWhatItEvaluates} onOpenChange={onOpenChangeWhatItEvaluates} backdrop="blur" size="sm">
                    <DrawerContent>
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-col gap-1">¿Que evalua?</DrawerHeader>
                                <DrawerBody>
                                    <Input
                                        radius="full"
                                        classNames={{
                                            base: "max-w-full sm:max-w-[10rem] h-10",
                                            mainWrapper: "h-full",
                                            input: "text-small",
                                            inputWrapper:
                                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                        }}
                                        placeholder="Búsqueda"
                                        size="sm"
                                        startContent={<SVG_Search />}
                                        type="search"
                                    />

                                </DrawerBody>
                                <DrawerFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                </DrawerFooter>
                            </>
                        )}
                    </DrawerContent>
                </Drawer>

                <Accordion>
                    <AccordionItem title="Categorias">
                        <Flex className="w-full" vertical gap={10}>
                            <Button
                                size="sm"
                                isIconOnly
                                color={color_input}
                                variant="shadow"
                                radius="full"
                                onPress={onOpenCategory}
                            >
                                <SVG_Plus />
                            </Button>


                            {
                                /* tmpListCategory.map((item, index) => (
                                    <div className="flex justify-between items-center">
                                        <p key={index}>{item}</p>
                                        <Tooltip content="Eliminar">
                                            <Button color="danger" isIconOnly radius="full">
                                                <SVG_Trash />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                )) */
                            }

                            <div className="flex gap-2">
                                {
                                    selectedCategory.map((item, index) => (

                                        <Chip
                                            key={index} variant="shadow" color="success"
                                            onClose={() => handleUnSelectCategory(item)}>
                                            {item}
                                        </Chip>
                                    ))
                                }
                            </div>
                        </Flex>
                    </AccordionItem>
                </Accordion>
                <Drawer isOpen={isOpenCategory} onOpenChange={onOpenChangeCategory} backdrop="blur" size="sm">
                    <DrawerContent>
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-col gap-1">Categorias</DrawerHeader>
                                <DrawerBody>
                                    <Input
                                        radius="full"
                                        classNames={{
                                            base: "max-w-full sm:max-w-[10rem] h-10",
                                            mainWrapper: "h-full",
                                            input: "text-small",
                                            inputWrapper:
                                                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                        }}
                                        placeholder="Búsqueda"
                                        size="sm"
                                        startContent={<SVG_Search />}
                                        type="search"
                                    />

                                    <CheckboxGroup defaultValue={selectedCategory} onChange={setSelectedCategory}>
                                        {tmpListCategory.map((item, index) => (
                                            <Checkbox key={index} value={item}>
                                                {item}
                                            </Checkbox>
                                            
                                        ))}
                                    </CheckboxGroup>

                                    <Button color="primary" variant="shadow" isIconOnly radius="full" onPress={()=> setSelectedCategory(tmpListCategory, )} ><SVG_Plus /></Button>
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button color="danger" variant="flat" onPress={onClose}>
                                        Cancelar
                                    </Button>
                                </DrawerFooter>
                            </>
                        )}
                    </DrawerContent>
                </Drawer>
                <Input
                    placeholder="Poblacion en especifico"
                    value={formDescription}
                    variant="underlined"
                    //isClearable
                    color="primary"
                    onChange={descriptionHandler}
                />
            </Flex>
        </Card>
    );
};

const list_Item = (
    key: any,
    data: { text: string; id: number },
    onDelete: (id: any) => void,
    onEdit: any
) => {
    return (
        <div key={key} className="flex justify-between items-center">
            <p>{data.text}</p>
            <Tooltip content="Eliminar">
                <Button color="danger" isIconOnly onClick={() => onDelete(data.id)}>
                    <SVG_Trash />
                </Button>
            </Tooltip>
        </div>
    );
};

export default CardMetadata;
