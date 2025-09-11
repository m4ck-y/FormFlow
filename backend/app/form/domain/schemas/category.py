from app.base.domain.schemas.base import BaseORMModel

class SchemaBaseCategory(BaseORMModel):
    key_industry: int
    name: str


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