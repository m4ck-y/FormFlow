from app.base.application.base import BaseLayerApplication
from app.base.domain.repository.session import TSession
from app.question.domain.repository.question import IRepositoryQuestion as IRepository
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateAPIQuestion as C,
    SchemaUpdateQuestion as U,
)
from app.question.domain.schemas.questions_form import SchemaCreateDBQuestionsForm
from app.question.domain.schemas.questions_section import SchemaCreateDBQuestionsSection

class QuestionApplication(BaseLayerApplication[C,I,E,C,U]):
    def __init__(self, repository: IRepository):
        self.repository = repository
        super().__init__(repository)


    def CreateWithForm(self, value: SchemaCreateDBQuestionsForm, db: TSession, auto_commit = True) -> int:
        id_question = self.repository.CreateWithForm(value, db, auto_commit)
        return id_question
    
    def CreateWithSection(self, value: SchemaCreateDBQuestionsForm, db: TSession, auto_commit = True) -> int:
        id_question = self.repository.CreateWithSection(value, db, auto_commit)
        return id_question