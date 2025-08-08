VALID_DSL_FIELDS = {
    "person": {
        #"age": "psn.age",
        "biological_sex": "psn.biological_sex",

        "measurement": {
            "id_measure_type": "",

        }
        
    }
}


from app.base.domain.schemas.base import BaseORMModel

class SchemaBaseFormCondition(BaseORMModel):
    expression: str
    description: str


class SchemaCreateAPIFormCondition(SchemaBaseFormCondition):
    id_form: int