from app.form.infrastructure.database.model.form import ModelForm
from app.form.infrastructure.database.model.estimated_duration import ModelEstimatedDuration
from app.form.infrastructure.database.model.age_group import ModelAgeGroup, target_age_group
from app.form.infrastructure.database.model.target_sex import ModelTargetSex
from app.form.infrastructure.database.model.reference import ModelReference
from app.form.infrastructure.database.model.what_it_evaluate import ModelWhatItEvaluate
from app.form.infrastructure.database.model.category import form_category, ModelCategory

def init():
    print("init >>> form ... ")