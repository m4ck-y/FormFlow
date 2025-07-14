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
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
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
import SVG_Pencil from "@/assets/icons/pencil";
import SVG_Options from "@/assets/icons/options";
import type { IItemCategory } from "@/domain/models/form/category";
import { CategoryService } from "@/api/form/category";

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

const CardMetadata: React.FC<IProps> = ({ }) => {
    //const [formTitle, setFormTitle] = React.useState(title);
    //const [formDescription, setFormDescription] = React.useState(description);


    const [tmpListWhatItEvaluates, setTmpListWhatItEvaluates] = React.useState<string[]>([]);
    const [selectedWhatItEvaluates, setSelectedWhatItEvaluates] = React.useState<string[]>([]);
    const [tmpListCategory, setTmpListCategory] = React.useState<IItemCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
    const [tmpTargetAgeGroup, setTmpTargetAgeGroup] = React.useState<string>("");
    const [tmpTargetSex, setTmpTargetSex] = React.useState<string>("");

    const catService = new CategoryService()

    const [tmpNewNameCategory, setTmpNewNameCategory] = React.useState<string>("");

    const { isOpen: isOpenWhatItEvaluates, onOpen: onOpenWhatItEvaluates, onOpenChange: onOpenChangeWhatItEvaluates } = useDisclosure();

    const { isOpen: isOpenCategory, onOpen: onOpenCategory, onOpenChange: onOpenChangeCategory } = useDisclosure();

    const { isOpen: isOpenModalCategory, onOpen: onOpenModalCategory, onOpenChange: onOpenChangeModalCategory } = useDisclosure();


    useEffect(() => {
        setTmpListWhatItEvaluates(["Reflujo gastrointestinal", "Discapacidad para la Lumbalgia", "Severidad de la enfermedad de crohn"]);
        catService.List().then((response) => {
            console.log(">>>", COMPONENT, "Fetched categories:", response);
            if (response.value) {
                setTmpListCategory(response.value);
            } else if (response.error) {
                console.error(">>>", COMPONENT, "Error fetching categories:", response.error);
                setTmpListCategory([{
                    id: 1,
                    name: "Error de conexxion, :(",
                    key_industry: 1
                }]);
            }
        })


    }, []);

    /* useEffect(() => {
        console.log(
            ">>>",
            COMPONENT,
            "CardForm mounted with title:",
            title,
            "and description:",
            description
        );
        //setFormTitle(title || "");
        //setFormDescription(description || "");
    }, [title, description]); */

    /* const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormTitle(e.target.value);
    };

    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDescription(e.target.value);
    }; */

    const handleUnSelectCategory = (categoryToRemove: string) => {
        //setTmpCategory(tmpListCategory.filter((value) => value !== categoryToRemove));
        setSelectedCategory(selectedCategory.filter((value, index) => String(index) !== categoryToRemove));
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
                    //value={formTitle}
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
                //onChange={titleHandler}
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
                                            onClose={() => handleUnSelectCategory(String(index))}>
                                            {item}
                                        </Chip>
                                    ))
                                }
                            </div>
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

                <Drawer isOpen={isOpenCategory} onOpenChange={onOpenChangeCategory} backdrop="blur" size="sm">
                    <DrawerContent>
                        {(onClose) => (
                            <>
                                <DrawerHeader className="flex flex-col gap-1">Categorias, <Button color="primary" variant="shadow" isIconOnly radius="full" onPress={onOpenModalCategory} ><SVG_Plus /></Button></DrawerHeader>
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

                                    <CheckboxGroup defaultValue={selectedCategory} onChange={setSelectedCategory} classNames={{
                                        wrapper: "gap-4" // Aplica un gap de 1rem entre los hijos
                                    }}>
                                        {tmpListCategory.map((item, index) => (
                                            <div className="flex justify-between items-center">
                                                <Checkbox key={item.id} value={item.name}>

                                                    {item.name}


                                                </Checkbox>

                                                <Button isIconOnly color="primary" variant="light" radius="full">
                                                    <SVG_Options />

                                                </Button>
                                            </div>

                                        ))}
                                    </CheckboxGroup>
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

                <Modal isOpen={isOpenModalCategory} onOpenChange={onOpenChangeModalCategory}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Categoria nueva</ModalHeader>
                                <ModalBody>
                                    <Input label="Nombre de la categoria" value={tmpNewNameCategory} onChange={(e) => setTmpNewNameCategory(e.target.value)} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={() => { onClose(); setTmpNewNameCategory(""); }}>
                                        Cancelar
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        if (tmpNewNameCategory.trim()) {
                                            //  setTmpCategory([...tmpListCategory, tmpNewNameCategory]);
                                            catService.Create(tmpNewNameCategory, 1).then((response) => {

                                                if (response.value) {
                                                    catService.List().then((response) => {
                                                        if (response.value){
                                                            setTmpListCategory(response.value);
                                                        }
                                                    })
                                                }
                                            });
                                        }
                                        onClose();
                                        setTmpNewNameCategory(""); // Clear the input after adding
                                    }}>
                                        Aceptar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Input
                    placeholder="Poblacion en especifico"
                    //value={formDescription}
                    variant="underlined"
                    //isClearable
                    color="primary"
                //onChange={descriptionHandler}
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
