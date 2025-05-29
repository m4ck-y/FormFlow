from abc import ABC
from app.base.domain.repository.base import IBaseRepository
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateForm as C,
    SchemaUpdateForm as U,
)

class IRepositoryForm(IBaseRepository[C,I,E,C,U], ABC):
    pass
