from sqlalchemy import Column, Integer, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.assignment.infrastructure.database.schema import SchemaAssignment
from app.form.infrastructure.database.schema import SchemaForm
from app.utils.log import log_info


log_info("[MODEL][SCHEDULED] app/assignment/infrastructure/database/model/scheduled.py:", SchemaAssignment.TBL_SCHEDULED.name)


class ModelScheduled(BaseModel):
    """
    Modelo de base de datos para programaciones de asignaciones.
    
    Define cuándo y por cuánto tiempo está disponible una asignación para ser respondida.
    Cada programación permite uno o más intentos (response).
    
    Relación con reasignaciones: Cada assignment puede tener uno o más scheduled,
    permitiendo múltiples ventanas de tiempo para responder el mismo formulario asignado.
    
    Nota: Solo las asignaciones de tipo "programado" tienen filas en esta tabla.
    Las asignaciones de tipo "directo" (por enlace) NO tienen scheduled.
    
    IMPORTANTE: NO incluye campo 'status' según DDL SQL proporcionado.
    La tabla scheduled solo tiene: id, id_assignment, id_admin, available_from, available_until, time_limit_minutes
    """
    
    __tablename__ = SchemaAssignment.TBL_SCHEDULED.name
    __table_args__ = {"schema": SchemaAssignment.TBL_SCHEDULED.schema}

    # Relación con assignment
    id_assignment = Column(Integer, ForeignKey(f"{SchemaAssignment.TBL_ASSIGNMENT.identifier}.id"), nullable=False)
    # 1:N | 1 assignment -> N scheduled (permite reprogramaciones)
    assignment = relationship("ModelAssignment", back_populates="list_scheduled")

    # Administrador que programó
    id_admin = Column(Integer, nullable=False)  # FK a tabla admin/user (externa)
    
    # Ventana de disponibilidad
    available_from = Column(DateTime, nullable=False)
    available_until = Column(DateTime, nullable=False)
    
    # Límite de tiempo opcional
    time_limit_minutes = Column(Integer, nullable=True)
    
    # NOTA: Campo 'status' eliminado - NO existe en DDL SQL
    # La tabla scheduled según DDL solo tiene los campos definidos arriba
    
    # Relaciones futuras con responses
    # responses = relationship("ModelResponse", secondary="scheduled_responses", back_populates="scheduled_sessions")