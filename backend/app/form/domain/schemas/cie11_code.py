from app.base.domain.schemas.base import BaseORMModel
from pydantic import Field

class SBaseCie11Code(BaseORMModel):
    code: str = Field(..., examples=["6A70"])

class SRequestCie11Code(SBaseCie11Code):
    "New(Request) and Insert(DB)"
    pass

class SUpdateCie11Code(SRequestCie11Code):
    id: int

class SResponseCIE11Code(SUpdateCie11Code):
    pass