import { useEffect, useState } from "react";
import { Input } from "@heroui/react";
import { Flex } from "antd";

const TextInput: React.FC = () => {
    const answerLabel: string = "Texto breve"; // Este es el texto de la pregunta, no editable
    const answerValueLabel: string = "Valor de la respuesta"; // Este es el texto de la respuesta, editable

    const [answerValue, setAnswerValue] = useState<number>(1); // Estado para el valor de la respuesta

    useEffect(() => {
        console.info("answerValue", answerValue);
    }, [answerValue]);

    return (
        <Flex vertical={false} style={{ gap: "10px" }} align="flex-end">
            <Input
                isDisabled
                value={answerLabel} // Este es el texto de la pregunta, no editable
                variant="underlined"
                size="lg"
                color="primary"
            />
            <Input
                value={answerValue + ""} // Mostrar la respuesta editada
                label={answerValueLabel}
                onValueChange={(value: string) => setAnswerValue(Number(value))}
                variant="underlined"
                size="lg"
                color="primary"
            />
        </Flex>
    );
};
export default TextInput;
