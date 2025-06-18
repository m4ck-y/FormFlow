from typing import Optional
from app.base.domain.schemas.base import BaseORMModel

class SchemaBaseEstimatedDuration(BaseORMModel):

    min_minutes: int
    max_minutes: int
    description: Optional[str]

class SchemaCreateDBEstimatedDuration(SchemaBaseEstimatedDuration):
    id_form: int

class SchemaCreateAPIEstimatedDuration(SchemaBaseEstimatedDuration):
    id_form: int

class SchemaItemEstimatedDuration(SchemaBaseEstimatedDuration):
    id: int

class SchemaDetailEstimatedDuration(SchemaItemEstimatedDuration):
    pass

class SchemaUpdateEstimatedDuration(SchemaBaseEstimatedDuration):
    id: int