from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm


target_age_group = Table(
    SchemaForm.TBL_TARGET_AGE_GROUP.name,
    BaseModel.metadata,
    Column("id_form", Integer, ForeignKey("form.id"), primary_key=True),
    Column("id_age_group", Integer, ForeignKey(f"{SchemaForm.TBL_AGE_GROUP.identifier}.id"), primary_key=True),
    schema=SchemaForm.NAME
)

class ModelAgeGroup(BaseModel):
    __tablename__ = SchemaForm.TBL_AGE_GROUP.name

    __table_args__ = {"schema": SchemaForm.NAME}

    name = Column(String(255), nullable=False)
    
    min_age = Column(Integer)
    max_age = Column(Integer)

    # 1:N | 1 age_group -> N targets
    form = relationship(
        "ModelForm",
        back_populates="target_age_group",
        secondary=target_age_group,
        uselist=False)