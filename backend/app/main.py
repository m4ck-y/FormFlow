from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from app.base.domain.exception import BusinessValidationException
from app.config.init_db import init_db
from app.config.init_api import init_api
from app.config.env import settings
from fastapi.exceptions import RequestValidationError
import uvicorn

from app.utils.log import log_info_cyan

#app = FastAPI(root_path=settings.ROOT_PATH)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todos los dominios (no recomendado en producción)
    allow_credentials=True,  # Permite credenciales (cookies, cabeceras de autorización)
    allow_methods=["*"],  # Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos los encabezados
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    # Imprimir los detalles del error
    print(f"Error al procesar el contenido: {exc}")
    
    # Aquí se pueden agregar detalles adicionales, como guardar los errores en un log
    error_details = []
    for error in exc.errors():
        error_details.append(f"Campo '{error['loc']}' - {error['msg']}")
    
    # Regresar una respuesta JSON con el error de validación y los detalles
    return JSONResponse(
        status_code=422,
        content={"detail": "El contenido no se pudo procesar", "errors": error_details}
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
    uvicorn.run(app, host="0.0.0.0", port=8000)