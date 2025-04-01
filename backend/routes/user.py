from fastapi import APIRouter, FastAPI
#from config.env import 

ROUTE_NAME = "user"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])

def UserRouter(api_server: FastAPI):
    api_server.include_router(api_router)

@api_router.post("/register")
def Register(data: dict):
    print("Registering user, ....", data)
