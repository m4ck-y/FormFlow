from fastapi import FastAPI
from app.section.infrastructure.service.setup.section import setup as setup_section

def setup_all(api_server: FastAPI):
    setup_section(api_server)