from typing import Optional
from pydantic import BaseModel, Field
from domain.enum.url_type import EUrlType


class SchemaAwnserBase(BaseModel):
    text: str = Field(..., examples=["Excelente", "Buena", "Regular", "Mala"])
    value: int = Field(..., examples=[5, 4, 3, 2, 1])
    url: str = Field(..., examples=["http://wwww.pinterest.com/image.png", "https://www.google.com"])
    url_type: Optional[EUrlType] = Field(None, examples=["IMAGE"])
    #TODO: help_text

class SchemaAnswerCreate(SchemaAwnserBase):
    pass

class SchemaAnswer(BaseModel):
    id: int