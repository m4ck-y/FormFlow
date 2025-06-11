from app.form.domain.repository.form import IRepositoryForm
from app.section.domain.repository.section import IRepositorySection
from app.question.domain.repository.question import IRepositoryQuestion
from app.base.domain.repository.session import TSession
from app.form.domain.schemas.form import SchemaCreateAPIForm

from app.question.domain.schemas.questions_section import SchemaCreateDBQuestionsSection



def Create(
    schema_create_api_form:SchemaCreateAPIForm, 
    db:TSession,
    form_repository:IRepositoryForm,
    section_repository:IRepositorySection,
    question_repository:IRepositoryQuestion,
    auto_commit=True
):
    id_form = form_repository.Create(schema_create_api_form, db, auto_commit=False)

    for section in schema_create_api_form.list_sections:
        section_db_schema = section.to_db_schema()
        section_db_schema.id_form = id_form

        id_section = section_repository.Create(section, db, auto_commit=False)

        for question in section.list_questions:
            question_db_schema = question.to_db_schema()
            question_db_schema.id_section = id_section

            id_question = question_repository.Create(question_db_schema, db, auto_commit=False)

            SchemaCreateDBQuestionsSection(
                id_section=id_section,
                id_question=id_question
            )

    db.commit()

    return id_form