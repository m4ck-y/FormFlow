from sqlalchemy import Column, Integer, String
from infrastructure.models import BaseModel
from domain.enum.question_type import EQuestionType

class ModelConditionalLogic(BaseModel):

    __tablename__ = "conditional_logic"
    id = Column(Integer, autoincrement=True, primary_key=True)
    
    triggered_by_question_id = Column(Integer)#PUEDE SER NULL
    formula = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)

    id_question = Column(Integer, nullable=False)