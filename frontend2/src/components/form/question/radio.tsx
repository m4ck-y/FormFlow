import { Button, Input, Radio, RadioGroup } from "@heroui/react";
import { Flex } from "antd";
import { useState } from "react";
import SVGPlusIcon from "@/assets/icons/plus";
import SVGTrashIcon from "@/assets/icons/trash";
const RadioInput = () => {
    const optionLabel: string = "Opcion";
    const optionValueLabel: string = "Valor de la respuesta";
    const optionValue: number = 1;

    // Estado para manejar las opciones y sus valores asociados (peso)
    const [listOptions_State, setListOptions_State] = useState<
        { text: string; value: number }[]
    >([
        { text: "Opción 1", value: optionValue }, // Inicializar con una opción
    ]);

    // Función para agregar una nueva opción
    const handleAddOption = () => {
        const new_option_label = `${optionLabel} ${listOptions_State.length + 1}`;
        const new_option_value = listOptions_State.length + 1; // Generar un nuevo valor (peso) para la opción

        setListOptions_State([
            ...listOptions_State,
            { text: "", value: new_option_value }, // Añadir la nueva opción con su valor
        ]);
    };
    // Función para actualizar el valor de una opción
    const handleValueChange = (index: number, newValue: number) => {
        newValue = newValue || 0;
        const updatedOptions = [...listOptions_State];
        updatedOptions[index].value = newValue; // Actualizar el valor de la opción seleccionada
        setListOptions_State(updatedOptions);
        console.info("listOptions_State Value Change", index, listOptions_State);
    };

    const handleTextChange = (index: number, text: string) => {
        const updatedOptions = [...listOptions_State];
        updatedOptions[index].text = text; // Actualizar el valor de la opción seleccionada
        setListOptions_State(updatedOptions);
        console.info("listOptions_State Text Change", index, listOptions_State);
    };

    const handleTextFocusChange = (index: number) => {
        let optionItem = listOptions_State[index];
        if (optionItem.text.length < 1) {
            let newText = `${optionLabel} ${index + 1}`;
            handleTextChange(index, newText);
        }
    };

    // Función para eliminar una opción
    const handleRemoveOption = (index: number) => {
        const updatedOptions = listOptions_State.filter((_, i) => i !== index); // Filtrar la opción que se quiere eliminar
        setListOptions_State(updatedOptions);
    };

    return (
        <Flex vertical align="start">
            {/* Renderizar el grupo de opciones de radio */}
            <RadioGroup className="w-full">
                {listOptions_State.map((option, index) => (
                    <Flex
                        key={index}
                        align="flex-end"
                        style={{ gap: "10px", height: "60px" }}
                    >
                        <div className="h-full flex bg-red-500">
                            <Radio disabled value="" />
                        </div>
                        <Input
                            //isClearable
                            autoFocus
                            value={option.text.toString()}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                            onFocusChange={(isFocused) => {
                                if (isFocused == false) handleTextFocusChange(index);
                            }}
                            placeholder="Opcion"
                            variant="underlined"
                            size="lg"
                            color="primary"
                        />
                        {/* Campo de entrada para el valor de la opción */}
                        <Input
                            value={option.value.toString()}
                            onChange={(e) =>
                                handleValueChange(index, parseFloat(e.target.value))
                            }
                            label={optionValueLabel}
                            variant="underlined"
                            size="lg"
                            color="primary"
                        /* #TODO: GRID? FLEX?
                                      classNames={{
                                          base: "max-w-sm"
                                      }} */
                        />
                        {listOptions_State.length > 1 && (
                            <Flex vertical={false} align="center" className="h-full">
                                <Button
                                    onPress={() => handleRemoveOption(index)}
                                    size="sm"
                                    color="danger"
                                    isIconOnly
                                    aria-label="Like"
                                    variant="light"
                                    radius="full"
                                >
                                    <SVGTrashIcon />
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                ))}
                <Flex
                    key={"new-option"}
                    align="flex-end"
                    style={{ gap: "10px", height: "60px" }}
                >
                    <div className="h-full flex items-center">
                        <Radio disabled value="" />
                    </div>
                    <Input
                        onFocus={() => handleAddOption()}
                        placeholder="agregar opcion"
                        variant="underlined"
                        size="lg"
                        color="primary"
                    />
                    <Flex vertical={false} align="center" className="h-full">
                        <Button
                            onPress={() => handleAddOption()}
                            size="sm"
                            color="primary"
                            isIconOnly
                            variant="light"
                            radius="full"
                        >
                            <SVGPlusIcon />
                        </Button>
                    </Flex>
                </Flex>
            </RadioGroup>
        </Flex>
    );
};

export default RadioInput;