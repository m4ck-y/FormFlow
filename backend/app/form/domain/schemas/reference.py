from typing import Optional
from enum import Enum
from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class EReferenceType(str, Enum):
    FILE = "FILE"
    LINK = "LINK"

class SchemaBaseReference(BaseORMModel):
    url_reference: str = Field(..., examples=["https://pubmed.ncbi.nlm.nih.gov/11485122/"])
    name: Optional[str] = Field(None, examples=["Validation of a Brief Depression Severity Measure"])
    notes: Optional[str] = Field(None, examples=["Artículo que valida el PHQ-9"])
    url_thumbnail: Optional[str] = Field(None, examples=[""])
    type: EReferenceType = Field(..., examples=["LINK"])

class SchemaCreateDBReference(SchemaBaseReference):
    id_form: int

class SchemaCreateAPIReference(SchemaBaseReference):
    # Schema para ser usado cuando se sube una referencia individual para un form
    id_form: int

class SchemaCreateItemAPIReference(SchemaBaseReference):
    # Schema para ser usado sobre un schema padre (form), form{reference}
    pass  # El id del form se obtiene durante la transacción de creación del form (se crean con todos sus schemas hijos)

class SchemaItemReference(SchemaBaseReference):
    id: int

class SchemaDetailReference(SchemaItemReference):
    pass

class SchemaUpdateReference(SchemaBaseReference):
    id: int