import { QuestionType } from "@/domain/enum/question/types";

interface IQuestionTypeDetails {
    id: QuestionType;
    label: string;
}

export const ListQuestionTextLabels: IQuestionTypeDetails[] = [
    { id: QuestionType.TEXT, label: "Respuesta corta" }
]

export const ListQuestionObtionsLabels: IQuestionTypeDetails[] = [
    { id: QuestionType.CHECKBOX, label: "Selección múltiple" },
    { id: QuestionType.RADIO, label: "Selección única" }
]

export const ListQuestionTypesLabels: IQuestionTypeDetails[] = [
    ...ListQuestionTextLabels,
    ...ListQuestionObtionsLabels
]