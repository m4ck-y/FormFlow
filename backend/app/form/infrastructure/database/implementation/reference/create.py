from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.reference import ModelReference
from app.form.domain.schemas.reference import SchemaCreateDBReference

def CreateReference(entity: SchemaCreateDBReference, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelReference, entity, db, auto_commit)