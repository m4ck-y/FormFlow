from typing import Optional
from app.base.domain.schemas.base import BaseORMModel


class SchemaBaseAgeGroup(BaseORMModel):
    name: str
    min_age: Optional[int]
    max_age: Optional[int]

class SchemaCreateDBAgeGroup(SchemaBaseAgeGroup):
    pass

class SchemaCreateAPIAgeGroup(SchemaBaseAgeGroup):
    pass

class SchemaItemAgeGroup(SchemaBaseAgeGroup):
    id: int

class SchemaDetailAgeGroup(SchemaItemAgeGroup):
    pass

class SchemaUpdateAgeGroup(SchemaBaseAgeGroup):
    id: int