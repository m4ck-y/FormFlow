from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SCreateDBTargetAgeGroups(BaseORMModel):
    id_form: int = Field(..., examples=[1])
    id_age_group: int = Field(..., examples=[1])