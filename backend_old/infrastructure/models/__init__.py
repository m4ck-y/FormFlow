from sqlalchemy import Column, DateTime, Integer


from infrastructure.database import Base, datetime_now, engine



class BaseModel(Base):
    __abstract__ = True  # Esto significa que esta clase no se mapea a una tabla directamente

    id = Column(Integer, primary_key=True, index=True)  # ID común para todas las tablas
    created_at = Column(DateTime, default=datetime_now)  # Fecha de creación
    updated_at = Column(DateTime, default=datetime_now, onupdate=datetime_now)  # Fecha de actualización
    
    # Opcional: Agregar soporte para un campo soft delete (opcional)
    deleted_at = Column(DateTime, nullable=True)  # Para soporte de eliminación suave