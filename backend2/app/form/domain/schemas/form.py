from app.base.domain.schemas.base import ORMModel
from typing import Text, Optional
from pydantic import Field

class SchemaBaseForm(ORMModel):
    key: Optional[str] = Field(None, examples=["ENCUESTA123", "FOLIO12345"]) #FOLIO
    name: str = Field(..., examples=["Encuesta de Satisfacción"])
    description: Text = Field(..., examples=["Formulario para evaluar el servicio ofrecido"])

class SchemaCreateForm(SchemaBaseForm):
    #list_questions: List[SchemaQuestionCreate]
    pass

class SchemaItemForm(SchemaCreateForm):
    id: int

class SchemaDetailForm(SchemaItemForm):
    pass

class SchemaUpdateForm(SchemaCreateForm):
    id: int
