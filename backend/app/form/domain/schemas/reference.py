from typing import Optional

from enum import Enum
from app.base.domain.schemas.base import BaseORMModel

class EReferenceType(Enum):
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
    id_form: int

class SchemaItemReference(SchemaBaseReference):
    id: int

class SchemaDetailReference(SchemaItemReference):
    pass

class SchemaUpdateReference(SchemaBaseReference):
    id: int