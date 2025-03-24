import { QuestionType } from "../../enum/question/types"

export const questionTypeLabels: { [key in QuestionType]: string } = {
  [QuestionType.TEXT]: "Texto",
  [QuestionType.CHECKBOX]: "Selección múltiple",
  [QuestionType.RADIO]: "Selección única"
};