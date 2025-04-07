from pydantic import BaseModel

class SchemaLogin(BaseModel):
    username:str
    password:str