from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel

class ModelForm(BaseModel):
    __tablename__ = "form"

    key = Column(String(255), unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)

    # 1:N | 1 form -> N sections
    list_sections = relationship("ModelSection", back_populates="form")
    # 1:N | 1 form -> N questions
    list_questions = relationship("ModelQuestionsForm", back_populates="form")