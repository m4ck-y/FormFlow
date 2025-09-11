from abc import ABC
from app.base.domain.repository.base import IBaseRepository
from app.section.domain.schemas.section import (
    SchemaItemSection as I,
    SchemaDetailSection as E,
    SchemaCreateAPISection as C,
    SchemaUpdateSection as U,
)

class IRepositorySection(IBaseRepository[C,I,E,C,U], ABC):
    pass
