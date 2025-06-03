from typing import Optional
from app.section.infrastructure.database.model.section import ModelSection as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.section.domain.schemas.section import (
    SchemaItemSection as I,
    SchemaDetailSection as E,
    SchemaCreateSection as C,
    SchemaUpdateSection as U,
)
from app.base.domain.exception import UniqueConstraintException
class SectionRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)