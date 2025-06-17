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
from app.section.domain.schemas.section import SchemaCreateAPISection
from app.base.domain.exception import UniqueConstraintException
from app.section.infrastructure.database.implementation.create import SectionCreate
from app.section.infrastructure.database.model.section import ModelSection
from app.question.infrastructure.database.model.question import ModelQuestion

from sqlalchemy.orm import joinedload
class FormRepository(BaseRepository[Table, C, I, E, U]):
    def __init__(self):
        super().__init__(Table, C, I, E, U)

    def Create(self, entity, db, auto_commit = True) -> int:

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
            #self.question_repo.bulk_create(entity.list_questions, db, id_form=id_form)
            raise NotImplementedError

        # Paso 3: Si hay secciones, asociarlas al formulario
        if has_sections:
            #self.section_repo.bulk_create(entity.list_sections, db, id_form=id_form)
            for section in entity.list_sections:
                section.id_form = id_form
                SectionCreate(section, db, False)
        db.commit()

        return id_form
    
