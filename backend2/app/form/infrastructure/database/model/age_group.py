from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm
from app.question.infrastructure.database.model.question import questions_section

class ModelAgeGroup(BaseModel):
    __tablename__ = SchemaForm("age_group")

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)

    # 1:N | 1 age_group -> N targets
    list_target_age_groups = relationship(
        "ModelTargetAgeGroup",
        back_populates="age_group",
    )

    