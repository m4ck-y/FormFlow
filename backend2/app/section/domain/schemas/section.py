from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from typing import List, Text, Optional
from pydantic import Field

from app.question.domain.schemas.question import SchemaCreateAPIQuestion, SchemaDetailQuestion

class SchemaBaseSection(BaseORMModel):
    name: str = Field(..., examples=["Section 1"])
    description: Text = Field(..., examples=["Sección para recopilar datos personales del encuestado", "Sección para obtener información de contacto del encuestado"])
    order: int = Field(..., examples=[1, 2], description="Order of the section in the form")


class SchemaCreateDBSection(SchemaBaseSection):
    id_form: int


class SchemaCreateDetail(SchemaBaseSection, BaseCreateAPISchema):
    list_questions: List[SchemaDetailQuestion]

    def to_db_schema(self):
        return SchemaCreateDBSection(
            id_form=0,
            name=self.name,
            description=self.description,
            order=self.order
        )
    
class SchemaCreateItem(SchemaCreateDetail):
    id_form: int
    pass


class SchemaCreateAPISection(SchemaBaseSection, BaseCreateAPISchema):
    id_form: int # PARENT id
    "PARENT id"
    list_questions: List[SchemaCreateAPIQuestion]

    def to_db_schema(self):
        return SchemaCreateDBSection(
            id_form=self.id_form,
            name=self.name,
            description=self.description,
            order=self.order
        )

class SchemaItemSection(SchemaBaseSection):
    id: int

class SchemaDetailSection(SchemaItemSection):
    list_questions: List[SchemaDetailQuestion]

class SchemaUpdateSection(SchemaBaseSection):
    id: int