from pydantic import BaseModel
from domain.enum.comparison_operator import EComparisonOperator
from typing import List

class SchemaConditionalLogic(BaseModel):
    triggered_by_question_id: int
    expected_answer_ids: List[int]
    comparison_operator: EComparisonOperator
    description: str
