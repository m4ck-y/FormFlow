from app.base.domain.schemas.base import ORMModel
from app.question.domain.schemas.question import SchemaBaseQuestion
from section.domain.schemas.section import SchemaDetailSection, SchemaBaseSection
from typing import List, Text, Optional
from pydantic import Field

class SchemaBaseForm(ORMModel):
    key: Optional[str] = Field(None, examples=["ENCUESTA123", "FOLIO12345"]) #FOLIO
    name: str = Field(..., examples=["Encuesta de Satisfacción"])
    description: Text = Field(..., examples=["Formulario para evaluar el servicio ofrecido"])

class SchemaCreateForm(SchemaBaseForm):
    list_questions: List[SchemaBaseQuestion]
    list_sections: List[SchemaBaseSection]

class SchemaItemForm(SchemaCreateForm):
    id: int

class SchemaDetailForm(SchemaItemForm):
    list_sections: List[SchemaDetailSection]

class SchemaUpdateForm(SchemaCreateForm):
    id: int
