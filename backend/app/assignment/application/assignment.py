from typing import List, Optional
from app.base.application.base import BaseLayerApplication
from app.assignment.domain.schemas.assignment import (
    SchemaItemAssignment as I,
    SchemaDetailAssignment as E,
    SchemaCreateAPIAssignment as C,
    SchemaUpdateAssignment as U,
)
from app.assignment.domain.repository.assignment import IRepositoryAssignment
from app.base.domain.repository.session import TSession
from app.utils.log import log_info


class AssignmentApplication(BaseLayerApplication[C, I, E, U]):
    """
    Capa de aplicación para el módulo Assignment.
    
    Orquesta los casos de uso específicos del dominio de asignaciones.
    Los métodos CRUD básicos son heredados de BaseLayerApplication.
    """
    
    def __init__(self, repository: IRepositoryAssignment):
        """
        Inicializa la aplicación con el repositorio de asignaciones.
        
        Args:
            repository: Repositorio que implementa IRepositoryAssignment
        """
        super().__init__(repository)
        self.assignment_repository = repository
    
    def get_person_assignments(self, id_person: int, db: TSession, 
                             status: Optional[str] = None) -> List[E]:
        """
        Caso de uso: Obtener todas las asignaciones de una persona.
        
        Args:
            id_person: ID de la persona
            db: Sesión de base de datos
            status: Filtro opcional por estado
            
        Returns:
            List[E]: Lista de asignaciones detalladas
        """
        log_info(f"Getting assignments for person {id_person} with status {status}")
        
        return self.assignment_repository.get_assignments_by_person(id_person, db, status)
    
    def get_form_assignments(self, id_form: int, db: TSession, 
                           status: Optional[str] = None) -> List[E]:
        """
        Caso de uso: Obtener todas las asignaciones de un formulario.
        
        Args:
            id_form: ID del formulario
            db: Sesión de base de datos
            status: Filtro opcional por estado
            
        Returns:
            List[E]: Lista de asignaciones detalladas
        """
        log_info(f"Getting assignments for form {id_form} with status {status}")
        
        return self.assignment_repository.get_assignments_by_form(id_form, db, status)
    
    def update_assignment_progress(self, id_assignment: int, questions_answered: int, 
                                 db: TSession) -> bool:
        """
        Caso de uso: Actualizar el progreso de una asignación.
        
        Args:
            id_assignment: ID de la asignación
            questions_answered: Número de preguntas respondidas
            db: Sesión de base de datos
            
        Returns:
            bool: True si se actualizó correctamente
        """
        log_info(f"Updating progress for assignment {id_assignment}: {questions_answered} questions")
        
        return self.assignment_repository.update_progress(id_assignment, questions_answered, db)
    
    def complete_assignment(self, id_assignment: int, scoring_result: dict, 
                          evaluation_result: dict, db: TSession) -> bool:
        """
        Caso de uso: Completar una asignación con resultados finales.
        
        Args:
            id_assignment: ID de la asignación
            scoring_result: Resultado del cálculo de puntaje
            evaluation_result: Resultado de evaluación cualitativa
            db: Sesión de base de datos
            
        Returns:
            bool: True si se completó correctamente
        """
        log_info(f"Completing assignment {id_assignment} with results")
        
        return self.assignment_repository.update_results(
            id_assignment, scoring_result, evaluation_result, db
        )