from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm


class ModelWhatItEvaluate(BaseModel):
    __tablename__ = SchemaForm("what_it_evaluate")

    id_form = Column(Integer, ForeignKey("form.id"), nullable=False)
    # 1:1 | 1 category -> 1 form
    form = relationship("ModelForm", back_populates="list_what_it_evaluate")

    name = Column(String(255), nullable=False)