from app.base.domain.repository.session import TSession
from app.question.domain.schemas.questions_section import SchemaCreateDBQuestionsSection
from app.question.infrastructure.database.model.question import questions_section
from app.utils.log import log_error

def CreateQuestionsSection(db:TSession, value:SchemaCreateDBQuestionsSection) -> int:
    smt = questions_section.insert().values(**value.model_dump())
    #smt = questions_section.insert().values(id_section=id_section, id_question=id_question)
    #stmt = insert(questions_section).values(id_section=id_section, id_question=id_question)

    result =db.execute(smt)
    pk = result.inserted_primary_key
        
    if pk and len(pk) > 0 and pk[0] is not None:
        return pk[0]
    err = "No se pudo obtener la llave primaria"
    log_error(err)
    raise ValueError(err)