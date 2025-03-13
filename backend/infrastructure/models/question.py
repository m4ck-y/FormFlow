from sqlalchemy import Column, Integer, String, Enum
from infrastructure.models import BaseModel
from domain.enum.question_type import EQuestionType

class ModelQuestion(BaseModel):
    __tablename__ = "question"

    id = Column(Integer, autoincrement=True, primary_key=True)
    type = Column(Enum(EQuestionType), nullable=False)
    text = Column(String(255), nullable=False)


    # FOREGIN KEY
    id_form = Column(Integer, nullable=False)

    #help_text = Column(String(255))# TODO
    #is_required = Column(Boolean, default=False)