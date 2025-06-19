from typing import Optional
from app.base.domain.schemas.base import BaseORMModel
from app.question.domain.schemas.url import SchemaCreateAPIURL, SchemaItemURL, SchemaDetailURL

class SchemaBaseAnswer(BaseORMModel):
    text: str
    value: int

class SchemaCreateDBAnswer(SchemaBaseAnswer):
    id_question: int

class SchemaCreateAPIAnswer(SchemaBaseAnswer):
    id_question: int
    url: Optional[SchemaCreateAPIURL]

class SchemaItemAnswer(SchemaBaseAnswer):
    id: int
    url: Optional[SchemaItemURL]

class SchemaDetailAnswer(SchemaItemAnswer):
    url: Optional[SchemaDetailURL]

class SchemaUpdateAnswer(SchemaBaseAnswer):
    id: int