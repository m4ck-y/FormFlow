from pydantic import BaseModel
from domain.enum.url_type import EUrlType

class SchemaAnswer(BaseModel):
    id: int
    text: str
    value: int
    url: str
    url_type: EUrlType