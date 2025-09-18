from app.utils.database.table_name import TableName
from app.form.infrastructure.database.schema import SchemaForm
class SchemaAssignment:
    NAME = SchemaForm.NAME

    #1
    TBL_RESPONSE = TableName(NAME, "response")
    TBL_ASSIGNMENT = TableName(NAME, "assignment")

    #2
    TBL_ANSWER = TableName(NAME, "answer") # (id_response)
    TBL_DIRECT_RESPONSE = TableName(NAME, "direct_response")
    TBL_SCHEDULED = TableName(NAME, "scheduled")

    #3
    TBL_RESPONSES_SCHEDULED = TableName(NAME, "responses_scheduled")

