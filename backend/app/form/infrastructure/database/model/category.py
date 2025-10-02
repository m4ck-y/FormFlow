from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

form_categories = Table(
    SchemaForm.TBL_FORM_CATEGORIES.name,
    BaseModel.metadata,
    Column("id_form", Integer, ForeignKey("form.id"), primary_key=True),
    Column("id_category", Integer, ForeignKey(f"{SchemaForm.TBL_CATEGORY.identifier}.id"), primary_key=True),
    schema=SchemaForm.TBL_FORM_CATEGORIES.schema
)

class ModelCategory(BaseModel):

    __tablename__ = SchemaForm.TBL_CATEGORY.name
    __table_args__ = {"schema": SchemaForm.TBL_CATEGORY.schema}

    key_industry = Column(Integer, nullable=False) #https://www.inegi.org.mx/scian/, clasificacion industrial de america del norte
    name = Column(String(255), nullable=False)

    # N:N | N categories -> N forms
    list_forms = relationship(
        "ModelForm",
        back_populates="list_categories",
        secondary=form_categories,
        )