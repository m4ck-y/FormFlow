from typing import Optional
from app.base.domain.schemas.base import BaseORMModel
from app.question.domain.schemas.url import SCreateAPIItemURL, SchemaItemURL, SchemaDetailURL

class SchemaBaseOption(BaseORMModel):
    text: str
    value: int

class SchemaCreateDBOption(SchemaBaseOption):
    id_question: int

class SchemaCreateAPIOption(SchemaBaseOption):
    id_question: int
    url: Optional[SCreateAPIItemURL]

class SCreateAPIItemOption(SchemaBaseOption):
    """
    Sin ID del padre
    Schema para crear un item de tipo Option como parte de un schema CreateAPI PADRE,
    por ejemplo un [SchemaCreateAPIQuestion]{list_options: List[SCreateAPIItemOption]}
    """
    url: Optional[SCreateAPIItemURL]

class SchemaItemOption(SchemaBaseOption):
    id: int
    url: Optional[SchemaItemURL]

class SchemaDetailOption(SchemaItemOption):
    url: Optional[SchemaDetailURL]

class SchemaUpdateOption(SchemaBaseOption):
    id: int