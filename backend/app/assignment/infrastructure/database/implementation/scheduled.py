from typing import Optional, List
from datetime import datetime
from app.assignment.infrastructure.database.model.scheduled import ModelScheduled as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.assignment.domain.schemas.scheduled import (
    ItemScheduled as I,
    DetailScheduled as E,
    NewScheduled as C,
    UpdateScheduled as U,
)


class ScheduledRepository(BaseRepository[Table, C, I, E, U]):
    """
    Repositorio para operaciones de programaciones de asignaciones.
    
    Implementa las operaciones CRUD específicas para programaciones,
    incluyendo validaciones de negocio y manejo de estados temporales.
    """
    
    def __init__(self):
        super().__init__(Table, C, I, E, U)