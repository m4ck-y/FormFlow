from datetime import datetime, timezone
from typing import Generator
import pytz

from sqlalchemy import create_engine, text
from sqlalchemy.orm.session import sessionmaker, Session as TSession
from sqlalchemy.ext.declarative import declarative_base

from app.config.env import settings
from app.utils.log import log_info

print("DEBUG: ", settings.DEBUG)

print("SQLALCHEMY_DB_URL: ", type(settings.SQLALCHEMY_DB_URL), settings.SQLALCHEMY_DB_URL)

engine = create_engine(settings.SQLALCHEMY_DB_URL, echo=settings.DEBUG)
Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def GetSession() -> Generator[TSession, None, None]:
    db = Session()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()

def datetime_now(t_zone=timezone.utc) -> datetime:
    if "postgresql" in settings.SQLALCHEMY_DB_URL:
        return datetime.now(t_zone)
    return datetime.now(t_zone)

Base = declarative_base()

def is_db_postgres():
    return "postgresql" in settings.SQLALCHEMY_DB_URL

def get_json_column_type():
    """
    Retorna el tipo de columna JSON apropiado según el motor de base de datos.
    
    Returns:
        JSONB para PostgreSQL, Text para SQLite
    """
    if is_db_postgres():
        from sqlalchemy.dialects.postgresql import JSONB
        return JSONB
    else:
        from sqlalchemy import Text
        return Text
    
def get_datetime_timezone_column_type():
    if is_db_postgres():
        from sqlalchemy import DateTime
        return DateTime(timezone=True)
    from sqlalchemy import Text
    return Text

def CreateSchema(*names):
    with engine.connect() as connection:
        for name in names:
            log_info(f"Creating schema if not exists: {name}")
            connection.execute(text(f"CREATE SCHEMA IF NOT EXISTS {name}"))
        connection.commit()
