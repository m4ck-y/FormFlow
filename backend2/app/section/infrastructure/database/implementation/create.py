
from app.base.domain.repository.session import TSession
from app.question.domain.schemas.questions_section import SchemaCreateDBQuestionsSection
from app.question.infrastructure.database.implementation.question_create import QuestionCreate
from app.question.infrastructure.database.implementation.questions_section import CreateQuestionsSection
from app.section.domain.schemas.section import SchemaCreateAPISection
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.section.infrastructure.database.model.section import ModelSection


def SectionCreate(entity: SchemaCreateAPISection, db: TSession, auto_commit = True) -> int:

    section_db_schema = entity.to_db_schema()
    id_section = BaseCreate(ModelSection, section_db_schema, db, auto_commit)

    for question in entity.list_questions:
        question_db_schema = question.to_db_schema()

        id_question = QuestionCreate(question_db_schema, db, auto_commit)

        question_section_db_schema = SchemaCreateDBQuestionsSection(id_section=id_section, id_question=id_question)
        CreateQuestionsSection(db, question_section_db_schema)

    return id_section