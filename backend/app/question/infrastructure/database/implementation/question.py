from typing import Optional
from app.base.domain.repository.session import TSession
from app.question.infrastructure.database.implementation.questions_form import CreateQuestionsForm
from app.question.infrastructure.database.implementation.questions_section import CreateQuestionsSection
from app.question.infrastructure.database.model.question import ModelQuestion as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateDBQuestion as C,
    SchemaUpdateQuestion as U,
)
from app.base.domain.exception import UniqueConstraintException


from app.question.domain.schemas.questions_section import SchemaCreateDBQuestionsSection
from app.question.domain.schemas.questions_form import SchemaCreateDBQuestionsForm
from app.utils.log import log_error
class QuestionRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)


    def CreateWithForm(self, entity: SchemaCreateDBQuestionsForm, db: TSession) -> int:
        """NO COMMIT"""
        return CreateQuestionsForm(db, entity)

    def CreateWithSections(self, entity: SchemaCreateDBQuestionsSection, db: TSession) -> int:
        """NO COMMIT"""
        return CreateQuestionsSection(db, entity)