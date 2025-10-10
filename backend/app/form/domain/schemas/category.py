from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SchemaBaseCategory(BaseORMModel):
    key_industry: int = Field(..., examples=[1])
    name: str = Field(..., examples=["Salud Mental"])


class SchemaCreateDBCategory(SchemaBaseCategory):
    pass

class SchemaCreateAPICategory(SchemaBaseCategory):
    pass

class SchemaItemCategory(SchemaBaseCategory):
    id: int

class SchemaDetailCategory(SchemaItemCategory):
    pass

class SchemaUpdateCategory(SchemaBaseCategory):
    id: int