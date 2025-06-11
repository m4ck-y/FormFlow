from typing import Optional, Set, Type, TypeVar
from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.types import TCreateDBSchema
from app.utils.log import log_info


class BaseCreateAPISchema(BaseORMModel):
    """
    🧱 Modelo base para esquemas de entrada desde API (POST) que pueden incluir estructuras anidadas 
    (relaciones, objetos compuestos) y requieren ser transformados en esquemas planos para persistencia.

    Proporciona:
    - `to_db_schema()`: Convierte el esquema actual en su forma lista para la base de datos.

    🔄 Útil para desacoplar la estructura rica del frontend de la estructura normalizada de la base de datos.

    🧩 Ejemplo:
    ```python
    class AddressCreateAPI(BaseORMModel):
        zip_code: str
        country_code: str

    class UserCreateAPI(BaseCreateAPISchema):
        username: str
        email: str
        address: AddressCreateAPI  # anidado

        def get_exclude_fields(self) -> Set[str]:
            return {"address"}

    class UserCreateDB(BaseORMModel):
        username: str
        email: str
        address_id: int  # clave foránea ya resuelta

    user_api = UserCreateAPI(
        username="juan123",
        email="juan@example.com",
        address=AddressCreateAPI(zip_code="12345", country_code="ES")
    )

    user_db = user_api.to_db_schema(UserCreateDB)
    user_db.address_id = 42

    # También puedes omitir `db_schema` si ya está en formato plano:
    user_data = user_api.to_db_schema()
    assert user_data == user_api
    ```
    """

    def to_db_schema(self) -> TCreateDBSchema:
        """
        🔄 Convierte el esquema actual en su versión para base de datos (plano),
        excluyendo campos definidos en `get_exclude_fields()` o adicionales.

        """
        raise NotImplementedError


# ---------------------------------------------------------
# 📥 Esquema de creación desde API (POST - con anidamientos)
# ---------------------------------------------------------
TCreateAPISchema = TypeVar("TCreateAPISchema", bound=BaseCreateAPISchema)
"""
Esquema Pydantic para la creación de una entidad desde la API.

Este tipo representa los datos que el cliente envía en una solicitud POST, incluyendo
estructuras anidadas o relaciones implícitas que aún no están normalizadas para la base de datos.

Es útil para recibir la estructura completa desde el frontend, que puede incluir entidades relacionadas
representadas como objetos anidados.

🔧 Ejemplo:
```
    class UserCreateAPI(BaseORMModel):
        name: str
        email: str
        address: AddressCreate  # objeto anidado

    class AddressCreate(BaseORMModel):
        zip_code: str
        country_code: str
```
"""
