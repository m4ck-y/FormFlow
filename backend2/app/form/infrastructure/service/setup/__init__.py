from fastapi import FastAPI
from app.form.infrastructure.service.setup.form import setup as setup_form
from app.form.infrastructure.service.setup.category import setup as setup_category

def setup_all(api_server: FastAPI):
    setup_form(api_server)
    setup_category(api_server, route_parent="form")