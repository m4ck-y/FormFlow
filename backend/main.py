from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from config.env import API_HOST, API_PORT
import infrastructure.models.init_db
from routes.form import FormRouter
from routes.user import UserRouter
import uvicorn

from routes.verification import VerificationRouter

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los dominios (no recomendado en producción)
    allow_credentials=True,  # Permite credenciales (cookies, cabeceras de autorización)
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

FormRouter(app)
VerificationRouter(app)
UserRouter(app)


if __name__ == "__main__":
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=True)

#python main.py
#uvicorn main:app --host 0.0.0.0 --port 8005 --reload