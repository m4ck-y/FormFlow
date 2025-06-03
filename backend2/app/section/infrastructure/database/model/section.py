from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm


class ModelSection(BaseModel):
    __tablename__ = SchemaForm("section")
    
    id_form = Column(Integer, ForeignKey("form.id"), nullable=False)
    # 1:1 | 1 section -> 1 form
    form = relationship("ModelForm", back_populates="list_sections")
    
    # 1:N | 1 section -> N questions
    list_questions_section = relationship("ModelQuestionsSection",back_populates="section")

    name = Column(String(255), nullable=False)
    description = Column(Text)
    order = Column(Integer, nullable=False)