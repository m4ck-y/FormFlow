from fastapi import APIRouter, HTTPException
from app.form.domain.schemas.category import (
    SchemaItemCategory as I,
    SchemaDetailCategory as E,
    SchemaCreateAPICategory as C,
    SchemaUpdateCategory as U,
)
from app.base.application.base import BaseLayerApplication
from app.base.infrastructure.service.base import BaseLayerService

ROUTE_NAME = "category"

class ServiceCategory(BaseLayerService[C, I, E, U]):
    def __init__(self, router: APIRouter, app_layer: BaseLayerApplication, route_parent: str = None):
        super().__init__(router, app_layer, C, I, E, U, ROUTE_NAME, route_parent)