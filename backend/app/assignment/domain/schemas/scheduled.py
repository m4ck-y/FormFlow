from typing import Optional
from datetime import datetime
from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from pydantic import Field, model_validator, field_validator
from app.utils.log import log_info


class BaseScheduled(BaseORMModel):
    """
    Schema base para programaciones de asignaciones con campos comunes y examples centralizados.
    
    Define cuándo y por cuánto tiempo está disponible una asignación para ser respondida.
    Cada programación permite uno o más intentos (response).
    
    NOTA: NO incluye campo 'status' según DDL SQL - la tabla scheduled no tiene este campo.
    """
    id_assignment: int = Field(
        ..., 
        description="ID de la asignación programada", 
        examples=[1]
    )
    id_admin: int = Field(
        ..., 
        description="ID del administrador que programó esta disponibilidad", 
        examples=[456]
    )
    available_from: datetime = Field(
        ...,
        description="Inicio de disponibilidad para responder",
        examples=["2024-01-15T08:00:00Z"]
    )
    available_until: datetime = Field(
        ...,
        description="Fin de disponibilidad para responder",
        examples=["2024-01-15T18:00:00Z"]
    )
    time_limit_minutes: Optional[int] = Field(
        None,
        description="Tiempo máximo permitido para completar (en minutos). NULL = sin límite",
        examples=[60]
    )


class InDBScheduled(BaseScheduled):
    """
    Schema para representación completa del modelo en base de datos.
    
    NOTA: NO incluye campo 'status' - la tabla scheduled no tiene este campo según DDL.
    """

    @field_validator('available_from', 'available_until', mode='before')
    @classmethod
    def parse_datetime_fields(cls, v):
        """Convierte automáticamente string datetime para compatibilidad"""
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                log_info(f"Error parsing datetime field: {v}")
                return None
        return v


class InsertScheduled(InDBScheduled):
    """
    Schema para inserción directa en BD con IDs y claves resueltas.
    Se adapta para la inserción en DB ya sea SQLite o PostgreSQL.
    
    NOTA: NO incluye campo 'status' según DDL SQL.
    """
    pass


class NewScheduled(BaseCreateAPISchema, BaseScheduled):
    """
    Schema para crear programación vía API (POST).
    
    Solo requiere los campos esenciales que proporciona el frontend.
    NOTA: NO incluye campo 'status' - la tabla scheduled no tiene este campo según DDL.
    """

    @model_validator(mode="before")
    def validate_scheduled_data(cls, values):
        """Valida los datos esenciales de la programación."""
        id_assignment = values.get("id_assignment")
        id_admin = values.get("id_admin")
        available_from = values.get("available_from")
        available_until = values.get("available_until")
        time_limit_minutes = values.get("time_limit_minutes")

        if not id_assignment or id_assignment <= 0:
            raise ValueError("id_assignment debe ser un entero positivo")

        if not id_admin or id_admin <= 0:
            raise ValueError("id_admin debe ser un entero positivo")

        # Validar fechas
        if available_from and available_until:
            if isinstance(available_from, str):
                available_from = datetime.fromisoformat(available_from.replace('Z', '+00:00'))
            if isinstance(available_until, str):
                available_until = datetime.fromisoformat(available_until.replace('Z', '+00:00'))
            
            if available_from >= available_until:
                raise ValueError("available_from debe ser anterior a available_until")

        # Validar time_limit_minutes
        if time_limit_minutes is not None and time_limit_minutes <= 0:
            raise ValueError("time_limit_minutes debe ser positivo o NULL")

        return values

    def to_db_schema(self) -> InsertScheduled:
        """
        Convierte el schema de API a schema de BD.
        
        NOTA: NO incluye lógica de estado - la tabla scheduled no tiene campo status.
        """
        return InsertScheduled(
            id_assignment=self.id_assignment,
            id_admin=self.id_admin,
            available_from=self.available_from,
            available_until=self.available_until,
            time_limit_minutes=self.time_limit_minutes
        )


class NewItemScheduled(BaseORMModel):
    """
    Schema para crear programación como parte de una asignación (sub-esquema anidado).
    
    Usado cuando se crean programaciones dentro del contexto de NewAssignment.
    NO incluye id_assignment porque se asigna automáticamente desde la asignación padre.
    """
    id_admin: int = Field(
        ..., 
        description="ID del administrador que programa esta disponibilidad", 
        examples=[456]
    )
    available_from: datetime = Field(
        ...,
        description="Inicio de disponibilidad para responder",
        examples=["2024-01-15T08:00:00Z"]
    )
    available_until: datetime = Field(
        ...,
        description="Fin de disponibilidad para responder",
        examples=["2024-01-15T18:00:00Z"]
    )
    time_limit_minutes: Optional[int] = Field(
        None,
        description="Tiempo máximo permitido para completar (en minutos). NULL = sin límite",
        examples=[60]
    )

    @field_validator('available_from', 'available_until', mode='before')
    @classmethod
    def parse_datetime_fields(cls, v):
        """Convierte automáticamente string datetime para compatibilidad"""
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                log_info(f"Error parsing datetime field: {v}")
                return None
        return v

    @model_validator(mode="before")
    def validate_scheduled_data(cls, values):
        """Valida los datos esenciales de la programación anidada."""
        id_admin = values.get("id_admin")
        available_from = values.get("available_from")
        available_until = values.get("available_until")
        time_limit_minutes = values.get("time_limit_minutes")

        if not id_admin or id_admin <= 0:
            raise ValueError("id_admin debe ser un entero positivo")

        # Validar fechas
        if available_from and available_until:
            if isinstance(available_from, str):
                available_from = datetime.fromisoformat(available_from.replace('Z', '+00:00'))
            if isinstance(available_until, str):
                available_until = datetime.fromisoformat(available_until.replace('Z', '+00:00'))
            
            if available_from >= available_until:
                raise ValueError("available_from debe ser anterior a available_until")

        # Validar time_limit_minutes
        if time_limit_minutes is not None and time_limit_minutes <= 0:
            raise ValueError("time_limit_minutes debe ser positivo o NULL")

        return values


class UpdateScheduled(BaseScheduled):
    """
    Schema para reemplazo completo de programación (PUT).
    
    NOTA: NO incluye campo 'status' - la tabla scheduled no tiene este campo según DDL.
    """
    id: int


class PatchScheduled(BaseORMModel):
    """
    Schema para actualización parcial de programación (PATCH).
    
    Todos los campos son opcionales para permitir actualizaciones parciales.
    NOTA: NO incluye campo 'status' - la tabla scheduled no tiene este campo según DDL.
    """
    id: int
    id_assignment: Optional[int] = Field(None, description="ID de la asignación")
    id_admin: Optional[int] = Field(None, description="ID del administrador")
    available_from: Optional[datetime] = Field(None, description="Inicio de disponibilidad")
    available_until: Optional[datetime] = Field(None, description="Fin de disponibilidad")
    time_limit_minutes: Optional[int] = Field(None, description="Límite de tiempo en minutos")

    @field_validator('available_from', 'available_until', mode='before')
    @classmethod
    def parse_datetime_fields(cls, v):
        """Convierte automáticamente string datetime para compatibilidad"""
        if isinstance(v, str):
            try:
                return datetime.fromisoformat(v.replace('Z', '+00:00'))
            except ValueError:
                log_info(f"Error parsing datetime field: {v}")
                return None
        return v


class ItemScheduled(BaseScheduled):
    """
    Schema para elementos en listas de programaciones (GET /scheduled).
    
    Vista simple optimizada para listados con información esencial.
    NOTA: NO incluye campo 'status' - la tabla scheduled no tiene este campo según DDL.
    """
    id: int


class DetailScheduled(ItemScheduled):
    """
    Schema para elemento individual detallado de programación (GET /scheduled/{id}).
    
    Vista completa con todas las relaciones y objetos anidados.
    NOTA: NO incluye campo 'status' - la tabla scheduled no tiene este campo según DDL.
    """
    pass