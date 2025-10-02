from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.evaluation_topic import ModelEvaluationTopic
from app.form.domain.schemas.evaluation_topic import SchemaCreateDBEvaluationTopic

def CreateEvaluationTopic(entity: SchemaCreateDBEvaluationTopic, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelEvaluationTopic, entity, db, auto_commit)