from sqlalchemy.orm import relationship, Session
from sqlalchemy import Column, DateTime, Integer, String
from infrastructure.database import datetime_now
from infrastructure.models import BaseModel
from domain.enum.url_type import EUrlType

class ModelOTP(BaseModel):
    __tablename__ = "otp"
    id = Column(Integer, autoincrement=True, primary_key=True)
    code = Column(String(6), nullable=False)
    email = Column(String(255), nullable=False)
    expires_at = Column(DateTime, nullable=False)

    def is_expired(self):
        print("""
              
              -----

select * from otp where expires_at < now()
              
              -----

        """, self.expires_at, datetime_now())

        print(self.expires_at, datetime_now())

        return self.expires_at < datetime_now()
    
    @staticmethod
    def delete_previous_otp(db: Session, email: str):
        # Elimina cualquier código OTP anterior no usado
        r = db.query(ModelOTP).filter(ModelOTP.email == email
                                  #, ModelOTP.used == False
                                  ).delete()
        print("--- Deleted", r, "OTP ---")
        db.commit()