from fastapi import FastAPI
from app.base.application.base import BaseLayerApplication as LayerApplication
from app.form.infrastructure.database.implementation.category import CategoryRepository as LayerRepository
from app.form.infrastructure.service.routes.category import ServiceCategory as LayerService

def setup (api_server: FastAPI, route_parent: str = None):
    print("setup >>> category")
    repo = LayerRepository()
    app = LayerApplication(repo)
    LayerService(api_server,app, route_parent)