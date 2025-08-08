from fastapi import APIRouter, FastAPI, Depends
from sqlalchemy.orm import Session
from app.config.db import GetSession
from app.form.domain.schemas.form_condition import SchemaCreateAPIFormCondition

ROUTE_NAME = "condition"
router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])

class ServiceFormCondition:
    
    
    def __init__(self, api_server: FastAPI, app_layer, route_parent: str = None):

        route_name = f"{route_parent}/{route_name}" if route_parent else route_name
        tags = [route_parent, route_name] if route_parent else [route_name]

        self.api_router = APIRouter(prefix=f"/{route_name}", tags=tags)

        self.app_layer = app_layer
        self.route_parent = route_parent
        self.setup_routes(api_server)


    def setup_routes(self, api_server: FastAPI):
        def Create(data: SchemaCreateAPIFormCondition, db: Session = Depends(GetSession)):
            return self.Create(data, db)
        
        self.api

    def Create(self, data: SchemaCreateAPIFormCondition, db: Session) -> int:
        return self.app_layer.Create(data, db)

