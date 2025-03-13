from pydantic import BaseModel
from typing import List, Text, Optional
from domain.schemas.question import SchemaQuestion, SchemaQuestionCreate
#from .pyobject_id import PyObjectId
from pydantic import Field


class SchemaFormBase(BaseModel):
    key: Optional[str] = Field(None, examples=["ENCUESTA123", "FOLIO12345"]) #FOLIO
    name: str = Field(..., examples=["Encuesta de Satisfacción"])
    description: Text = Field(..., examples=["Formulario para evaluar el servicio ofrecido"])
        

class SchemaFormCreate(SchemaFormBase):
    
    #list_categories: List[int] #TODO: Implementar categorias, comunicacion EXTERNA BD principal
    list_questions: List[SchemaQuestionCreate]
    

class SchemaMongoDBForm(SchemaFormCreate):
    #id: PyObjectId = Field()
    pass

class SchemaForm(SchemaFormBase):
    id: int