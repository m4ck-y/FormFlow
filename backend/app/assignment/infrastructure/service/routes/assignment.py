from fastapi import APIRouter, HTTPException, Query, Path
from typing import Optional, List
from app.assignment.domain.schemas.assignment import (
    SchemaItemAssignment as I,
    SchemaDetailAssignment as E,
    SchemaCreateAPIAssignment as C,
    SchemaUpdateAssignment as U,
)
from app.base.application.base import BaseLayerApplication
from app.base.infrastructure.service.base import BaseLayerService


ROUTE_NAME = "assignments"


class ServiceAssignment(BaseLayerService[C, I, E, U]):
    """
    Servicio REST para el módulo Assignment.
    
    Los endpoints CRUD básicos son heredados de BaseLayerService.
    Aquí solo se definen endpoints específicos del dominio.
    """
    
    def __init__(self, router: APIRouter, app_layer: BaseLayerApplication, route_parent: str = None):
        super().__init__(router, app_layer, C, I, E, U, ROUTE_NAME, route_parent)