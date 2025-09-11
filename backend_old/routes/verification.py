import random
from fastapi import APIRouter, Depends, FastAPI, HTTPException, status
import httpx
from config.env import API_EMAIL_HOST, API_EMAIL_PORT, API_USER_HOST, API_USER_PORT, APP_NAME
from application.otp import OTPApplication
from infrastructure.database import get_db
from sqlalchemy.orm import Session
from pydantic import EmailStr, Field

ROUTE_NAME = "verification"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])
application_layer = OTPApplication()


def VerificationRouter(api_server: FastAPI):
    api_server.include_router(api_router)


async def VerificationEmail(email: EmailStr):
    #search email used as username
    url = f"http://{API_USER_HOST}:{API_USER_PORT}/user/basic_info"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={"username": email})

        r_json = response.json()

        if r_json is not None and response.status_code == 200:
            print("Email already registered: ", r_json)
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email ya registrado")
        if response.status_code != 200:
            print("Error al llamar al microservicio de user/basic_info", r_json)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error al llamar al microservicio de user/basic_info")        
        
        print("........ response. json", r_json)
    #search email already exists
    

@api_router.post("/email_otp")
async def SendOTP(email: EmailStr, db: Session = Depends(get_db)):

    await VerificationEmail(email)

    application_layer.delete_previous_otp(db, email)

    otp_code = application_layer.generate_otp(db, email)
    print("number", otp_code.number)
    print("expires_at", otp_code.expires_at)

    await send_otp_to_service(email, otp_code.number)

    return {"message": "OTP enviado"}

@api_router.post("/verify_otp")
async def VerifyOTP(email: EmailStr, code: int, db: Session = Depends(get_db)):
    application_layer.verify_otp(db, email, code)
    return {"message": "OTP verificado"}

@api_router.post("/resend_otp")
async def ResendOTP(email: str, db: Session = Depends(get_db)):
    application_layer.delete_previous_otp()
    new_otp = application_layer.generate_otp(db, email)

    send_otp_to_service(email, new_otp.number)
    return {"message": "OTP enviado"}

async def send_otp_to_service(email: str, otp_code: int):
    url = f"http://{API_EMAIL_HOST}:{API_EMAIL_PORT}/verification/email_otp"
    params = {
        "email": email,
        "code": otp_code,
        "app_name": APP_NAME
    }
    
    async with httpx.AsyncClient() as client:
        try:
            print("httpx, send_otp_to_service", url, params)
            response = await client.post(url, params=params)
            print("httpx, send_otp_to_service", response)
            
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Error al enviar OTP al microservicio")
            return response.json()
        
        except httpx.ConnectError as e:
            # Si hay un error de conexión, lanza una excepción con un mensaje apropiado
            raise HTTPException(status_code=500, detail=f"No se pudo conectar con el servicio de verificación: {str(e)}")
        except httpx.RequestError as e:
            # Puedes manejar otros tipos de errores de httpx aquí
            raise HTTPException(status_code=500, detail=f"Error en la solicitud HTTP: {str(e)}")