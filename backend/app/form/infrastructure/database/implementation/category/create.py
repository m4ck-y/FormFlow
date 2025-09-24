from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.category import ModelCategory
from app.form.domain.schemas.category import SchemaCreateAPICategory

def CreateCategory(entity: SchemaCreateAPICategory, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelCategory, entity, db, auto_commit)