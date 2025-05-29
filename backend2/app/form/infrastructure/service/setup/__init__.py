from fastapi import FastAPI
from app.form.infrastructure.service.setup.form import setup as setup_form

def setup_all(api_server: FastAPI):
    setup_form(api_server)