from fastapi import FastAPI
from app.form.infrastructure.service.setup import setup_all as setup_form
from app.question.infrastructure.service.setup import setup_all as setup_question
from app.section.infrastructure.service.setup import setup_all as setup_section
from app.assignment.infrastructure.service.setup import setup_all as setup_assignment

from app.account.infrastructure.service.setup import setup as setup_account


def init_api(api_server: FastAPI):
    print("init >>> api")
    setup_form(api_server)
    setup_question(api_server)
    setup_section(api_server)
    setup_assignment(api_server)

    setup_account(api_server)