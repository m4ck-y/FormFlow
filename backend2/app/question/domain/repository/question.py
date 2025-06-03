from abc import ABC
from app.base.domain.repository.base import IBaseRepository
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateQuestion as C,
    SchemaUpdateQuestion as U,
)

class IRepositoryQuestion(IBaseRepository[C,I,E,C,U], ABC):
    pass
