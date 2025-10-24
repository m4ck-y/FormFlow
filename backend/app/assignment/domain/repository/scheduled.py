from abc import ABC
from app.base.domain.repository.base import IBaseRepository
from app.assignment.domain.schemas.scheduled import (
    ItemScheduled as I,
    DetailScheduled as E,
    NewScheduled as C,
    UpdateScheduled as U,
)


class IRepositoryScheduled(IBaseRepository[C, I, E, U], ABC):
    """
    Interface del repositorio de programaciones.
    
    Define las operaciones específicas para el manejo de programaciones
    de asignaciones, extendiendo las operaciones CRUD base.
    """
    pass