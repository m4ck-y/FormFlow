import CheckboxInput from "@/components/form/question/checkbox";
import RadioInput from "@/components/form/question/radio";
import TextInput from "@/components/form/question/text";
import { QuestionType } from "@/domain/enum/question/types";

// Mapeo de los tipos de pregunta a sus respectivos componentes
export const questionComponents: Record<QuestionType, React.ReactNode> = {
    [QuestionType.TEXT]: <TextInput />,
    [QuestionType.CHECKBOX]: <CheckboxInput />,
    [QuestionType.RADIO]: <RadioInput />,
  };