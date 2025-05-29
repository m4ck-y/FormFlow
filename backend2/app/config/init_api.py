from fastapi import FastAPI
from app.form.infrastructure.service.setup import setup_all as setup_form


def init_api(api_server: FastAPI):
    print("init >>> api")
    setup_form(api_server)