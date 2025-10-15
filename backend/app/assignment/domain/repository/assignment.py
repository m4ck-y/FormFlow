from abc import ABC
from app.base.domain.repository.base import IBaseRepository
from app.assignment.domain.schemas.assignment import (
    SchemaItemAssignment as I,
    SchemaDetailAssignment as E,
    SchemaCreateAPIAssignment as C,
    SchemaUpdateAssignment as U,
)


class IRepositoryAssignment(IBaseRepository[C, I, E, U], ABC):
    """
    Interface del repositorio de asignaciones.
    
    Define las operaciones específicas para el manejo de asignaciones
    de formularios a personas, extendiendo las operaciones CRUD base.
    """
    pass