from dataclasses import dataclass
import random
import datetime
from infrastructure.models.auth.otp import ModelOTP as Table

from sqlalchemy.orm import Session
from fastapi import HTTPException
from infrastructure.database import datetime_now


@dataclass
class OtpCode:
    number: int
    expires_at: datetime.datetime


class OTPApplication:
    def __init__(self):
        pass

    # expiration_time = datetime.datetime.now() + datetime.timedelta(minutes=5)

    def generate_otp(self, db: Session, email: str):
        number = random.randint(100000, 999999)
        expires_at = datetime_now() + datetime.timedelta(minutes=5)

        db.add(Table(code=number, email=email, expires_at=expires_at))
        db.commit()

        return OtpCode(number, expires_at)
    
    def verify_otp(self, db: Session, email: str, code: int):

        row =  db.query(Table).filter(Table.email == email, Table.code == code).first()
        if row is None:
            raise HTTPException(status_code=400, detail="OTP no encontrado.")
        if row.is_expired():
            raise HTTPException(status_code=400, detail="OTP expirado")
        return True

    def delete_previous_otp(self, db: Session, email: str):
        Table.delete_previous_otp(db, email)


    
