from fastapi import APIRouter, HTTPException
from app.form.domain.schemas.form import (
    SchemaItemForm as I,
    SchemaDetailForm as E,
    SchemaCreateForm as C,
    SchemaUpdateForm as U,
)
from app.base.application.base import BaseLayerApplication
from app.base.infrastructure.service.base import BaseLayerService

ROUTE_NAME = "form"

class ServiceForm(BaseLayerService[C, I, E, U]):
    def __init__(self, router: APIRouter, app_layer: BaseLayerApplication, route_parent: str = None):
        super().__init__(router, app_layer, C, I, E, U, ROUTE_NAME, route_parent)