from app.base.infrastructure.database.model import BaseModel as TableBaseModel

# Representa el modelo de SQLAlchemy
from typing import TypeVar

TModelType = TypeVar("ModelType", bound=TableBaseModel) #TODO: dosctrings