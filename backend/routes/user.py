from fastapi import APIRouter, FastAPI, HTTPException
import httpx
from config.env import API_USER_HOST, API_USER_PORT

ROUTE_NAME = "user"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])

def UserRouter(api_server: FastAPI):
    api_server.include_router(api_router)

@api_router.post("/register")
async def Register(data: dict):

    if not API_USER_HOST or not API_USER_PORT:
        print("No se ha configurado la URL del microservicio de usuarios")
        raise HTTPException(status_code=500, detail="Error al registrar usuario")
    
    url = f"http://{API_USER_HOST}:{API_USER_PORT}/user"

    async with httpx.AsyncClient(follow_redirects=True) as client:
        response = await client.post(url, json=data)
        if response.status_code != 200:
            print("Error al llamar al microservicio de usuarios", url, response)
            print(response.json())
            raise HTTPException(status_code=response.status_code, detail="Error al registrar usuario")
        return response.json()    

@api_router.get("/exists")
async def Exists(username: str) -> bool:

    if not API_USER_HOST or not API_USER_PORT:
        print("No se ha configurado la URL del microservicio de usuarios")
        raise HTTPException(status_code=500, detail="Error al registrar usuario")
    
    url = f"http://{API_USER_HOST}:{API_USER_PORT}/user/exists"

    async with httpx.AsyncClient(follow_redirects=True) as client:
        response = await client.get(url, params={"username": username})
        if response.status_code != 200:
            print("Error al llamar al microservicio de usuarios", url, response)
        return response.json()