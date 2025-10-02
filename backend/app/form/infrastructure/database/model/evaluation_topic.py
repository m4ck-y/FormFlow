from sqlalchemy import Column, ForeignKey, Integer, String, Table, Text
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.form.infrastructure.database.schema import SchemaForm

form_evaluation_topics = Table(
    SchemaForm.TBL_FORM_EVALUATION_TOPICS.name,
    BaseModel.metadata,
    Column("id_form", Integer, ForeignKey("form.id"), primary_key=True),
    Column("id_evaluation_topic", Integer, ForeignKey(f"{SchemaForm.TBL_EVALUATION_TOPIC.identifier}.id"), primary_key=True),
    schema=SchemaForm.TBL_FORM_EVALUATION_TOPICS.schema
)

class ModelEvaluationTopic(BaseModel):

    __tablename__ = SchemaForm.TBL_EVALUATION_TOPIC.name
    __table_args__ = {"schema": SchemaForm.TBL_EVALUATION_TOPIC.schema}

    name = Column(String(255), nullable=False)
    description = Column(Text)
    key_industry = Column(String(20))  # ej: 'health', 'finance', 'tech', etc.

    # N:N | N evaluation_topics -> N forms
    list_forms = relationship(
        "ModelForm",
        back_populates="list_evaluation_topics",
        secondary=form_evaluation_topics,
        )