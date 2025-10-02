from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SCreateDBFormEvaluationTopics(BaseORMModel):
    id_form: int = Field(..., examples=[1])
    id_evaluation_topic: int = Field(..., examples=[1])