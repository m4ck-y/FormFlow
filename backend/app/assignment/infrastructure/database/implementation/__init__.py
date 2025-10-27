from typing import Optional, List
import json
from datetime import datetime
from app.assignment.infrastructure.database.model.assignment import ModelAssignment as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.assignment.domain.schemas.assignment import (
    ItemAssignment as I,
    DetailAssignment as E,
    NewAssignment as C,
    UpdateAssignment as U,
)
from app.assignment.domain.schemas.scheduled import InsertScheduled
from app.base.domain.repository.session import TSession
from app.utils.log import log_info


class AssignmentRepository(BaseRepository[Table, C, I, E, U]):
    """
    Repositorio para operaciones de asignaciones de formularios.
    
    Implementa las operaciones CRUD específicas para asignaciones,
    incluyendo validaciones de negocio y manejo de estados.
    Soporta creación de asignaciones con programación anidada.
    """
    
    def __init__(self):
        super().__init__(Table, C, I, E, U)

    def Create(self, entity: C, db: TSession, auto_commit: bool = True) -> int:

        print("creating assignment")
        """
        Crea una asignación con programación opcional anidada.
        
        Si entity.scheduled está presente, crea tanto la asignación como su programación
        en la misma transacción, garantizando consistencia de datos.
        
        Args:
            entity: Schema NewAssignment con scheduled opcional
            db: Sesión de base de datos
            auto_commit: Si debe hacer commit automáticamente
            
        Returns:
            ID de la asignación creada
        """
        try:
            log_info(f"Creating assignment with scheduled: {entity.scheduled is not None}")
            
            # 1. Crear la asignación principal
            assignment_db_schema = entity.to_db_schema()
            id_assignment = super().Create(assignment_db_schema, db, False)  # No commit aún
            
            log_info(f"Assignment created with ID: {id_assignment}")
            
            # 2. Si hay scheduled, crearlo también
            if entity.scheduled is not None:
                log_info("Creating nested scheduled...")

                print("available_from:", entity.scheduled.available_from)
                print("tzinfo:", entity.scheduled.available_from.tzinfo)
                
                # Crear schema de BD para scheduled (sin campo status)
                scheduled_db_schema = InsertScheduled(
                    id_assignment=id_assignment,  # Asignar automáticamente
                    id_admin=entity.scheduled.id_admin,
                    available_from=entity.scheduled.available_from,
                    available_until=entity.scheduled.available_until,
                    time_limit_minutes=entity.scheduled.time_limit_minutes
                )
                
                # Importar y usar el repositorio de scheduled
                from app.assignment.infrastructure.database.implementation.scheduled import ScheduledRepository
                scheduled_repo = ScheduledRepository()
                id_scheduled = scheduled_repo.Create(scheduled_db_schema, db, False)  # No commit aún
                
                log_info(f"Scheduled created with ID: {id_scheduled}")
            
            # 3. Commit si es necesario
            if auto_commit:
                db.commit()
                log_info("Transaction committed successfully")
            
            return id_assignment
            
        except Exception as e:
            log_info(f"Error creating assignment with scheduled: {str(e)}")
            if auto_commit:
                db.rollback()
            raise