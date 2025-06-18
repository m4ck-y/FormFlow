from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm


class ModelEstimatedDuration(BaseModel):
    __tablename__ = SchemaForm("estimated_duration")

    id_form = Column(Integer, ForeignKey("form.id"), nullable=False)
    # 1:1 | 1 estimated duration -> 1 form
    form = relationship("ModelForm", back_populates="estimated_duration")

    min_minutes = Column(Integer, nullable=False)
    max_minutes = Column(Integer, nullable=False)

    description = Column(String(255))
