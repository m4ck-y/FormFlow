from abc import ABC, abstractmethod
from typing import Generic, List, Optional
from app.base.domain.repository.session import TSession  # Solo se usa como tipado
from app.base.domain.schemas.types import TCreateSchema, TItemSchema, TDetailSchema, TUpdateSchema # Importe los tipos genéricos

class IBaseRepository(ABC, Generic[TCreateSchema, TItemSchema, TDetailSchema, TUpdateSchema]):
    """
    Interfaz genérica de repositorio para operaciones CRUD sobre cualquier entidad del dominio.

    **Parámetros genéricos:**
    - `TCreateSchema`: Tipo que representa el esquema de creación de la entidad (ejemplo: `UserCreate`).
    - `TItemSchema`: Tipo que representa el esquema de los ítems individuales de la entidad en listados (ejemplo: `UserListItem`).
    - `TDetailSchema`: Tipo que representa el esquema de la entidad devuelta en detalle (ejemplo: `UserDetail`).
    - `TUpdateSchema`: Tipo que representa el esquema de actualización de la entidad (ejemplo: `UserUpdate`).
    
    Esta interfaz define los contratos base que deben implementar los repositorios específicos
    para manejar operaciones de persistencia de datos. Está diseñada para mantener aislada 
    la lógica de dominio de la tecnología de persistencia (ORM, base de datos, etc.).

    Notas:
    - La gestión de sesiones y transacciones corresponde exclusivamente a la capa de infraestructura.
    - Los errores relacionados a la base de datos (como fallas de conexión) deben capturarse en capas externas.
    - Esta clase no debe incluir lógica HTTP ni depender de FastAPI u otros frameworks externos.
    """

    @abstractmethod
    def Create(self, value: TCreateSchema, session: TSession, auto_commit: bool = True) -> int:
        """
        Crea una nueva entidad en la base de datos.

        Args:
            value (TCreateSchema): Esquema de creación de la entidad, que contiene los datos necesarios
            para crear una nueva instancia de la entidad (sin incluir identificadores generados automáticamente).
            session (TSession): Sesión activa de la base de datos.
            auto_commit (bool): Si se debe hacer commit de la transacción.

        Returns:
            int: ID de la entidad recién creada en la base de datos.
        """
        raise NotImplementedError

    @abstractmethod
    def List(self, session: TSession) -> List[TItemSchema]:
        """
        Lista todas las entidades disponibles en la base de datos.

        Este método devuelve una lista de entidades, pero en una versión simplificada, 
        donde se omiten relaciones complejas y otros detalles innecesarios para una vista rápida.

        Args:
            session (TSession): Sesión activa de la base de datos.

        Returns:
            List[TItemSchema]: Lista de ítems de las entidades, con datos resumidos y optimizados para ser usados
            en vistas o respuestas de listados.
        """
        raise NotImplementedError

    @abstractmethod
    def Get(self, id: int, session: TSession) -> Optional[TDetailSchema]:
        """
        Recupera una entidad por su ID.

        Args:
            id (int): Identificador único de la entidad.
            session (TSession): Sesión activa de la base de datos.

        Returns:
            Optional[TDetailSchema]: Detalle de la entidad encontrada. Devuelve `None` si no se encuentra la entidad.
        """
        raise NotImplementedError

    @abstractmethod
    def Update(self, value: TUpdateSchema, session: TSession, auto_commit: bool = True) -> bool:
        """
        Actualiza una entidad existente.

        Este método toma un esquema de actualización con los datos a modificar en la entidad. 
        Si la entidad existe, se actualizan los campos indicados. Si no, se devuelve `False`.

        Args:
            value (TUpdateSchema): Esquema que contiene los campos a actualizar. El campo `id` es requerido.
            session (TSession): Sesión activa de la base de datos.
            auto_commit (bool): Si se debe hacer commit de la transacción.

        Returns:
            bool: `True` si la actualización fue exitosa, `False` si la entidad no fue encontrada o no pudo ser actualizada.
        """
        raise NotImplementedError

    @abstractmethod
    def Delete(self, id: int, session: TSession, auto_commit: bool = True) -> bool:
        """
        Elimina una entidad por su ID.

        Este método elimina una entidad de la base de datos de acuerdo con su identificador. 
        Si la entidad no existe, devuelve `False`.

        Args:
            id (int): Identificador único de la entidad a eliminar.
            session (TSession): Sesión activa de la base de datos.
            auto_commit (bool): Si se debe hacer commit de la transacción.

        Returns:
            bool: `True` si la eliminación fue exitosa, `False` si la entidad no fue encontrada.
        """
        raise NotImplementedError