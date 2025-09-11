from abc import ABC, abstractmethod
from app.base.domain.repository.session import TSession
from app.base.domain.repository.base import IBaseRepository
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateDBQuestion as C,
    SchemaUpdateQuestion as U,
)
from app.question.domain.schemas.questions_form import SchemaCreateDBQuestionsForm

class IRepositoryQuestion(IBaseRepository[C,I,E,C,U], ABC):
    
    @abstractmethod
    def CreateWithForm(self, entity: SchemaCreateDBQuestionsForm, db: TSession) -> int:
        raise NotImplementedError
    @abstractmethod
    def CreateWithSection(self, entity: SchemaCreateDBQuestionsForm, db: TSession) -> int:
        raise NotImplementedError