from typing import Optional
from app.question.infrastructure.database.implementation.question_create import QuestionCreate
from app.question.infrastructure.database.implementation.questions_section import CreateQuestionsSection
from app.section.infrastructure.database.implementation.create import SectionCreate
from app.section.infrastructure.database.model.section import ModelSection as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.section.domain.schemas.section import (
    SchemaItemSection as I,
    SchemaDetailSection as E,
    SchemaCreateAPISection as C,
    SchemaUpdateSection as U,
)

from app.question.domain.schemas.questions_section import SchemaCreateDBQuestionsSection

class SectionRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)


    def Create(self, entity, db, auto_commit = True) -> int:
        return SectionCreate(entity, db, auto_commit)