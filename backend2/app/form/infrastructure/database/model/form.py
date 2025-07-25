from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from app.base.infrastructure.database.model import BaseModel
from app.question.infrastructure.database.model.question import questions_form
from app.form.infrastructure.database.model.category import form_category
from app.form.infrastructure.database.model.age_group import target_age_group

class ModelForm(BaseModel):
    __tablename__ = "form"

    key = Column(String(255), unique=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)

    # 1:N | 1 form -> N sections
    list_sections = relationship("ModelSection", back_populates="form")
    # 1:N | 1 form -> N questions
    list_questions = relationship("ModelQuestion", secondary=questions_form, back_populates="form")

    # 1:N | 1 form -> N references
    list_references = relationship("ModelReference", back_populates="form")

    # 1:N | 1 form -> N what it evaluate
    list_what_it_evaluate = relationship("ModelWhatItEvaluate", back_populates="form")

     # N:N | N form -> N categories
    list_categories = relationship("ModelCategory", secondary=form_category, back_populates="list_forms")

    # OPTIONALS

    # 1:1 | 1 form -> 1 estimated duration
    estimated_duration = relationship("ModelEstimatedDuration", back_populates="form", uselist=False)

    # 1:1 | 1 form -> 1 target age group
    target_age_group = relationship("ModelAgeGroup", secondary=target_age_group,back_populates="form", uselist=False)

    # 1:1 | 1 form -> 1 target sex
    target_sex = relationship("ModelTargetSex", back_populates="form", uselist=False)

    # 1:1 | 1 form -> 1 condition
    condition = relationship("ModelFormCondition", back_populates="form", uselist=False)