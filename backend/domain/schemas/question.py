from pydantic import BaseModel
from typing import List
from domain.enum.question_type import EQuestionType
from domain.schemas.answer import SchemaAnswer

class SchemaQuestionCreate(BaseModel):
    type: EQuestionType
    text: str

    answers: List[SchemaAnswer]

class SchemaQuestion(SchemaQuestionCreate):
    id: int