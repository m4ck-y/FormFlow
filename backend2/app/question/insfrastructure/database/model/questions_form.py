from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

class ModelQuestionsForm(BaseModel):

    __tablename__ = SchemaForm("questions_form")

    id_form = Column(Integer, ForeignKey("form.id"), nullable=False)

    # 1:1 | 1 question 1 form
    form = relationship("ModelForm", back_populates="list_questions_form")

    id_question = Column(Integer, ForeignKey(f"{SchemaForm('question')}.id"), nullable=False)
    # 1:1 | 1 form -> 1 questions_form
    question = relationship("ModelQuestion", back_populates="list_questions")