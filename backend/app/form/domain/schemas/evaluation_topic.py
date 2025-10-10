from app.base.domain.schemas.base import BaseORMModel
from typing import Optional
from pydantic import Field

class SchemaBaseEvaluationTopic(BaseORMModel):
    name: str = Field(..., examples=["Salud Mental"])
    description: Optional[str] = Field(None, examples=["Evaluación de aspectos psicológicos y emocionales"])
    key_industry: str = Field("health", examples=["health"])


class SchemaCreateDBEvaluationTopic(SchemaBaseEvaluationTopic):
    pass

class SchemaCreateAPIEvaluationTopic(SchemaBaseEvaluationTopic):
    pass

class SchemaItemEvaluationTopic(SchemaBaseEvaluationTopic):
    id: int

class SchemaDetailEvaluationTopic(SchemaItemEvaluationTopic):
    pass

class SchemaUpdateEvaluationTopic(SchemaBaseEvaluationTopic):
    id: int