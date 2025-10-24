from app.assignment.infrastructure.database.model.assignment import ModelAssignment
from app.assignment.infrastructure.database.model.scheduled import ModelScheduled
from app.utils.log import log_info


def init():
    """
    Inicializa el módulo de base de datos para Assignment.
    
    Registra los modelos SQLAlchemy para que sean reconocidos
    por el sistema de migraciones automáticas.
    """
    log_info("Initializing Assignment database module...")
    
    # Los modelos se registran automáticamente al importarlos
    # debido a que heredan de BaseModel que extiende Base
    
    log_info("Assignment models registered:")
    log_info(f"  - {ModelAssignment.__tablename__}")
    
    log_info("Assignment database module initialized successfully")


def seeder_assignment():
    """
    Seeder para datos iniciales de asignaciones.
    
    Por ahora no se incluyen datos de prueba, pero se puede
    implementar en el futuro para testing o demos.
    """
    log_info("Assignment seeder: No initial data to seed")
    pass