from typing import Optional, List
from datetime import datetime
from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.assignment.domain.enum.assignment_status import EAssignmentStatus
from pydantic import Field, model_validator, field_validator
import json
from app.utils.log import log_info


class SchemaBaseAssignment(BaseORMModel):
    """Schema base para asignaciones de formularios."""
    id_form: int = Field(..., description="ID del formulario asignado", examples=[1])
    id_person: int = Field(..., description="ID de la persona a quien se asigna", examples=[123])
    status: EAssignmentStatus = Field(
        EAssignmentStatus.ACTIVE, 
        description="Estado de la asignación",
    )
    n_questions_total: Optional[int] = Field(
        None, 
        description="Total de preguntas del formulario",
        examples=[10]
    )
    n_questions_answered: int = Field(
        0, 
        description="Preguntas respondidas en intento activo",
        examples=[3]
    )
    scoring_result: Optional[dict] = Field(
        None,
        description="Resultado definitivo del cálculo de puntaje",
        examples=[{
            "data_type": "number",
            "value": 90
        }]
    )
    evaluation_result: Optional[dict] = Field(
        None,
        description="Resultado definitivo de la evaluación cualitativa",
        examples=[{
            "data_type": "text",
            "value": "Aprobado"
        }]
    )

    @field_validator('scoring_result', 'evaluation_result', mode='before')
    @classmethod
    def parse_json_fields(cls, v):
        """Convierte automáticamente JSON string a dict para SQLite"""
        if isinstance(v, str):  # Si es string (SQLite), convertir a dict
            try:
                return json.loads(v)
            except json.JSONDecodeError:
                log_info(f"Error parsing JSON field: {v}")
                return None
        return v  # Si ya es dict (PostgreSQL) o None, mantener como está


class SchemaCreateDBAssignment(SchemaBaseAssignment):
    """
    Schema para inserción en BD - se adapta para la inserción en DB ya sea SQLite (text) o PostgreSQL (jsonb).
    Aquí es donde se hace la conversión dinámica según el motor de BD.
    """
    
    @field_validator("scoring_result", "evaluation_result", mode='after')
    @classmethod
    def prepare_json_for_db(cls, v):
        """Convierte campos JSON según el motor de BD"""
        if v and isinstance(v, dict):
            from app.config.db import is_db_postgres
            
            if not is_db_postgres():
                # SQLite: convertir a JSON string
                log_info("SQLite: Converting JSON field to string")
                v = json.dumps(v)
                log_info(f"SQLite JSON: {v}")
            # PostgreSQL: mantener como dict (se serializa automáticamente)
        return v


class SchemaCreateAPIAssignment(BaseCreateAPISchema, SchemaBaseAssignment):
    """
    Schema para API - el frontend necesita ver la estructura del JSON.
    Las propiedades scoring_result y evaluation_result siempre serán dict que vienen desde el frontend.
    """
    
    @model_validator(mode="before")
    def validate_assignment_data(cls, values):
        """Valida los datos de la asignación."""
        id_form = values.get("id_form")
        id_person = values.get("id_person")
        
        if not id_form or id_form <= 0:
            raise ValueError("id_form debe ser un entero positivo")
        
        if not id_person or id_person <= 0:
            raise ValueError("id_person debe ser un entero positivo")
        
        return values
    
    def to_db_schema(self) -> SchemaCreateDBAssignment:
        """
        Convierte el schema de API a schema de BD.
        Aquí es donde se hace la conversión: las propiedades JSON siempre serán dict
        que vienen desde el frontend, y se preparan dinámicamente (convertir a text o dejarlo como dict).
        """
        return SchemaCreateDBAssignment(
            id_form=self.id_form,
            id_person=self.id_person,
            status=self.status,
            n_questions_total=self.n_questions_total,
            n_questions_answered=self.n_questions_answered,
            scoring_result=self.scoring_result,  # Se convierte automáticamente en el validator
            evaluation_result=self.evaluation_result  # Se convierte automáticamente en el validator
        )


class SchemaItemAssignment(SchemaBaseAssignment):
    """Schema para elementos en listas de asignaciones."""
    id: int


class SchemaDetailAssignment(SchemaItemAssignment):
    """Schema para elemento individual detallado de asignación."""
    # Aquí se pueden agregar relaciones cuando se implementen
    # scheduled_sessions: List[SchemaDetailScheduled] = []
    # responses: List[SchemaDetailResponse] = []
    
    @property
    def progress_percentage(self) -> float:
        """Calcula el porcentaje de progreso de la asignación."""
        if not self.n_questions_total or self.n_questions_total == 0:
            return 0.0
        return (self.n_questions_answered / self.n_questions_total) * 100
    
    @property
    def is_completed(self) -> bool:
        """Verifica si la asignación está completada."""
        return (
            self.n_questions_total is not None and
            self.n_questions_answered >= self.n_questions_total and
            self.status == EAssignmentStatus.COMPLETED
        )


class SchemaUpdateAssignment(SchemaBaseAssignment):
    """Schema para actualización de asignación."""
    id: int