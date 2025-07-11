import type { IBaseQuestion } from "./question/base";



export interface ICreateAPIQuestion extends IBaseQuestion {
    list_answers: Answer[];
}

export interface Question {
  type: QuestionType
  text: string;
  order: number;
  id: number;
  list_answers: Answer[];
}

export interface IDetailQuestion {
  type: EQuestionType
  text: string;
  order: number;
  id: number;
  list_answers: Answer[];
}