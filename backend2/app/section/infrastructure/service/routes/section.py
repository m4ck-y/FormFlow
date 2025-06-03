from fastapi import APIRouter, HTTPException
from app.section.domain.schemas.section import (
    SchemaItemSection as I,
    SchemaDetailSection as E,
    SchemaCreateSection as C,
    SchemaUpdateSection as U,
)
from app.base.application.base import BaseLayerApplication
from app.base.infrastructure.service.base import BaseLayerService

ROUTE_NAME = "section"

class ServiceSection(BaseLayerService[C, I, E, U]):
    def __init__(self, router: APIRouter, app_layer: BaseLayerApplication, route_parent: str = None):
        super().__init__(router, app_layer, C, I, E, U, ROUTE_NAME, route_parent)