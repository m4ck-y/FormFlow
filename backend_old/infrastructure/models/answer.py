from sqlalchemy import Column, ForeignKey, Integer, String, Enum
from sqlalchemy.orm import relationship
from infrastructure.models import BaseModel
from domain.enum.url_type import EUrlType


class ModelAnswer(BaseModel):

    __tablename__ = "answer"

    id = Column(Integer, autoincrement=True, primary_key=True)
    text = Column(String(255), nullable=False)
    value = Column(Integer, nullable=False)
    url = Column(String(255))
    url_type = Column(Enum(EUrlType))#NULLABLE
    #help_text #TODO: Add help text

    id_question = Column(Integer, nullable=False)

    # Foreign key de la tabla 'question'
    id_question = Column(Integer, ForeignKey('question.id'), nullable=False)

    # Relación con la tabla Question
    question = relationship("ModelQuestion", back_populates="list_answers")