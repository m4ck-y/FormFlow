from app.base.domain.schemas.base import BaseORMModel
from typing import Optional

class SchemaBaseEvaluationTopic(BaseORMModel):
    name: str
    description: Optional[str] = None
    key_industry: str = "health"


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