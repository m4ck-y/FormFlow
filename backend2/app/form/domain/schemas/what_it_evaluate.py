from app.base.domain.schemas.base import BaseORMModel

class SchemaBaseWhatItEvaluate(BaseORMModel):
    name: str

class SchemaCreateDBWhatItEvaluate(SchemaBaseWhatItEvaluate):
    id_form: int


class SchemaCreateAPIWhatItEvaluate(SchemaBaseWhatItEvaluate):
    id_form: int


class SchemaItemWhatItEvaluate(SchemaBaseWhatItEvaluate):
    id: int

class SchemaDetailWhatItEvaluate(SchemaItemWhatItEvaluate):
    pass

class SchemaUpdateWhatItEvaluate(SchemaBaseWhatItEvaluate):
    id: int