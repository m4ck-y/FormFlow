from fastapi import APIRouter, Depends, FastAPI, HTTPException


ROUTE_NAME = "auth"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])


def AuthRouter(api_server: FastAPI):
    api_server.include_router(api_router)




@api_router.get("/")
async def Get():
    return {"message": "Hello World"}