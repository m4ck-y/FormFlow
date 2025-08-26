from app.base.domain.schemas.base import BaseORMModel
from enum import Enum

class EUrlType(Enum):
    LINK = "LINK"
    IMAGE = "IMAGE"

class SchemaBaseURL(BaseORMModel):
    value: str
    type: EUrlType


class SchemaCreateDBURL(SchemaBaseURL):
    id_option: int

class SchemaCreateAPIURL(SchemaBaseURL):
    id_option: int

class SchemaItemURL(SchemaBaseURL):
    id: int

class SchemaDetailURL(SchemaItemURL):
    pass

class SchemaUpdateURL(SchemaBaseURL):
    id: int