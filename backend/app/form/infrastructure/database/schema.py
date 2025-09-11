from app.utils.database.table_name import TableName
class SchemaForm:
    NAME = "form"

    TBL_FORM = TableName(None, "form")
    TBL_ESTIMATED_DURATION = TableName(NAME, "estimated_duration")

    TBL_TARGET_AGE_GROUP = TableName(NAME, "target_age_group")
    TBL_AGE_GROUP = TableName(NAME, "age_group")

    TBL_TARGET_SEX = TableName(NAME, "target_sex")
    TBL_REFERENCE = TableName(NAME, "reference")
    TBL_WHAT_IT_EVALUATE = TableName(NAME, "what_it_evaluate")

    TBL_FORM_CATEGORY = TableName(NAME, "form_category")
    TBL_CATEGORY = TableName(NAME, "category")

    TBL_FORM_CONDITION = TableName(NAME, "form_condition")