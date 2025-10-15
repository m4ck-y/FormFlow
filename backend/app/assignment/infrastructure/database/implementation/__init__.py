from typing import Optional, List
import json
from app.assignment.infrastructure.database.model.assignment import ModelAssignment as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.assignment.domain.schemas.assignment import (
    SchemaItemAssignment as I,
    SchemaDetailAssignment as E,
    SchemaCreateAPIAssignment as C,
    SchemaUpdateAssignment as U,
)


class AssignmentRepository(BaseRepository[Table, C, I, E, U]):
    """
    Repositorio para operaciones de asignaciones de formularios.
    
    Implementa las operaciones CRUD específicas para asignaciones,
    incluyendo validaciones de negocio y manejo de estados.
    """
    
    def __init__(self):
        super().__init__(Table, C, I, E, U)