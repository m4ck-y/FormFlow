from fastapi import FastAPI
from app.form.infrastructure.service.setup import setup_all as setup_form
from app.question.infrastructure.service.setup import setup_all as setup_question
from app.section.infrastructure.service.setup import setup_all as setup_section


def init_api(api_server: FastAPI):
    print("init >>> api")
    setup_form(api_server)
    setup_question(api_server)
    setup_section(api_server)