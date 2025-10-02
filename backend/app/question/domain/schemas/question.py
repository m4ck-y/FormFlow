from app.base.domain.schemas.base import BaseORMModel
from typing import List, Optional
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.question.domain.enum.question_type import EQuestionType
from pydantic import Field, field_validator, model_validator
import json

from app.question.domain.schemas.option import SCreateAPIItemOption, SchemaDetailOption
from app.question.domain.schemas.conditional import Conditional
from app.utils.log import log_info

class SchemaBaseQuestion(BaseORMModel):
    """Schema base con condition como string (para BD)"""
    type: EQuestionType = Field(..., examples=[EQuestionType.SINGLE_CHOICE])
    text: str = Field(..., examples=["¿Cómo calificaría la atención recibida?"])
    order: int = Field(..., examples=[1])
    condition: Optional[Conditional] = Field(None, description="Condición para mostrar la pregunta") #el tipo from db sqlite sera text y se necesita validad antes

    @field_validator('condition', mode='before')
    @classmethod
    def parse_condition_json(cls, v):
        """Convierte automáticamente JSON string a objeto Conditional"""
        if isinstance(v, str): #si es string convertir a objeto
            try:
                data = json.loads(v)
                return Conditional(**data)
            except json.JSONDecodeError:
                return None
        elif isinstance(v, dict):
            return Conditional(**v)
        return v

class SchemaCreateDBQuestion(SchemaBaseQuestion):
    """
    Schema para inserción en BD - se adapta para la inserción en DB ya sea SQLite (text) o PostgreSQL (jsonb).
    Aquí es donde se hace la conversión dinámica según el motor de BD.
    """
    @field_validator("condition", mode='after')
    @classmethod
    def prepare_condition_for_db(cls, v):
        """Convierte condition según el motor de BD"""
        if v and isinstance(v, Conditional):
            from app.config.db import is_db_postgres
            
            if not is_db_postgres():
                # SQLite: convertir a JSON string
                log_info("SQLite: Converting condition to JSON string")
                v = v.model_dump_json()
                log_info("SQLite: ",v)
            # PostgreSQL: mantener como objeto (se serializa automáticamente)
        return v

class SchemaCreateAPIQuestion(SchemaBaseQuestion, BaseCreateAPISchema):
    """
    Schema para API - el frontend necesita ver la estructura del JSON.
    La propiedad condition siempre será un JSON que viene desde el frontend.
    """
    list_options: List[SCreateAPIItemOption]
    
    def to_db_schema(self) -> SchemaCreateDBQuestion:
        """
        Convierte el schema de API a schema de BD.
        Aquí es donde se hace la conversión: la propiedad condition siempre será un JSON
        que viene desde el frontend, y ya para prepararlo será dinámico (convertir a text o dejarlo como JSON).
        """
        return SchemaCreateDBQuestion(
            type=self.type,
            text=self.text,
            order=self.order,
            condition=self.condition  # Se convierte automáticamente en el validator
        )

class SCreateAPIItemQuestion(SchemaBaseQuestion):
    """Schema para crear un item de tipo Question como parte de un schema CreateAPI PADRE"""
    list_options: List[SCreateAPIItemOption]

class SchemaItemQuestion(SchemaBaseQuestion):
    id: int

class SchemaDetailQuestion(SchemaItemQuestion):
    list_options: List[SchemaDetailOption]

    pass

class SchemaUpdateQuestion(SchemaBaseQuestion):
    id: int