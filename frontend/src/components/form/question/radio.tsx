import { Button, Input, Radio, RadioGroup } from "@heroui/react";
import { Flex } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
const RadioInput = () => {
    const optionLabel: string = "Opcion";
    const optionValueLabel: string = "Valor de la respuesta";
    const optionValue: number = 1;
    // Estado para manejar las opciones y sus valores asociados (peso)


    const [newOptionLabel_State, setNewOptionLabel_State] = useState(optionLabel); // Estado para el texto de la nueva opción
    const [newOptionValue_State, setNewOptionValue_State] = useState(optionValue); // Estado para el valor (peso) de la nueva opción

    // Estado para manejar las opciones y sus valores asociados (peso)
    const [listOptions_State, setListOptions_State] = useState<{ text: string; value: number }[]>([
        { text: "Opción 1", value: optionValue }, // Inicializar con una opción
    ]);
    //const [lengthOptions, setLengthOptions] = useState<number>(options.length);

    /* useEffect(() => {
        setLengthOptions(options.length);
    }, [options]); // Se ejecuta cada vez que 'options' cambia */

    // Función para agregar una nueva opción
    const handleAddOption = () => {

        const new_option_label = `${optionLabel} ${listOptions_State.length + 1}`;
        const new_option_value = listOptions_State.length + 1; // Generar un nuevo valor (peso) para la opción


        setNewOptionLabel_State(new_option_label); // Limpiar el campo de texto
        setNewOptionValue_State(new_option_value); // Limpiar el campo de valor
        setListOptions_State([
            ...listOptions_State,
            { text: new_option_label, value: new_option_value }, // Añadir la nueva opción con su valor
        ]);
    };
    // Función para actualizar el valor de una opción
    const handleValueChange = (index: number, newValue: number) => {
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

    return (
        <Flex vertical align="start">
            {/* Renderizar el grupo de opciones de radio */}
            <RadioGroup className="w-full">
                {listOptions_State.map((option, index) => (
                    <Flex key={index} align="flex-end" style={{ gap: "10px" }}>
                        <div className="h-full flex items-center">
                            <Radio value="" />
                        </div>
                        <Input
                            value={option.text.toString()}
                            onChange={(e) => handleTextChange(index, e.target.value)}
                            placeholder="Opcion"
                            variant="underlined"
                            size="lg"
                            color="primary"
                            style={{ width: "120px" }}
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
                        />
                    </Flex>
                ))}
                <Flex key={"new-option"} align="flex-end" style={{ gap: "10px" }}>
                    <div className="h-full flex items-center">
                        <Radio value="" />
                    </div>
                    <Input
                        endContent={
                            <PlusOutlined className="text-2xl text-default-400 flex-shrink-0 items-end" onClick={() => handleAddOption()} />
                        }
                        classNames={{
                            innerWrapper: "flex justify-between",
                        }}
                        onClick={() => handleAddOption()}
                        placeholder="agregar opcion"
                        variant="underlined"
                        size="lg"
                        color="primary"
                        style={{ width: "120px" }}
                    />
                </Flex>
            </RadioGroup>
        </Flex>
    );
};

export default RadioInput;
