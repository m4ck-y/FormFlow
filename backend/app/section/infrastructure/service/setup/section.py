from fastapi import FastAPI
from app.base.application.base import BaseLayerApplication as LayerApplication
from app.section.infrastructure.database.implementation.section import SectionRepository as LayerRepository
from app.section.infrastructure.service.routes.section import ServiceSection as LayerService


def setup(api_server: FastAPI):
    print("setup >>> section")
    repo = LayerRepository()
    app = LayerApplication(repo)
    LayerService(api_server,app)