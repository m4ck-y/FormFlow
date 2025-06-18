from typing import Optional
from app.base.domain.schemas.base import BaseORMModel
from enum import Enum


class EBiologicalSex(Enum):
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
    id_form: int

class SchemaItemTargetSex(SchemaBaseTargetSex):
    id: int

class SchemaDetailTargetSex(SchemaItemTargetSex):
    pass

class SchemaUpdateTargetSex(SchemaBaseTargetSex):
    id: int