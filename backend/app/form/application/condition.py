from app.base.application.base import BaseLayerApplication
from app.form.domain.schemas.form_condition import SchemaCreateAPIFormCondition as C
from sqlalchemy.orm import Session # TODO

class HealthInfoApplication(BaseLayerApplication[C, C, C]):
    def __init__(self, repository):
        super().__init__(repository)

    def Create(self, value: C, db: Session, auto_commit = True):
        self.repository.Create(value, db, auto_commit=auto_commit)