from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

class ModelCIE11Code(BaseModel):
    __tablename__ = SchemaForm.TBL_FORM_CIE11_CODE.name
    __table_args__ = {"schema": SchemaForm.TBL_FORM_CIE11_CODE.schema}

    id_form = Column(Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), nullable=False, primary_key=True)
    # 1:1 | 1 cie11_code -> 1 form
    form = relationship("ModelForm", back_populates="list_cie11_codes")

    code = Column(String(10), nullable=False, primary_key=True)