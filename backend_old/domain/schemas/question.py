from pydantic import BaseModel, Field
from typing import List, Optional
from domain.enum.question_type import EQuestionType
from domain.schemas.answer import SchemaAnswerCreate
from domain.schemas.conditional_logic import SchemaConditionalLogicCreate


class SchemaQuestionCreate(BaseModel):
    type: EQuestionType
    text: str = Field(..., examples=["¿Cómo calificarías nuestro servicio?"])

    list_answers: List[SchemaAnswerCreate]
    conditional_logic: Optional[SchemaConditionalLogicCreate]

class SchemaQuestion(SchemaQuestionCreate):
    id: int