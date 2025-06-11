from app.base.application.base import BaseLayerApplication
from app.section.domain.repository.section import IRepositorySection as IRepository
from app.section.domain.schemas.section import (
    SchemaItemSection as I,
    SchemaDetailSection as E,
    SchemaCreateAPISection as C,
    SchemaUpdateSection as U,
)

class SectionApplication(BaseLayerApplication[C,I,E,C,U]):
    def __init__(self, repository: IRepository):
        super().__init__(repository)