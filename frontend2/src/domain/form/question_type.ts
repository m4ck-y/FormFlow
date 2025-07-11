import { EQuestionType } from "@/domain/enum/question/types";

interface IQuestionTypeDetails {
    id: EQuestionType;
    label: string;
}

export const ListQuestionTextLabels: IQuestionTypeDetails[] = [
    { id: EQuestionType.TEXT, label: "Respuesta corta" }
]

export const ListQuestionObtionsLabels: IQuestionTypeDetails[] = [
    { id: EQuestionType.MULTIPLE_CHOICE, label: "Selección múltiple" },
    { id: EQuestionType.SINGLE_CHOICE, label: "Selección única" }
]

export const ListQuestionTypesLabels: IQuestionTypeDetails[] = [
    ...ListQuestionTextLabels,
    ...ListQuestionObtionsLabels
]