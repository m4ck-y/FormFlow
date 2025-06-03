from fastapi import FastAPI
from app.question.infrastructure.service.setup.question import setup as setup_question

def setup_all(api_server: FastAPI):
    setup_question(api_server)