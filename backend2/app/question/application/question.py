from app.base.application.base import BaseLayerApplication
from app.question.domain.repository.question import IRepositoryQuestion as IRepository
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateQuestion as C,
    SchemaUpdateQuestion as U,
)

class QuestionApplication(BaseLayerApplication[C,I,E,C,U]):
    def __init__(self, repository: IRepository):
        super().__init__(repository)