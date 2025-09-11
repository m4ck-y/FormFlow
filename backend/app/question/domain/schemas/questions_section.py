from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SchemaCreateDBQuestionsSection(BaseORMModel):
    id_section: int = Field(..., examples=[1])
    id_question: int = Field(..., examples=[1])