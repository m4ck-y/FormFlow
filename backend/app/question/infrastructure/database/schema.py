from app.utils.database.table_name import TableName
from app.form.infrastructure.database.schema import SchemaForm

class SchemaQuestion:

    NAME = SchemaForm.NAME

    TBL_OPTION = TableName(NAME, "option")
    TBL_CONDITIONAL_LOGIC = TableName(NAME, "conditional_logic")

    TBL_QUESTIONS_FORM = TableName(NAME, "form_questions")
    TBL_QUESTIONS_SECTION = TableName(NAME, "section_questions")
    TBL_QUESTION = TableName(NAME, "question")


    TBL_URL = TableName(NAME, "url")
