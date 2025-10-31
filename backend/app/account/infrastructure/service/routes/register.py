from app.config.db import GetSession
from sqlalchemy.orm import relationship
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.params import Depends
from app.base.infrastructure.database.model import BaseModel as BaseModelDB
from sqlalchemy.orm import Session
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Enum as SqlEnum
from pydantic import BaseModel
from typing import Optional
from enum import Enum


# Enum para EVerificationStatus
class EVerificationStatus(str, Enum):
    """
    - REJECTED  Rechazado
    - PENDING   Pendiente
    - APPROVED  Aprobado
    """

    "Rechazado"
    REJECTED = "REJECTED"

    "Pendiente"
    PENDING = "PENDING"

    "Aprobado"
    APPROVED = "APPROVED"


# Enum para EGenderIdentity
class EGenderIdentity(str, Enum):
    """
    Identidad de género del paciente o atributos sociales aprendidos o adoptados por la persona.

    Se debe registrar una de las siguientes opciones: 
    - 0 – NO ESPECIFICADO 
    - 1 – MASCULINO 
    - 2 – FEMENINO 
    - 3 – TRANSGÉNERO 
    - 4 – TRANSEXUAL 
    - 5 – TRAVESTI 
    - 6 – INTERSEXUAL 
    - 88 – OTRO

    GIIS-B015-04-11.DATOS DEL PACIENTE
    """

    NO_ESPECIFICADO = 0
    "NOT_SPECIFIED"

    MASCULINO = 1
    "MALE"

    FEMENINO = 2
    "FEMALE"

    TRANSGENERO = 3
    "TRANSGENDER"

    TRANSEXUAL = 4
    "TRANSSEXUAL"

    TRAVESTI = 5
    "TRANSVESTITE"

    INTERSEXUAL = 6
    "INTERSEXUAL"

    OTRO = 88
    "OTHER"

class Person(BaseModelDB):
    __tablename__ = "person"

    verification_status = Column(SqlEnum(EVerificationStatus), nullable=False, default=EVerificationStatus.PENDING)
    url_photo = Column(String)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    second_last_name = Column(String)
    type_gender = Column(SqlEnum(EGenderIdentity), nullable=False, default=EGenderIdentity.NO_ESPECIFICADO)

    # Relación inversa (1:1)
    user = relationship("User", back_populates="person", uselist=False)

class User(BaseModelDB):
    __tablename__ = "user"

    __table_args__ = {"schema": "account"}

    id_person = Column(Integer, ForeignKey(f"{Person.__tablename__}.id"), nullable=False, unique=True)
    # 1:1 | 1 user -> 1 person
    person = relationship("Person", back_populates="user")
    
    username = Column(String(191), nullable=False, unique=True)
    password = Column(String(191), nullable=False)
    
    is_active = Column(Boolean, nullable=False, default=True) 

# Esquema Pydantic para Person
class PersonCreate(BaseModel):
    first_name: str
    last_name: str
    second_last_name: Optional[str] = None
    type_gender: EGenderIdentity = EGenderIdentity.NO_ESPECIFICADO
    verification_status: EVerificationStatus = EVerificationStatus.PENDING
    url_photo: Optional[str] = None

    class Config:
        orm_mode = True


# Esquema Pydantic para User (dentro de Person)
class UserCreate(BaseModel):
    username: str
    password: str
    person: PersonCreate  # Relación con PersonCreate

    class Config:
        orm_mode = True

account_router = APIRouter(
    prefix="/account",
    tags=["account"],
)


def setup(api_server: FastAPI):
    api_server.include_router(account_router)
@account_router.post("/users")
def register_user(user_data: UserCreate, db: Session = Depends(GetSession)):
    try:
        # Insertar Persona
        new_person = Person(
            first_name=user_data.person.first_name,
            last_name=user_data.person.last_name,
            second_last_name=user_data.person.second_last_name,
            type_gender=user_data.person.type_gender,
            verification_status=user_data.person.verification_status,
            url_photo=user_data.person.url_photo,
        )
        db.add(new_person)
        db.flush([new_person])  # Obtener el ID generado para la persona

        if not new_person.id:
            print("Error al crear la persona, id no generado", new_person.id)
            raise HTTPException(status_code=500, detail="Error al crear la persona")

        # Insertar Usuario
        new_user = User(
            username=user_data.username,
            password=user_data.password,
            id_person=new_person.id,  # Asociar la persona al usuario
        )
        db.add(new_user)
        db.commit()

        return {"message": "Usuario registrado exitosamente"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))