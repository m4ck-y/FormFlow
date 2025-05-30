from sqlalchemy import Column, String, Text
from app.base.infrastructure.database.model import BaseModel

class ModelForm(BaseModel):
    __tablename__ = "form"

    key = Column(String(255), unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)

    #list_questions = relationship("ModelQuestion", back_populates="form")