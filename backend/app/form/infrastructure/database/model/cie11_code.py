from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import Base
from app.form.infrastructure.database.schema import SchemaForm

class ModelCIE11Code(Base): #TODO: table, updatated_by, deleted_by, etc, se puede hacer una clase que herede de table? y tendria atributos creted_at, by?, etc, ...
    __tablename__ = SchemaForm.TBL_FORM_CIE11_CODE.name
    __table_args__ = {"schema": SchemaForm.TBL_FORM_CIE11_CODE.schema}

    id = Column(Integer, autoincrement=True, primary_key=True)

    id_form = Column(Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), nullable=False, primary_key=True)
    # 1:1 | 1 cie11_code -> 1 form
    form = relationship("ModelForm", back_populates="list_cie11_codes")

    code = Column(String(10), nullable=False, primary_key=True)