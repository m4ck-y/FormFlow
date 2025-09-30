from app.base.domain.repository.session import TSession
from app.question.domain.schemas.questions_form import SchemaCreateDBQuestionsForm
from app.question.infrastructure.database.model.question import form_questions
from app.utils.log import log_error

def CreateQuestionsForm(db:TSession, value:SchemaCreateDBQuestionsForm, auto_commit = False) -> int:
    smt = form_questions.insert().values(**value.model_dump())
    result = db.execute(smt)

    if auto_commit:
        db.commit()

    pk = result.inserted_primary_key
        
    if pk and len(pk) > 0 and pk[0] is not None:
        return pk[0]
    err = "No se pudo obtener la llave primaria"
    log_error(err)
    raise ValueError(err)