import CheckboxInput from "@/components/form/question/checkbox";
import RadioInput from "@/components/form/question/radio";
import TextInput from "@/components/form/question/text";
import { EQuestionType } from "@/domain/enum/question/types";
import type { IDetailAnswer } from "@/domain/models/form";
import { useState } from "react";

// Mapeo de los tipos de pregunta a sus respectivos componentes
export const questionComponents: Record<EQuestionType, React.ReactNode> = {
    [EQuestionType.TEXT]: <TextInput />,
    [EQuestionType.TEXT_LONG]: <TextInput />,
    [EQuestionType.SINGLE_CHOICE]: <CheckboxInput />,
    [EQuestionType.MULTIPLE_CHOICE]: <RadioInput />,
    [EQuestionType.LIST]: <CheckboxInput />,
    [EQuestionType.DATE]: <TextInput />,
    [EQuestionType.TIME]: <TextInput />,
    [EQuestionType.DATE_TIME]: <TextInput />,
  };

export const ComponentQuestionText: [EQuestionType, React.ReactNode][] = [
    [EQuestionType.TEXT, <TextInput />],
    [EQuestionType.TEXT_LONG, <TextInput />],
];

export const ComponentQuestionOptions: [EQuestionType, React.ReactNode][] = [
    [EQuestionType.SINGLE_CHOICE, <RadioInput />],
    [EQuestionType.MULTIPLE_CHOICE, <CheckboxInput />],
    [EQuestionType.LIST, <CheckboxInput />],
];


interface IPropsAnswers {
    data: IDetailAnswer[]; // Define the type of data as needed
    selectedType?: EQuestionType;
}

export const ComponentQuestionWithAnswers: React.FC<IPropsAnswers> = ({ data, selectedType }) => {

    const [answers, setAnswers] = useState<IDetailAnswer[]>(data || []);
    const [selectedTypeState, setSelectedTypeState] = useState<EQuestionType | undefined>(selectedType);
    return (
        <>
            {selectedTypeState && questionComponents[selectedTypeState]}
        </>
    );
}