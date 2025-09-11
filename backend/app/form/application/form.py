from app.base.application.base import BaseLayerApplication
from app.form.domain.repository.form import IRepositoryForm as IRepository
from app.section.domain.repository.section import IRepositorySection
from app.base.domain.repository.session import TSession
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateAPIForm as C,
    SchemaUpdateForm as U,
)
from .create import Create



class FormApplication(BaseLayerApplication[C,I,E,C,U]):
    def __init__(self, repository: IRepository, section_repository: IRepositorySection):
        self.section_repository = section_repository
        super().__init__(repository)


    def Create(self, value, db,  auto_commit = True):

        Create(
            value,
            db,
            self.repository,
            self.section_repository,
            self.section_application,
            auto_commit
        )

        
    def Create(self, value: C, db: TSession, auto_commit = True):
        "Create a form with question"
        pass

    def CreateWithSection(self, value: C, db: TSession, auto_commit = True):
        "Create a form with section"
        pass