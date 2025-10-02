from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.question.infrastructure.database.model.question import form_questions
from app.form.infrastructure.database.model.category import form_category
from app.form.infrastructure.database.model.age_group import target_age_group
from app.form.infrastructure.database.model.cie11_code import form_cie11codes
from app.form.infrastructure.database.model.evaluation_topic import form_evaluation_topics

from app.form.infrastructure.database.schema import SchemaForm
from app.utils.log import log_info


log_info("[MODEL][FORM] app/form/infrastructure/database/model/form.py:", SchemaForm.TBL_FORM.name)

class ModelForm(BaseModel):
    __tablename__ = SchemaForm.TBL_FORM.name
    __table_args__ = {"schema": SchemaForm.TBL_FORM.schema}

    key = Column(String(255), unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)

    # 1:N | 1 form -> N sections
    list_sections = relationship("ModelSection", back_populates="form")
    # 1:N | 1 form -> N questions
    list_questions = relationship("ModelQuestion", secondary=form_questions, back_populates="form")

    # 1:N | 1 form -> N references
    list_references = relationship("ModelReference", back_populates="form")

    # 1:N | 1 form -> N what it evaluate
    list_what_it_evaluate = relationship("ModelWhatItEvaluate", back_populates="form")

     # N:N | N form -> N categories
    list_categories = relationship("ModelCategory", secondary=form_category, back_populates="list_forms")

    # N:N | N form -> N cie11_code
    list_cie11codes = relationship("ModelCIE11Code", secondary=form_cie11codes, back_populates="list_forms")

    # N:N | N form -> N evaluation_topics
    list_evaluation_topics = relationship("ModelEvaluationTopic", secondary=form_evaluation_topics, back_populates="list_forms")

    # OPTIONALS

    # 1:1 | 1 form -> 1 estimated duration
    estimated_duration = relationship("ModelEstimatedDuration", back_populates="form", uselist=False)

    # 1:1 | 1 form -> 1 target age group
    target_age_group = relationship("ModelAgeGroup", secondary=target_age_group,back_populates="form", uselist=False)

    # 1:1 | 1 form -> 1 target sex
    target_sex = relationship("ModelTargetSex", back_populates="form", uselist=False)

    # 1:1 | 1 form -> 1 condition
    condition = relationship("ModelFormCondition", back_populates="form", uselist=False)