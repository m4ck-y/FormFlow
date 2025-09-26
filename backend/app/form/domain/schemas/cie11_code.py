from app.base.domain.schemas.base import BaseORMModel

class SBaseCie11Code(BaseORMModel):
    code: str

class SRequestCie11Code(SBaseCie11Code):
    "New(Request) and Insert(DB)"
    id_form: int

class SNewItemCie11Code(SBaseCie11Code):
    "Without id parent: id_form"
    pass


class SUpdateCie11Code(SRequestCie11Code):
    id: int

class SResponse(SUpdateCie11Code):
    pass