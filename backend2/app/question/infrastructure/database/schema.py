from app.utils.database.table_name import TableName
from app.form.infrastructure.database.schema import SchemaForm

class SchemaQuestion:

    NAME = SchemaForm.NAME

    TBL_ANSWER = TableName(NAME, "answer")
    TBL_CONDITIONAL_LOGIC = TableName(NAME, "conditional_logic")

    TBL_QUESTIONS_FORM = TableName(NAME, "questions_form")
    TBL_QUESTIONS_SECTION = TableName(NAME, "questions_section")
    TBL_QUESTION = TableName(NAME, "question")


    TBL_URL = TableName(NAME, "url")
