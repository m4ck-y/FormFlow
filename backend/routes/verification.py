import random
from fastapi import APIRouter, Depends, FastAPI, HTTPException
import httpx
from config.env import API_EMAIL_HOST, API_EMAIL_PORT, APP_NAME
from application.otp import OTPApplication
from infrastructure.database import get_db
from sqlalchemy.orm import Session
from pydantic import EmailStr, Field

ROUTE_NAME = "verification"

api_router = APIRouter(prefix=f"/{ROUTE_NAME}", tags=[ROUTE_NAME])
application_layer = OTPApplication()


def VerificationRouter(api_server: FastAPI):
    api_server.include_router(api_router)

@api_router.post("/email_otp")
async def SendOTP(email: EmailStr, db: Session = Depends(get_db)):

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
        response = await client.post(url, params=params)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Error al enviar OTP al microservicio")
        return response.json()