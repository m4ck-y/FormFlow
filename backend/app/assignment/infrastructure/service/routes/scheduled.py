from fastapi import FastAPI
from app.assignment.domain.schemas.scheduled import (
    ItemScheduled as I,
    DetailScheduled as E,
    NewScheduled as C,
    UpdateScheduled as U,
)
from app.base.application.base import BaseLayerApplication
from app.base.infrastructure.service.base import BaseLayerService


ROUTE_NAME = "scheduled"


class ServiceScheduled(BaseLayerService[C, I, E, U]):
    """
    Servicio REST para el módulo Scheduled.
    
    Los endpoints CRUD básicos son heredados de BaseLayerService.
    Aquí solo se definen endpoints específicos del dominio.
    """
    
    def __init__(self, api_server: FastAPI, app_layer: BaseLayerApplication, route_parent: str = None):
        super().__init__(api_server, app_layer, C, I, E, U, ROUTE_NAME, route_parent)