from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.estimated_duration import ModelEstimatedDuration
from app.form.domain.schemas.estimated_duration import SchemaCreateDBEstimatedDuration

def CreateEstimatedDuration(entity: SchemaCreateDBEstimatedDuration, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelEstimatedDuration, entity, db, auto_commit)