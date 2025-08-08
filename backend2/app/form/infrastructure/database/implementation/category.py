from app.form.infrastructure.database.model.category import ModelCategory as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.form.domain.schemas.category import (
    SchemaItemCategory as I,
    SchemaDetailCategory as E,
    SchemaCreateAPICategory as C,
    SchemaUpdateCategory as U,
)

from sqlalchemy.orm import joinedload
class CategoryRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)