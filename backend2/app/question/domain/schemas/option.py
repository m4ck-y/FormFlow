from typing import Optional
from app.base.domain.schemas.base import BaseORMModel
from app.question.domain.schemas.url import SchemaCreateAPIURL, SchemaItemURL, SchemaDetailURL

class SchemaBaseOption(BaseORMModel):
    text: str
    value: int

class SchemaCreateDBOption(SchemaBaseOption):
    id_question: int

class SchemaCreateAPIOption(SchemaBaseOption):
    id_question: int
    url: Optional[SchemaCreateAPIURL]

class SchemaItemOption(SchemaBaseOption):
    id: int
    url: Optional[SchemaItemURL]

class SchemaDetailOption(SchemaItemOption):
    url: Optional[SchemaDetailURL]

class SchemaUpdateOption(SchemaBaseOption):
    id: int