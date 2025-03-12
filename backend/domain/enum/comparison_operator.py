from pydantic import BaseModel

class EComparisonOperator(BaseModel):
    EQUAL = "=="
    NOT_EQUAL = "!="
    AND = "&&"
    GREATER_THAN = ">"
    LESS_THAN = "<"
    GREATER_THAN_EQUAL = ">="
    LESS_THAN_EQUAL = "<="