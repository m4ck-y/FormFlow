from app.base.infrastructure.database.implementation.create import BaseCreate
from app.question.infrastructure.database.model.question import ModelQuestion
from app.question.domain.schemas.question import SchemaCreateDBQuestion
from app.base.domain.repository.session import TSession

def QuestionCreate(entity: SchemaCreateDBQuestion, db: TSession, auto_commit = True) -> int:
    return BaseCreate(ModelQuestion, entity, db, auto_commit)