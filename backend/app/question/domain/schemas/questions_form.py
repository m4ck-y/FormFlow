from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field



class SchemaCreateDBQuestionsForm(BaseORMModel):
    id_form: int = Field(..., examples=[1])
    id_question: int = Field(..., examples=[1])