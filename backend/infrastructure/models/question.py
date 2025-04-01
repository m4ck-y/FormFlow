from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from infrastructure.models import BaseModel
from domain.enum.question_type import EQuestionType

class ModelQuestion(BaseModel):
    __tablename__ = "question"

    id = Column(Integer, autoincrement=True, primary_key=True)
    type = Column(Enum(EQuestionType), nullable=False)
    text = Column(String(255), nullable=False)


    # FOREGIN KEY
    id_form = Column(Integer, ForeignKey('form.id'), nullable=False)
    # Relación con la tabla Form (un formulario tiene muchas preguntas)
    form = relationship("ModelForm", back_populates="list_questions")

    # Relación con las respuestas (una pregunta tiene muchas respuestas)
    list_answers = relationship("ModelAnswer", back_populates="question")


    #help_text = Column(String(255))# TODO
    #is_required = Column(Boolean, default=False)

