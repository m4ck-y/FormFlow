from typing import Optional
from app.form.infrastructure.database.model.form import ModelForm as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateForm as C,
    SchemaUpdateForm as U,
)
from app.base.domain.exception import UniqueConstraintException
class FormRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)

"""     def Create(self, entity, db) -> Optional[int]:
        try:
            print(f"Creating entity: {entity}, in FormRepository")
            return super().Create(entity, db)
        except Exception as e:
            print(f"Error creating entity: {entity}, in FormRepository: {e}")
            error:str = str(e).lower()
            if "unique constraint" in error:
                raise UniqueConstraintException(f"key", entity.key) """