from sqlalchemy import Column, Enum, Integer, String, Table, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm
from app.question.domain.enum.question_type import EQuestionType

class ModelQuestion(BaseModel):
    __tablename__ = SchemaForm("question")

    type = Column(Enum(EQuestionType), nullable=False)
    text = Column(String, nullable=False)
    order = Column(Integer, nullable=False)

    # 1:N | 1 question -> N questions_section
    list_questions_section = relationship(
        "ModelQuestionsSection",
        back_populates="question"
        )

    #N:1 | N questions -> 1 form
    #list_questions_form
    