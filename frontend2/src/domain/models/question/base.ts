import type { EQuestionType } from "@/domain/enum/question/types"

export interface IBaseQuestion {
    type: EQuestionType
    text: string
    order: number
}