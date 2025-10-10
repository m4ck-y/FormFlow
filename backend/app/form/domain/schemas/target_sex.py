from typing import Optional
from app.base.domain.schemas.base import BaseORMModel
from enum import Enum


class EBiologicalSex(int, Enum):
    """
    sexoBiologico

    sexoBiologico del paciente,
    es decir la condición biológica y fisiológica de nacimiento.
    
    Se debe registrar una de las siguientes 
    opciones: 
    - 1 – HOMBRE 
    - 2 – MUJER 
    - 3 – INTERSEXUAL

    GIIS-B015-04-11.DATOS DEL PACIENTE
    """
    HOMBRE = 1
    "MALE"
    MUJER = 2
    "FEMALE"
    INTERSEXUAL = 3
    "INTERSEXUAL"

class SchemaBaseTargetSex(BaseORMModel):
    biological_sex: EBiologicalSex


class SchemaCreateDBTargetSex(SchemaBaseTargetSex):
    id_form: int


class SchemaCreateAPITargetSex(SchemaBaseTargetSex):
    # Schema para ser usado cuando se sube un target_sex individual para un form
    id_form: int

class SchemaCreateItemAPITargetSex(SchemaBaseTargetSex):
    # Schema para ser usado sobre un schema padre (form), form{target_sex}
    pass  # El id del form se obtiene durante la transacción de creación del form

class SchemaItemTargetSex(SchemaBaseTargetSex):
    id: int

class SchemaDetailTargetSex(SchemaItemTargetSex):
    pass

class SchemaUpdateTargetSex(SchemaBaseTargetSex):
    id: int