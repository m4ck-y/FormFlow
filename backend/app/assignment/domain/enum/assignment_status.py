from enum import Enum


class EAssignmentStatus(str, Enum):
    """Estados de una asignación de formulario."""
    ACTIVE = "active"
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    EXPIRED = "expired"