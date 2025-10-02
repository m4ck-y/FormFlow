from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm


class EReferenceType(Enum):
    FILE = "FILE"
    LINK = "LINK"

class ModelReference(BaseModel):
    __tablename__ = SchemaForm.TBL_REFERENCE.name
    __table_args__ = {"schema": SchemaForm.TBL_REFERENCE.schema}

    id_form = Column(Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), nullable=False)
    # 1:1 | 1 reference -> 1 form
    form = relationship("ModelForm", back_populates="list_references")

    url_reference = Column(String(255), nullable=False) # url de la fuente o url del archivo que proceso el servidor de files
    name = Column(String(255))
    notes = Column(Text)
    url_thumbnail = Column(String(255)) # miniatura de la fuente, si es web extraer el opengraph o si es archvo estraer el preview
    type = Column(SQLAlchemyEnum(EReferenceType), nullable=False)