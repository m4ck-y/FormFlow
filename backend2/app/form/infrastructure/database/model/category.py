from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

form_category = Table(
    SchemaForm("form_category"),
    BaseModel.metadata,
    Column("id_form", Integer, ForeignKey("form.id")),
    Column("id_category", Integer, ForeignKey(f"{SchemaForm('category')}.id")),
)

class ModelCategory(BaseModel):
    __tablename__ = SchemaForm("category")

    key_industry = Column(Integer, nullable=False)
    name = Column(String(255), nullable=False)

    # N:N | N categories -> N forms
    list_forms = relationship(
        "ModelForm",
        back_populates="list_categories",
        secondary=form_category,
        )