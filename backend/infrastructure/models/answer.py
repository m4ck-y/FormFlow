from sqlalchemy import Column, Integer, String, Enum
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