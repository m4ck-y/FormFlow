from app.base.domain.schemas.base import BaseORMModel

class SBaseCie11Code(BaseORMModel):
    code: str

class SRequestCie11Code(SBaseCie11Code):
    "New(Request) and Insert(DB)"
    pass

class SUpdateCie11Code(SRequestCie11Code):
    id: int

class SResponseCIE11Code(SUpdateCie11Code):
    pass