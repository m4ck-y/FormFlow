from app.base.domain.schemas.base import ORMModel
from typing import Text, Optional
from app.question.domain.enum.question_type import EQuestionType
from pydantic import Field

class SchemaBaseQuestion(ORMModel):
    type: EQuestionType
    text: str = Field(..., examples=["¿Cómo calificaría la atención recibida?"])
    order: int = Field(..., examples=[1])
    #list_answers
    #condicional_logic


class SchemaCreateQuestion(SchemaBaseQuestion):
    # list_anwsers: List[SchemaCreateAnswer]
    pass

class SchemaItemQuestion(SchemaCreateQuestion):
    id: int

class SchemaDetailQuestion(SchemaItemQuestion):
    # NOT list_questions_section
    # list_answers: List[SchemaDetailAnswer]
    pass

class SchemaUpdateQuestion(SchemaCreateQuestion):
    id: int