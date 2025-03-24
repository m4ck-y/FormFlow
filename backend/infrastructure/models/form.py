from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String
from infrastructure.models import BaseModel

class ModelForm(BaseModel):

    __tablename__ = "form"

    id = Column(Integer, autoincrement=True, primary_key=True)

    key = Column(String(255))
    name = Column(String(255), nullable=False)
    description = Column(String(255))

    list_questions = relationship("ModelQuestion", back_populates="form")