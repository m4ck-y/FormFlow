from sqlalchemy import Column, Enum, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm
from app.question.infrastructure.database.schema import SchemaQuestion
from app.section.infrastructure.database.schema import SchemaSection
from app.question.domain.enum.question_type import EQuestionType
from app.config.db import get_json_column_type
from app.utils.log import log_info

# ------------------------------------------------------
# 🧩 Tablas Intermedias (Many-to-Many)
# ------------------------------------------------------


log_info("[MODEL][QUESTIONS_FORM] app/question/infrastructure/database/model/question.py: ",SchemaQuestion.TBL_QUESTIONS_FORM.name)

# Relación muchos a muchos: preguntas directamente asociadas al formulario (sin sección)
form_questions = Table(
    SchemaQuestion.TBL_QUESTIONS_FORM.name,
    BaseModel.metadata,
    Column("id_form", Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), primary_key=True),
    Column("id_question", Integer, ForeignKey(f"{SchemaQuestion.TBL_QUESTION.identifier}.id"), primary_key=True),
    schema=SchemaQuestion.TBL_QUESTIONS_FORM.schema
)

log_info("[MODEL][QUESTIONS_SECTION] app/question/infrastructure/database/model/question.py:",SchemaQuestion.TBL_QUESTIONS_SECTION.name)
# Relación muchos a muchos: preguntas asociadas a secciones
section_questions = Table(
    SchemaQuestion.TBL_QUESTIONS_SECTION.name,
    BaseModel.metadata,
    Column('id_section', ForeignKey(f'{SchemaSection.TBL_SECTION.identifier}.id'), primary_key=True),
    Column('id_question', ForeignKey(f'{SchemaQuestion.TBL_QUESTION.identifier}.id'), primary_key=True),
    schema=SchemaQuestion.TBL_QUESTIONS_SECTION.schema
)

log_info("[MODEL][QUESTION] app/question/infrastructure/database/model/question.py:ModelQuestion:",SchemaQuestion.TBL_QUESTION.name)

class ModelQuestion(BaseModel):
    __tablename__ = SchemaQuestion.TBL_QUESTION.name
    __table_args__ = {"schema": SchemaQuestion.TBL_QUESTION.schema}

    type = Column(Enum(EQuestionType), nullable=False)
    text = Column(String, nullable=False)
    order = Column(Integer, nullable=False)
    
    # Columna JSON para condiciones - compatible SQLite/PostgreSQL
    condition = Column(get_json_column_type(), nullable=True)



    # Relación N:M en la base de datos, pero en la lógica de la aplicación cada pregunta solo pertenece a un formulario.
    # Usamos `uselist=False` para indicar que, en términos de la lógica de la aplicación, cada pregunta 
    # pertenece únicamente a un formulario (relación 1:1), aunque en la base de datos las preguntas 
    # pueden estar asociadas a múltiples formularios (a través de la tabla intermedia `questions_form`).
    # 
    # Esto se debe a que un formulario puede tener muchas preguntas, y cada pregunta puede estar en un solo formulario 
    # en cada momento, no en varios.

    # 1:1 | 1 question -> 1 form (sin sección)
    # 1:N | 1 form -> N questions (sin sección)
    form = relationship(
        "ModelForm",  # Modelo relacionado (Formulario)
        secondary=form_questions,  # Tabla intermedia
        back_populates="list_questions",  # Relación inversa en ModelForm
        uselist=False  # Esto asegura que la relación es 1:1, no 1:N
    )

    section = relationship(
        "ModelSection",  # Modelo relacionado (Sección)
        secondary=section_questions,  # Tabla intermedia
        back_populates="list_questions",  # Relación inversa en ModelSection
        uselist=False  # Esto asegura que la relación es 1:1, no 1:N
    )

    # 1:N | 1 question -> N Options
    list_options = relationship(
        "ModelOption",  # Modelo relacionado (Opcion)
        back_populates="question",  # Relación inversa en ModelOption
        )