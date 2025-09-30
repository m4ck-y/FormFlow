from sqlalchemy import Column, Integer, String, ForeignKey, Text, Enum as SQLAlchemyEnum, Table
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

form_cie11codes = Table(
    SchemaForm.TBL_FORM_CIE11CODES.name,
    BaseModel.metadata, # TODO: sqlite no soporta primary key compuesta(con fks) + una pk propia con autoincrement
    Column("id_form", Integer, ForeignKey(f"{SchemaForm.TBL_FORM.identifier}.id"), primary_key=True),
    Column("id_cie11code", Integer, ForeignKey(f"{SchemaForm.TBL_CIE11_CODE.identifier}.id"), primary_key=True),
    schema=SchemaForm.TBL_FORM_CIE11CODES.schema
)

class ModelCIE11Code(BaseModel): #TODO: table, updatated_by, deleted_by, etc, se puede hacer una clase que herede de table? y tendria atributos creted_at, by?, etc, ...
    __tablename__ = SchemaForm.TBL_CIE11_CODE.name
    __table_args__ = {"schema": SchemaForm.TBL_FORM_CIE11CODES.schema}

    code = Column(String(10), nullable=False, unique=True)

    # N:N | N cie11_code -> N form
    list_forms = relationship(
        "ModelForm",
        secondary=form_cie11codes,
        back_populates="list_cie11codes"
    )