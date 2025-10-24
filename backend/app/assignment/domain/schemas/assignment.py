from typing import Optional, List
from datetime import datetime
from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.assignment.domain.enum.assignment_status import EAssignmentStatus
from pydantic import Field, model_validator, field_validator
import json
from app.utils.log import log_info


class BaseAssignment(BaseORMModel):
    """
    Schema base para asignaciones de formularios con campos comunes y examples centralizados.
    
    Representa la asignación lógica de un formulario a una persona o entidad.
    La persona asignada (id_person) NO tiene por qué ser quien responde.
    """
    id_form: int = Field(
        ..., 
        description="ID del formulario asignado", 
        examples=[1]
    )
    id_person: int = Field(
        ..., 
        description="ID de la persona a quien se asigna el formulario", 
        examples=[123]
    )
    status: EAssignmentStatus = Field(
        EAssignmentStatus.ENABLED,
        description="Estado de la asignación según EAssignmentStatus",
        examples=[EAssignmentStatus.ENABLED]
    )


class InDBAssignment(BaseAssignment):
    """Schema para representación completa del modelo en base de datos."""
    n_questions_total: Optional[int] = Field(
        None,
        description="Total de preguntas del formulario (calculado automáticamente)",
        examples=[10]
    )
    n_questions_answered: int = Field(
        0,
        description="Preguntas respondidas en intento activo actual",
        examples=[3]
    )
    scoring_result: Optional[dict] = Field(
        None,
        description="Resultado definitivo del cálculo de puntaje (calculado automáticamente)",
        examples=[{
            "data_type": "number",
            "value": 90,
            "calculation_timestamp": "2024-01-15T10:30:00Z"
        }]
    )
    evaluation_result: Optional[dict] = Field(
        None,
        description="Resultado definitivo de la evaluación cualitativa (calculado automáticamente)",
        examples=[{
            "data_type": "text",
            "value": "Aprobado",
            "category": "alto",
            "evaluation_timestamp": "2024-01-15T10:30:00Z"
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


class InsertAssignment(InDBAssignment):
    """
    Schema para inserción directa en BD con IDs y claves resueltas.
    Se adapta para la inserción en DB ya sea SQLite (text) o PostgreSQL (jsonb).
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


class NewAssignment(BaseCreateAPISchema, BaseAssignment):
    """
    Schema para crear asignación vía API (POST).
    
    Permite crear asignación con programación opcional incluida.
    Si se incluye 'scheduled', se crea una asignación programada.
    Si se omite 'scheduled', se crea una asignación directa (por enlace).
    """
    scheduled: Optional['NewItemScheduled'] = Field(
        None,
        description="Programación opcional para la asignación. Si se incluye, crea asignación programada."
    )

    @model_validator(mode="before")
    def validate_assignment_data(cls, values):
        """Valida los datos esenciales de la asignación."""
        id_form = values.get("id_form")
        id_person = values.get("id_person")

        if not id_form or id_form <= 0:
            raise ValueError("id_form debe ser un entero positivo")

        if not id_person or id_person <= 0:
            raise ValueError("id_person debe ser un entero positivo")

        return values

    def to_db_schema(self) -> InsertAssignment:
        """
        Convierte el schema de API a schema de BD.
        
        Los campos calculados se inicializan con valores por defecto:
        - n_questions_total: se calculará desde el formulario
        - n_questions_answered: inicia en 0
        - scoring_result: None hasta completar
        - evaluation_result: None hasta completar
        """
        return InsertAssignment(
            id_form=self.id_form,
            id_person=self.id_person,
            status=self.status,
            n_questions_total=None,  # Se calculará automáticamente
            n_questions_answered=0,  # Siempre inicia en 0
            scoring_result=None,     # Se calculará al completar
            evaluation_result=None   # Se calculará al completar
        )


class NewItemAssignment(BaseAssignment):
    """
    Schema para crear asignación como parte de otro recurso (sub-esquema anidado).
    
    Usado cuando se crean asignaciones dentro de otros contextos,
    por ejemplo, al crear múltiples asignaciones en lote.
    """
    pass  # Sin campos adicionales, hereda de AssignmentBase


class UpdateAssignment(BaseAssignment):
    """Schema para reemplazo completo de asignación (PUT)."""
    id: int


class PatchAssignment(BaseORMModel):
    """
    Schema para actualización parcial de asignación (PATCH).
    
    Todos los campos son opcionales para permitir actualizaciones parciales.
    """
    id: int
    id_form: Optional[int] = Field(None, description="ID del formulario asignado")
    id_person: Optional[int] = Field(None, description="ID de la persona asignada")
    status: Optional[EAssignmentStatus] = Field(None, description="Estado de la asignación")
    n_questions_total: Optional[int] = Field(None, description="Total de preguntas")
    n_questions_answered: Optional[int] = Field(None, description="Preguntas respondidas")
    scoring_result: Optional[dict] = Field(None, description="Resultado de puntaje")
    evaluation_result: Optional[dict] = Field(None, description="Resultado de evaluación")

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


class ItemAssignment(BaseAssignment):
    """
    Schema para elementos en listas de asignaciones (GET /assignments).
    
    Vista simple optimizada para listados con información esencial.
    """
    id: int
    n_questions_total: Optional[int] = Field(None, description="Total de preguntas")
    n_questions_answered: int = Field(0, description="Preguntas respondidas")

class DetailAssignment(ItemAssignment):
    """
    Schema para elemento individual detallado de asignación (GET /assignments/{id}).
    
    Vista completa con todas las relaciones y objetos anidados.
    Incluye las programaciones asociadas si existen.
    """
    list_scheduled: List['DetailScheduled'] = Field(
        default=[],
        description="Lista de programaciones asociadas a esta asignación"
    )


# Forward references para evitar imports circulares
from app.assignment.domain.schemas.scheduled import NewItemScheduled, DetailScheduled
NewAssignment.model_rebuild()
DetailAssignment.model_rebuild()