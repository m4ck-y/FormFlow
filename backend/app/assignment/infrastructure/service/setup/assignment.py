from fastapi import FastAPI, APIRouter
from app.assignment.application.assignment import AssignmentApplication
from app.assignment.infrastructure.database.implementation import AssignmentRepository
from app.assignment.infrastructure.service.routes.assignment import ServiceAssignment
from app.utils.log import log_info


def setup_assignment(api_server: FastAPI):
    """
    Configura el servicio de Assignment en la aplicación FastAPI.
    
    Implementa el patrón de inyección de dependencias:
    Repository -> Application -> Service -> Router
    
    Args:
        api_server: Instancia de FastAPI donde registrar el router
    """
    log_info("Setting up Assignment service...")
    
    # Crear instancias siguiendo la arquitectura limpia
    repository = AssignmentRepository()
    application = AssignmentApplication(repository)
    
    # Crear servicio que registra los endpoints
    service = ServiceAssignment(api_server, application)
    
    log_info("Assignment service setup completed successfully")
    log_info(f"  - Repository: {repository.__class__.__name__}")
    log_info(f"  - Application: {application.__class__.__name__}")
    log_info(f"  - Service: {service.__class__.__name__}")
    log_info(f"  - Routes registered under: /assignments")