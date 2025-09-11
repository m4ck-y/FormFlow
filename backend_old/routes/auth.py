from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, FastAPI, HTTPException, Response, status
import httpx
from config.env import API_USER_HOST, API_USER_PORT
from domain.schemas.jwt import TokenPayload
from domain.schemas.auth import SchemaLogin
from routes.jwt import create_access_token


ROUTE_NAME = "auth"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])


def AuthRouter(api_server: FastAPI):
    api_server.include_router(api_router)




@api_router.get("/")
async def Get():
    return {"message": "Hello World"}

@api_router.post("")
async def Login(value: SchemaLogin, http_response: Response):
    if not API_USER_HOST or not API_USER_PORT:
        print("No se ha configurado la URL del microservicio de usuarios")
        raise HTTPException(status_code=500, detail="Error al registrar usuario")
    
    url = f"http://{API_USER_HOST}:{API_USER_PORT}/auth"

    print("URL", url)

    async with httpx.AsyncClient(follow_redirects=True) as client:
        response = await client.post(url, json=value.model_dump())
        if response.status_code != 200:

            # Si el microservicio de usuarios devuelve un error con detalles, lo capturamos.
            try:
                error_detail = response.json().get("detail", "No detail provided")
            except Exception as e:
                error_detail = str(e)

             # Imprimir para depuración
            print(f"Error al llamar al microservicio de usuarios {url}: {response.status_code}, Detalles: {error_detail}", response)

            # Lanzamos una excepción con los detalles capturados del microservicio
            raise HTTPException(
                status_code=response.status_code,
                detail= error_detail if error_detail != None or error_detail != "" else response.json(),
            )

        # Ahora vamos a leer las cookies de la respuesta del microservicio
        for cookie_name, cookie_value in response.cookies.items():
            print(f"Cookie recibida: {cookie_name}={cookie_value}")
            
            # Establecer la misma cookie en la respuesta de nuestro servicio principal
            http_response.set_cookie(
                key=cookie_name,
                value=cookie_value,
                httponly=True,  # No accesible desde JavaScript
                #secure=True,  # Solo se envía a través de HTTPS
                samesite="None",  # Permitir el envío de cookies entre sitios
                #max_age=timedelta_minutes(30),  # O cualquier tiempo que desees
                #expires=timedelta_minutes(30),
            )

    
        # Retornar respuesta sin el token en el cuerpo, ya que se encuentra en la cookie
        return response.json()