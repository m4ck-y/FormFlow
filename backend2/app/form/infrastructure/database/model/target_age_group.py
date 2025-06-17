from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm


class ModelTargetAgeGroup(BaseModel):
    __tablename__ = SchemaForm("target_age_group")

    id_form = Column(Integer, ForeignKey("form.id"), nullable=False, unique=True)
    # 1:1 | 1 target age group -> 1 form
    form = relationship("ModelForm", back_populates="target_age_group")

    id_age_group = Column(Integer, ForeignKey(f"{SchemaForm('age_group')}.id"), nullable=False)
    age_group = relationship("ModelAgeGroup", back_populates="list_target_age_groups")