from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from app.base.domain.exception import BusinessValidationException
from app.config.env import API_HOST, API_PORT
from app.config.init_db import init_db
from app.config.init_api import init_api
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los dominios (no recomendado en producción)
    allow_credentials=True,  # Permite credenciales (cookies, cabeceras de autorización)
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)


@app.exception_handler(BusinessValidationException)
async def business_validation_exception_handler(request: Request, exc: BusinessValidationException):
    return JSONResponse(
        status_code=400,
        content={"detail": exc.message}
    )

init_db()
init_api(app) #No registrar dentro de main

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=API_HOST, port=API_PORT, reload=True)