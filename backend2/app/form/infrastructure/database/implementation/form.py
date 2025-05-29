from app.form.infrastructure.database.model.form import ModelForm as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateForm as C,
    SchemaUpdateForm as U,
)
class FormRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)