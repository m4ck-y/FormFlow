from typing import Optional
from app.base.domain.schemas.base import BaseORMModel

class SchemaBaseEstimatedDuration(BaseORMModel):

    min_minutes: int
    max_minutes: int
    description: Optional[str]

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