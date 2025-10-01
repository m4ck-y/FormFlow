from app.base.domain.schemas.base import BaseORMModel
from typing import List, Text, Optional, Union
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.question.domain.enum.question_type import EQuestionType
from pydantic import Field, field_validator
import json

from app.question.domain.schemas.option import SCreateAPIItemOption, SchemaDetailOption
from app.question.domain.schemas.conditional import Conditional, ConditionalRule

class SchemaBaseQuestion(BaseORMModel):
    type: EQuestionType = Field(..., examples=[EQuestionType.SINGLE_CHOICE])
    text: str = Field(..., examples=["¿Cómo calificaría la atención recibida?"])
    order: int = Field(..., examples=[1])
    condition: Optional[Conditional | str] = Field(None, description="Condición para mostrar la pregunta")
    
    def get_condition(self) -> Optional[Conditional]:
        """Convierte condition a objeto Conditional independientemente del motor DB"""
        if isinstance(self.condition, str):
            try:
                data = json.loads(self.condition)
                return Conditional(**data)
            except Exception:
                return None
        elif isinstance(self.condition, Conditional):
            return self.condition
        return None


class SchemaCreateDBQuestion(SchemaBaseQuestion):
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
            type=self.type,
            text=self.text,
            order=self.order,
            condition=self.condition
        )

class SchemaItemQuestion(SchemaBaseQuestion):
    id: int

class SchemaDetailQuestion(SchemaItemQuestion):
    list_options: List[SchemaDetailOption]

class SchemaUpdateQuestion(SchemaBaseQuestion):
    id: int

class SchemaQuestionResponse(BaseORMModel):
    """Schema optimizado para respuestas API - condition siempre como objeto estructurado"""
    id: int
    type: EQuestionType = Field(..., examples=[EQuestionType.SINGLE_CHOICE])
    text: str = Field(..., examples=["¿Cómo calificaría la atención recibida?"])
    order: int = Field(..., examples=[1])
    condition: Optional[Conditional] = Field(None, description="Condición para mostrar la pregunta")
    list_options: List[SchemaDetailOption]
    
    @field_validator('condition', mode='before')
    @classmethod
    def parse_condition_json(cls, v):
        """Convierte automáticamente JSON string a objeto Conditional"""
        if isinstance(v, str):
            try:
                data = json.loads(v)
                return Conditional(**data)
            except json.JSONDecodeError:
                return None
        elif isinstance(v, dict):
            return Conditional(**v)
        return v