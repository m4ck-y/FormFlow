from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm
from app.question.infrastructure.database.model.question import questions_section
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

class ModelTargetSex(BaseModel):
    __tablename__ = SchemaForm.TBL_TARGET_SEX.name
    __table_args__ = {"schema": SchemaForm.NAME}

    id_form = Column(Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), nullable=False, unique=True)
    # 1:1 | 1 target_sex -> 1 form
    form = relationship("ModelForm", back_populates="target_sex")

    biological_sex = Column(SQLAlchemyEnum(EBiologicalSex), nullable=False)