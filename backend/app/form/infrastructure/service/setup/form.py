from fastapi import FastAPI
from app.base.application.base import BaseLayerApplication as LayerApplication
from app.form.infrastructure.database.implementation.form import FormRepository as LayerRepository
from app.form.infrastructure.service.routes.form import ServiceForm as LayerService


def setup(api_server: FastAPI):
    print("setup >>> form")
    repo = LayerRepository()
    app = LayerApplication(repo)
    LayerService(api_server,app)