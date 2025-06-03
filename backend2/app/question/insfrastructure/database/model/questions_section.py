from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

class ModelQuestionsSection(BaseModel):
    __tablename__ = SchemaForm("questions_section")

    # N question -> 1 section || # N question -> 1 form

    # 1 question -> 1 section

    id_section = Column(Integer, ForeignKey(f"{SchemaForm('section')}.id"), nullable=False)
    # 1 questions_section -> 1 section
    section = relationship("ModelSection", back_populates="list_questions_section")

    id_question = Column(Integer, ForeignKey(f"{SchemaForm('question')}.id"), nullable=False)
    # 1 questions_section -> 1 question
    question = relationship("ModelQuestion", back_populates="list_questions_section")
