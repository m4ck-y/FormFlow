from app.base.domain.schemas.base import ORMModel
from typing import Text, Optional
from pydantic import Field

from app.question.domain.schemas.question import SchemaCreateQuestion, SchemaDetailQuestion

class SchemaBaseSection(ORMModel):
    name: str = Field(..., examples=["Section 1"])
    description: Text = Field(..., examples=["Sección para recopilar datos personales del encuestado", "Sección para obtener información de contacto del encuestado"])
    order: int = Field(..., examples=[1, 2], description="Order of the section in the form")


class SchemaCreateItemSection(SchemaBaseSection):
    pass

class SchemaCreateDetailSection(SchemaBaseSection):
    list_questions: Optional[SchemaCreateQuestion]

    def Base(self) -> SchemaCreateItemSection:
        return SchemaCreateItemSection(**self.model_dump(exclude={"list_questions"}))

class SchemaItemSection(SchemaBaseSection):
    id: int

class SchemaDetailSection(SchemaItemSection):
    list_questions: Optional[SchemaDetailQuestion]

class SchemaUpdateSection(SchemaBaseSection):
    id: int