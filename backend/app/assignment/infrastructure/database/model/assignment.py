from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.assignment.infrastructure.database.schema import SchemaAssignment
from app.assignment.domain.enum.assignment_status import EAssignmentStatus
from app.config.db import get_json_column_type
from app.utils.log import log_info


log_info("[MODEL][ASSIGNMENT] app/assignment/infrastructure/database/model/assignment.py:", SchemaAssignment.TBL_ASSIGNMENT.name)


class ModelAssignment(BaseModel):
    """
    Modelo de base de datos para asignaciones de formularios.
    
    Representa la asignación lógica de un formulario a una persona o entidad.
    La persona asignada (id_person) NO tiene por qué ser quien responde.
    
    Permite escenarios como:
    - Un tutor responde por un estudiante
    - Un gerente asigna una autoevaluación a su equipo
    - Un sistema asigna a un grupo, y luego un representante responde
    
    Gestiona reasignaciones: Un usuario puede tener múltiples asignaciones
    al mismo formulario en diferentes momentos.
    """
    
    __tablename__ = SchemaAssignment.TBL_ASSIGNMENT.name
    __table_args__ = {"schema": SchemaAssignment.TBL_ASSIGNMENT.schema}

    # Relaciones con otras entidades
    id_form = Column(Integer, ForeignKey("form.id"), nullable=False)
    # 1:N | 1 assignment -> 1 form
    form  = relationship("ModelForm", back_populates="list_assignments")

    id_person = Column(Integer, nullable=False)  # FK a tabla person (externa)
    
    # Estado de la asignación (usando enum SQL según DDL)
    status = Column(SQLAlchemyEnum(EAssignmentStatus), nullable=False, default=EAssignmentStatus.ENABLED)
    
    # Progreso actual de la asignación
    n_questions_total = Column(Integer)  # Total de preguntas del formulario
    n_questions_answered = Column(Integer, default=0)  # Preguntas respondidas en intento activo
    
    # Resultados definitivos de la asignación (JSONB/Text según BD)
    scoring_result = Column(get_json_column_type())  # Resultado del cálculo de puntaje
    evaluation_result = Column(get_json_column_type())  # Resultado de evaluación cualitativa
    
    # Relaciones con scheduled, response, etc.
    list_scheduled = relationship("ModelScheduled", back_populates="assignment")
    # responses = relationship("ModelResponse", back_populates="assignment")