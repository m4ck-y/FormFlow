from app.base.domain.schemas.base import BaseORMModel
from typing import List, Text, Optional
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.question.domain.enum.question_type import EQuestionType
from pydantic import Field

from app.question.domain.schemas.option import SCreateAPIItemOption, SchemaDetailOption

class SchemaBaseQuestion(BaseORMModel):
    type: EQuestionType = Field(..., examples=[EQuestionType.SINGLE_CHOICE])
    text: str = Field(..., examples=["¿Cómo calificaría la atención recibida?"])
    order: int = Field(..., examples=[1])
    #list_options
    #condicional_logic


class SchemaCreateDBQuestion(SchemaBaseQuestion):
    #id_section: int
    pass

class SCreateAPIItemQuestion(SchemaBaseQuestion):
    """
    Schema para crear un item de tipo Question como parte de un schema CreateAPI PADRE,
    por ejemplo un [SchemaCreateAPISection]{list_questions: List[SCreateAPIItemQuestion]}
    """
    list_options: List[SCreateAPIItemOption]

class SchemaCreateAPIQuestion(SchemaBaseQuestion, BaseCreateAPISchema):
    
    list_options: List[SCreateAPIItemOption]
    
    def to_db_schema(self):
        return SchemaCreateDBQuestion(
            #id_section=0,
            type=self.type,
            text=self.text,
            order=self.order
        )

class SchemaItemQuestion(SchemaBaseQuestion):
    id: int

class SchemaDetailQuestion(SchemaItemQuestion):
    list_options: List[SchemaDetailOption]

class SchemaUpdateQuestion(SchemaBaseQuestion):
    id: int