from datetime import datetime, date, time
from enum import Enum
from app.base.infrastructure.database.model import BaseModel
from sqlalchemy import Column, ForeignKey, Integer, Float, String, Text, Boolean, Date, DateTime, Time, JSON, Enum as SQLEnum
from sqlalchemy.orm import foreign_key
class DataType(Enum):
    INTEGER = 'integer'
    FLOAT = 'float'
    STRING = 'string'
    BOOLEAN = 'boolean'
    DATE = 'date'
    DATETIME = 'datetime'
    TIME = 'time'
    JSON = 'json'
    
    # Metadatos adicionales para cada tipo
    @property
    def python_type(self):
        type_map = {
            DataType.INTEGER: int,
            DataType.FLOAT: float,
            DataType.STRING: str,
            DataType.BOOLEAN: bool,
            DataType.DATE: 'date',  # Podrías usar datetime.date
            DataType.DATETIME: datetime,
            DataType.TIME: 'time',  # Podrías usar datetime.time
            DataType.JSON: dict
        }
        return type_map[self]
    
    @property
    def sql_type(self):

        return {
            DataType.INTEGER: Integer,
            DataType.FLOAT: Float,
            DataType.STRING: String,
            DataType.BOOLEAN: Boolean,
            DataType.DATE: Date,
            DataType.DATETIME: DateTime,
            DataType.TIME: Time,
            DataType.JSON: JSON
        }[self]
class DSLFieldMetadata(BaseModel):
    __tablename__ = "dsl_field_metadata"
    
    __table_args__ = {"schema": "form"}

    alias = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    table_schema = Column(String(50))  # Ej: "public"
    table_name = Column(String(100))   # Ej: "person"
    column_name = Column(String(100))  # Ej: "age"
    data_type = Column(SQLEnum(DataType), nullable=False)
    is_available = Column(Boolean, default=True)
    
    form_id = Column(Integer, ForeignKey("form.id"))

"""
new_field = DSLFieldMetadata(
    alias="person.age",
    data_type=DataType.INTEGER,  # Usamos el Enum directamente
    # ... otros campos ...
)

field = session.query(DSLFieldMetadata).first()
print(field.data_type.python_type)  # <class 'int'>
print(field.data_type.sql_type)     # <class 'sqlalchemy.sql.sqltypes.Integer'>

"""