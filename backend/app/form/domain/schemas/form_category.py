from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SCreateDBFormCategory(BaseORMModel):
    id_form: int = Field(..., examples=[1])
    id_category: int = Field(..., examples=[1])