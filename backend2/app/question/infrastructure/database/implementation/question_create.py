from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.question.infrastructure.database.model.question import ModelQuestion
from app.question.domain.schemas.question import SchemaCreateAPIQuestion
from app.base.domain.repository.session import TSession


from app.question.infrastructure.database.model.option import ModelOption
from app.question.domain.schemas.option import SchemaCreateAPIOption
from app.question.infrastructure.database.implementation.options.create import CreateOptions

from app.utils.str_class_json import str_class_json
from app.base.domain.schemas.str_schema_json import str_schema_json

def CreateQuestion(entity: SchemaCreateAPIQuestion, db: TSession, auto_commit = True) -> int:

    log_info("before:, ", str_schema_json(entity))
    question_db_schema = entity.to_db_schema()

    log_info("after:, ", str_schema_json(question_db_schema))

    id_question = BaseCreate(ModelQuestion, question_db_schema, db, auto_commit)

    for option in entity.list_options:

        #SchemaCreateDBQuestionsOption(id_question=id_question, id_option=id_option)
        question_option_db_schema = SchemaCreateAPIOption(id_question=id_question, text=option.text, value=option.value, url=option.url)
        CreateOptions(question_option_db_schema, db, auto_commit)

    return id_question