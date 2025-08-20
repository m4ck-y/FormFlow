from sqlalchemy import Column, Enum, Integer, String, Table, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm
from app.question.domain.enum.question_type import EQuestionType
from app.question.infrastructure.database.schema import SchemaQuestion


class ModelAnswer(BaseModel):
    __tablename__ = SchemaQuestion.TBL_ANSWER.name

    __table_args__ = {"schema": SchemaQuestion.TBL_ANSWER.schema}

    id_question = Column(Integer, ForeignKey(f"{SchemaQuestion.TBL_QUESTION.identifier}.id"), nullable=False)
    question = relationship("ModelQuestion", back_populates="list_answers")

    text = Column(Text, nullable=False)
    value = Column(Integer, nullable=False)

    # 1:1 | 1 answer -> 1 url
    url = relationship("ModelURL", back_populates="answer", uselist=False)