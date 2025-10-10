from typing import Optional
from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SchemaBaseEstimatedDuration(BaseORMModel):
    min_minutes: int = Field(..., examples=[5])
    max_minutes: int = Field(..., examples=[10])
    description: Optional[str] = Field(None, examples=["Duración estimada para completar el cuestionario"])

class SchemaCreateDBEstimatedDuration(SchemaBaseEstimatedDuration):
    id_form: int

class SchemaCreateAPIEstimatedDuration(SchemaBaseEstimatedDuration):
    # Schema para ser usado cuando se sube una estimated_duration individual para un form
    id_form: int

class SchemaCreateItemAPIEstimatedDuration(SchemaBaseEstimatedDuration):
    # Schema para ser usado sobre un schema padre (form), form{estimated_duration}
    pass  # El id del form se obtiene durante la transacción de creación del form

class SchemaItemEstimatedDuration(SchemaBaseEstimatedDuration):
    id: int

class SchemaDetailEstimatedDuration(SchemaItemEstimatedDuration):
    pass

class SchemaUpdateEstimatedDuration(SchemaBaseEstimatedDuration):
    id: int