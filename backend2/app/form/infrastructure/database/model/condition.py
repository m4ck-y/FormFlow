from enum import Enum
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

class ModelFormCondition(BaseModel):

    __tablename__ = SchemaForm.TBL_FORM_CONDITION.name

    __table_args__ = {"schema": SchemaForm.NAME}

    id_form =  Column(Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), nullable=False)

    # 1:1 | 1 condition -> 1 form
    form = relationship("ModelForm", back_populates="condition")

    expression = Column(String(255), nullable=False) # Expresión DSL
    description = Column(Text)