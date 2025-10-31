from app.account.infrastructure.service.routes.register import setup as register_user
from fastapi import FastAPI

def setup(api_server: FastAPI):
    register_user(api_server)