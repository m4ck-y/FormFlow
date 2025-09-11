from sqlalchemy import Column, Integer, String
from models.sqlalchemy import Base

class ModelFormCategory(Base):

    __tablename__ = "form_category"

    id_service = Column(Integer)
    id_form = Column(Integer)