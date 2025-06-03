from typing import Optional
from app.question.infrastructure.database.model.question import ModelQuestion as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateQuestion as C,
    SchemaUpdateQuestion as U,
)
from app.base.domain.exception import UniqueConstraintException
class QuestionRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)