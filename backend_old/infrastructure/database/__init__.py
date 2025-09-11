# infrastructure/database/base.py
from sqlalchemy import Column, Integer, DateTime
from datetime import datetime, timezone
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config.env import SQLALCHEMY_DB_URL, DEBUG


#SQLALCHEMY_DATABASE_URL = f"postgresql://{BD_USER}:{BD_PASS}@{BD_HOST}:{BD_PORT}/{BD_NAME}"
engine = create_engine(
    SQLALCHEMY_DB_URL,
    connect_args={"check_same_thread": False},# Para SQLite
    echo=DEBUG
)

Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

Base = declarative_base()


def datetime_now(t_zone = timezone.utc) -> datetime:

    #return datetime.now(t_zone)
    return datetime.now()