from sqlalchemy import Column, Enum as SQLAlchemyEnum, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.question.infrastructure.database.schema import SchemaQuestion
from app.form.infrastructure.database.schema import SchemaForm

from enum import Enum

class EUrlType(Enum):
    LINK = "LINK"
    IMAGE = "IMAGE"

class ModelURL(BaseModel):
    __tablename__ = SchemaQuestion.TBL_URL.name

    id_answer = Column(Integer, ForeignKey(f"{SchemaQuestion.TBL_ANSWER.identifier}.id"), nullable=False, unique=True)
    # 1:1 | 1 url -> 1 answer
    answer = relationship("ModelAnswer", back_populates="url")
    value = Column(String, nullable=False)
    type = Column(SQLAlchemyEnum(EUrlType), nullable=False)
