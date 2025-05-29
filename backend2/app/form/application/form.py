from app.base.application.base import BaseLayerApplication
from app.form.domain.repository.form import IRepositoryForm as IRepository
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateForm as C,
    SchemaUpdateForm as U,
)

class FormApplication(BaseLayerApplication[C,I,E,C,U]):
    def __init__(self, repository: IRepository):
        super().__init__(repository)