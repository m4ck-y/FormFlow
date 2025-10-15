from fastapi import FastAPI
from app.assignment.infrastructure.service.setup.assignment import setup_assignment


def setup_all(api_server: FastAPI):
    """
    Configura todos los servicios del módulo Assignment.
    
    Args:
        api_server: Instancia de FastAPI donde registrar los routers
    """
    setup_assignment(api_server)