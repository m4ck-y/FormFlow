from fastapi import APIRouter, HTTPException
from app.question.domain.schemas.question import (
    SchemaItemQuestion as I,
    SchemaDetailQuestion as E,
    SchemaCreateAPIQuestion as C,
    SchemaUpdateQuestion as U,
)
from app.base.application.base import BaseLayerApplication
from app.base.infrastructure.service.base import BaseLayerService

ROUTE_NAME = "question"

class ServiceQuestion(BaseLayerService[C, I, E, U]):
    def __init__(self, router: APIRouter, app_layer: BaseLayerApplication, route_parent: str = None):
        super().__init__(router, app_layer, C, I, E, U, ROUTE_NAME, route_parent)