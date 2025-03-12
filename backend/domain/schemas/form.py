from pydantic import BaseModel
from typing import List, Text, Optional
from domain.schemas.question import SchemaQuestion


class SchemaFormCreate(BaseModel):
    key: Optional[str]#FOLIO
    name: str
    id_category: int
    description: Text
    questions: List[SchemaQuestion]
    

class SchemaForm(SchemaFormCreate):
    id: int