from app.base.infrastructure.database.implementation.create import BaseCreate
from app.question.infrastructure.database.model.option import ModelOption
from app.question.domain.schemas.option import SchemaCreateAPIOption, SchemaCreateDBOption
from app.base.domain.repository.session import TSession


def CreateOptions(entity: SchemaCreateAPIOption, db: TSession, auto_commit = True) -> int:
    option_db_schema = SchemaCreateDBOption(id_question=entity.id_question, text=entity.text, value=entity.value, url=entity.url)
    return BaseCreate(ModelOption, option_db_schema, db, auto_commit)