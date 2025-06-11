from typing import List, Generic, Optional
from app.base.domain.repository.session import TSession
from app.base.domain.repository.base import IBaseRepository

from app.base.domain.schemas import str_schema_json

from app.base.domain.schemas.types import TDetailSchema, TItemSchema, TUpdateSchema
from app.base.domain.schemas.create_api import TCreateAPISchema
from app.utils.str_class_json import str_class_json
from app.base.domain.schemas.str_schema_json import str_schema_json
from app.utils.enum.str_color import StrColor
from app.utils.log import log_info

str_color = StrColor()

class BaseLayerApplication(Generic[TCreateAPISchema, TItemSchema, TDetailSchema, TUpdateSchema]):
    """
    **Parámetros genéricos:**
    - `TCreateAPISchema`: Tipo que representa el esquema de creación de la entidad desde la API (ejemplo: `UserCreateAPI`).
    - `TCreateDBSchema`: Tipo que representa el esquema de creación de la entidad (ejemplo: `UserCreate`). #TODO: delete
    - `TItemSchema`: Tipo que representa el esquema de los ítems individuales de la entidad en listados (ejemplo: `UserListItem`).
    - `TDetailSchema`: Tipo que representa el esquema de la entidad devuelta en detalle (ejemplo: `UserDetail`).
    - `TUpdateSchema`: Tipo que representa el esquema de actualización de la entidad (ejemplo: `UserUpdate`).

    Capa de aplicación genérica que maneja operaciones CRUD comunes para cualquier tipo de entidad.
    Las clases específicas de entidad deben heredar de esta clase y proporcionar el repositorio y los esquemas correspondientes.

    Esta clase abstrae las operaciones básicas de creación, lectura, actualización y eliminación (CRUD),
    delegando la lógica de persistencia al repositorio inyectado.

    Notas:
    - Esta capa actúa como un intermediario entre el controlador y el repositorio.
    - Los esquemas de los datos se validan con Pydantic antes de ser enviados al repositorio.
    - Los métodos en esta clase están pensados para ser reutilizables para diferentes tipos de entidades y no deben incluir lógica de presentación ni de infraestructura.
    """

    def __init__(self, repository: IBaseRepository[TCreateAPISchema, TItemSchema, TDetailSchema, TUpdateSchema]):
        """
        Inicializa la capa de aplicación con un repositorio.

        Args:
            repository (IBaseRepository): El repositorio que implementa las operaciones CRUD genéricas.
        """
        self.repository = repository  # El repositorio inyectado que maneja las operaciones de base de datos


        log_info(str_class_json(self.repository))

    def Create(self, value: TCreateAPISchema, db: TSession, auto_commit: bool = True) -> int: #TODO: add_all (models[])
        """
        Crea una nueva entidad en la base de datos utilizando el repositorio.

        Args:
            value (TCreateSchema): Los datos de la entidad que se van a crear.
            db (TSession): La sesión activa de la base de datos, que se pasa desde el controlador o el entorno de ejecución.
            auto_commit (bool): Si se debe hacer commit de la transacción.

        Returns:
            int: El ID de la nueva entidad creada.
        """

        #schema_db  = value.to_db_schema()

        #self.repository

        #log_info("CreateAPISchema:", str_schema_json(schema_db))
        #log_info("CreateDBSchema:", str_schema_json(schema_db))
        return self.repository.Create(value, db, auto_commit=auto_commit)

    def Get(self, id: int, db: TSession) -> Optional[TDetailSchema]:
        """
        Obtiene una entidad por su ID desde la base de datos.

        Args:
            id (int): El ID de la entidad que se desea obtener.
            db (TSession): La sesión activa de la base de datos.

        Returns:
            Optional[TDetailSchema]: La entidad encontrada, o None si no se encuentra.
        """
        return self.repository.Get(id, db)

    def List(self, db: TSession) -> List[TItemSchema]:
        """
        Obtiene todas las entidades almacenadas en la base de datos.

        Args:
            db (TSession): La sesión activa de la base de datos.

        Returns:
            List[TItemSchema]: Una lista de entidades representadas en un esquema de ítem.
        """
        return self.repository.List(db)

    def Update(self, entity: TUpdateSchema, db: TSession, auto_commit: bool = True) -> bool:
        """
        Actualiza una entidad existente en la base de datos.

        Args:
            entity (TUpdateSchema): Los nuevos datos de la entidad que se van a actualizar.
            db (TSession): La sesión activa de la base de datos.
            auto_commit (bool): Si se debe hacer commit de la transacción.

        Returns:
            bool: `True` si la actualización fue exitosa, `False` si la entidad no fue encontrada.
        """
        return self.repository.Update(entity, db, auto_commit=auto_commit)

    def Delete(self, id: int, db: TSession, auto_commit: bool = True) -> bool:
        """
        Elimina una entidad por su ID de la base de datos.

        Args:
            id (int): El ID de la entidad que se desea eliminar.
            db (TSession): La sesión activa de la base de datos.
            auto_commit (bool): Si se debe hacer commit de la transacción.

        Returns:
            bool: `True` si la entidad fue eliminada correctamente, `False` si no se encontró.
        """
        log_info(str_class_json(self.repository))
        return self.repository.Delete(id, db, auto_commit=auto_commit)
