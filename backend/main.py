from fastapi import FastAPI
from routes.form import router

app = FastAPI()

app.include_router(router)