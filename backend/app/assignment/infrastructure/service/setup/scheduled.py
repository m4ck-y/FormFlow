from fastapi import FastAPI, APIRouter
from app.assignment.application.scheduled import ScheduledApplication
from app.assignment.infrastructure.database.implementation.scheduled import ScheduledRepository
from app.assignment.infrastructure.service.routes.scheduled import ServiceScheduled
from app.utils.log import log_info


def setup_scheduled(api_server: FastAPI):
    """
    Configura el servicio de Scheduled en la aplicación FastAPI.
    
    Implementa el patrón de inyección de dependencias:
    Repository -> Application -> Service -> Router
    
    Args:
        api_server: Instancia de FastAPI donde registrar el router
    """
    log_info("Setting up Scheduled service...")
    
    # Crear instancias siguiendo la arquitectura limpia
    repository = ScheduledRepository()
    application = ScheduledApplication(repository)
    
    # Crear servicio que registra los endpoints
    service = ServiceScheduled(api_server, application)
    
    log_info("Scheduled service setup completed successfully")
    log_info(f"  - Repository: {repository.__class__.__name__}")
    log_info(f"  - Application: {application.__class__.__name__}")
    log_info(f"  - Service: {service.__class__.__name__}")
    log_info(f"  - Routes registered under: /scheduled")