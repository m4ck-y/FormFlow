from app.base.domain.schemas.base import ORMModel
from typing import Text, Optional
from pydantic import Field

class SchemaBaseSection(ORMModel):
    name: str = Field(..., examples=["Section 1"])
    description: Text = Field(..., examples=["Sección para recopilar datos personales del encuestado", "Sección para obtener información de contacto del encuestado"])

class SchemaCreateSection(SchemaBaseSection):
    id_form: int = Field(..., examples=[1, 2], description="ID of the form to which this section belongs")

class SchemaItemSection(SchemaCreateSection):
    id: int


class SchemaDetailSection(SchemaItemSection):
    #questions
    pass