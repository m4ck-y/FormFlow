from app.utils.database.table_name import TableName
from app.form.infrastructure.database.schema import SchemaForm

class SchemaSection:

    NAME = SchemaForm.NAME

    TBL_SECTION = TableName(NAME, "section")