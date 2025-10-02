from typing import Optional

from enum import Enum
from app.base.domain.schemas.base import BaseORMModel

class EReferenceType(str, Enum):
    FILE = "FILE"
    LINK = "LINK"

class SchemaBaseReference(BaseORMModel):
    url_reference: str
    name: Optional[str]
    notes: Optional[str]
    url_thumbnail: Optional[str]
    type: EReferenceType

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