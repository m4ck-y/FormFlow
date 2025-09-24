from typing import Optional
from app.base.domain.exception import BusinessValidationException
from app.form.infrastructure.database.model.form import ModelForm as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateAPIForm as C,
    SchemaUpdateForm as U,
)
from app.question.domain.schemas.questions_form import SchemaCreateDBQuestionsForm
from app.section.domain.schemas.section import SchemaCreateAPISection
from app.base.domain.exception import UniqueConstraintException
from app.section.infrastructure.database.implementation.create import SectionCreate
from app.question.infrastructure.database.implementation.question_create import CreateQuestion
from app.question.infrastructure.database.implementation.questions_form import CreateQuestionsForm

from app.form.domain.schemas.category import SchemaCreateAPICategory, SchemaCreateDBCategory
from app.form.infrastructure.database.implementation.category.create import CreateCategory
from app.form.infrastructure.database.implementation.form.category import CreateFormCategory

from app.form.domain.schemas.form_category import SCreateDBFormCategory
class FormRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)

    def Create(self, entity: C, db, auto_commit = True) -> int:
        has_sections = entity.list_sections is not None and len(entity.list_sections) > 0
        has_questions = entity.list_questions is not None and len(entity.list_questions) > 0

        # Validación lógica: solo una de las dos listas debe estar presente
        if has_sections and has_questions:
            raise BusinessValidationException("No puedes proporcionar 'list_sections' y 'list_questions' al mismo tiempo.")
        if not has_sections and not has_questions:
            raise BusinessValidationException("Debes proporcionar al menos 'list_sections' o 'list_questions'.")

        # Paso 1: Crear el formulario base
        form_schema_db = entity.to_db_schema()

        id_form = super().Create(form_schema_db, db, False)

        # Paso 2: Si hay preguntas, asociarlas al formulario
        if has_questions:
            for question in entity.list_questions:
                id_question = CreateQuestion(question, db, False)

                question_form_db_schema = SchemaCreateDBQuestionsForm(id_form=id_form, id_question=id_question)
                CreateQuestionsForm(db, question_form_db_schema)

        # Paso 3: Si hay secciones, asociarlas al formulario
        if has_sections:
            #self.section_repo.bulk_create(entity.list_sections, db, id_form=id_form)
            for section in entity.list_sections:
                section.id_form = id_form
                SectionCreate(section, db, False)

        for category in entity.list_categories:
            id_category = None

            if isinstance(category, SchemaCreateAPICategory):
                category_db_schema = SchemaCreateDBCategory(key_industry=category.key_industry, name=category.name)
                id_category = CreateCategory(category_db_schema, db, False)
            else:
                id_category = category

            form_category_db_schema = SCreateDBFormCategory(id_form=id_form, id_category=id_category)
            CreateFormCategory(db, form_category_db_schema, False)

        db.commit()

        return id_form
    
