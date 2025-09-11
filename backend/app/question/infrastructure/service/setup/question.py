from fastapi import FastAPI
from app.base.application.base import BaseLayerApplication as LayerApplication
from app.question.infrastructure.database.implementation.question import QuestionRepository as LayerRepository
from app.question.infrastructure.service.routes.question import ServiceQuestion as LayerService


def setup(api_server: FastAPI):
    print("setup >>> question")
    repo = LayerRepository()
    app = LayerApplication(repo)
    LayerService(api_server,app)