"""
📘 Tipado genérico estándar para entidades del dominio y esquemas Pydantic.

Este módulo define tipos genéricos reutilizables que representan los distintos 
esquemas de una entidad en el backend. Se utilizan tanto para modelos ORM (SQLAlchemy), 
como para validación y transferencia de datos con Pydantic en las capas de infraestructura, 
dominio, aplicación y presentación.

El objetivo es mantener una arquitectura coherente, desacoplada y expresiva 
al trabajar con repositorios, servicios y controladores, siguiendo principios 
de arquitectura limpia, DDD y SOLID.

🧱 Estructura típica:
- TModel: Modelo ORM persistente (SQLAlchemy)
- TCreateSchema: Esquema para crear una entidad (POST)
- TUpdateSchema: Esquema para actualizar una entidad (PUT/PATCH)
- TItemSchema: Esquema para representar ítems en listados (GET /recurso)
- TDetailSchema: Esquema para retornar una entidad en detalle (GET /recurso/{id})
"""

from typing import TypeVar
from pydantic import BaseModel
from app.base.infrastructure.database.model import BaseModel as TableBaseModel

# ---------------------------------------------------------
# 🧱 Modelo ORM base (SQLAlchemy)
# ---------------------------------------------------------
TModel = TypeVar("TModel", bound=TableBaseModel)
"""
Modelo ORM persistente basado en SQLAlchemy.

Debe heredar de `TableBaseModel`, que extiende `DeclarativeBase`. 
Este tipo se usa para representar entidades del dominio persistidas en la base de datos.

🔧 Ejemplo:
    class User(TableBaseModel):
        id: Mapped[int]
        username: Mapped[str]
        email: Mapped[str]
"""

# ---------------------------------------------------------
# 📥 Esquema de creación (entrada - POST)
# ---------------------------------------------------------
TCreateSchema = TypeVar("TCreateSchema", bound=BaseModel)
"""
Esquema Pydantic para la creación de nuevas entidades.

Define los campos requeridos que un cliente debe enviar en operaciones POST. 
Normalmente no incluye campos como `id`, `created_at` o `updated_at`, que se generan automáticamente.

🔧 Ejemplo:
    class UserCreate(BaseModel):
        username: str
        email: str
        password: str
"""

# ---------------------------------------------------------
# 📋 Esquema de ítem para listados (GET /recurso)
# ---------------------------------------------------------
TItemSchema = TypeVar("TItemSchema", bound=BaseModel)
"""
Esquema Pydantic para representar un ítem individual dentro de una colección.

Usado en respuestas como `GET /recurso`, proporciona una vista resumida 
de cada entidad. No incluye relaciones ni campos pesados.

🔧 Ejemplo:
    class UserItem(BaseModel):
        id: int
        username: str
        email: str
"""

# ---------------------------------------------------------
# 🔄 Esquema de actualización (entrada - PUT/PATCH)
# ---------------------------------------------------------
TUpdateSchema = TypeVar("TUpdateSchema", bound=BaseModel)
"""
Esquema Pydantic para actualizar entidades existentes.

Suele incluir el identificador (`id`) y los campos opcionales a modificar. 
Es compatible con operaciones PUT y PATCH.

🔧 Ejemplo:
    class UserUpdate(BaseModel):
        id: int
        username: Optional[str]
        email: Optional[str]
"""

# ---------------------------------------------------------
# 📤 Esquema de retorno en detalle (GET /recurso/{id})
# ---------------------------------------------------------
TDetailSchema = TypeVar("TDetailSchema", bound=BaseModel)
"""
Esquema Pydantic para retornar una entidad en detalle completo.

Utilizado en endpoints como `GET /recurso/{id}`, este esquema contiene 
campos completos, metadatos, relaciones anidadas, o datos derivados.

🔧 Ejemplo:
    class UserDetail(BaseModel):
        id: int
        username: str
        email: str
        created_at: datetime
        roles: List[RoleRead]
"""
