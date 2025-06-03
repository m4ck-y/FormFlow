from app.base.application.base import BaseLayerApplication
from app.section.domain.repository.section import IRepositorySection as IRepository
from app.question.domain.repository.question import IRepositoryQuestion
from app.section.domain.schemas.section import (
    SchemaItemSection as I,
    SchemaDetailSection as E,
    SchemaCreateSection as C,
    SchemaUpdateSection as U,
)

class SectionApplication(BaseLayerApplication[C,I,E,C,U]):
    def __init__(self, repository: IRepository, question_repository: IRepositoryQuestion):
        self.question_repository = question_repository
        super().__init__(repository)

    def Create(self, value, db, auto_commit = True):
        if not value.questions:
            raise ValueError("At least one question is required to create a section.")
        
        id_section = super().Create(value, db, auto_commit)
        
        for question in value.questions:
            self.question_repository.Create(question, db, auto_commit)
        
        return super().Create(value, db, auto_commit)