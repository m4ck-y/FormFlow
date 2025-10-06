from pydantic import BaseModel, Field
from typing import List, Union
from app.question.domain.enum.conditional import EConditionalOperator, EConditionalType

class SchemaConditionRule(BaseModel):
    """Regla individual para evaluación condicional"""
    id_question: int = Field(..., description="ID de la pregunta a evaluar", example=8)
    operator: EConditionalOperator = Field(..., description="Operador de comparación", example=EConditionalOperator.GREATER_EQUAL)
    value: Union[int, float, str] = Field(..., description="Valor a comparar", example=2)

class SchemaCondition(BaseModel):
    """Objeto conditional para lógica de mostrar/ocultar preguntas"""
    type: EConditionalType = Field(..., description="Tipo de evaluación lógica", example=EConditionalType.ALL)
    rules: List[Union[SchemaConditionRule, "SchemaCondition"]] = Field(..., description="Lista de reglas a evaluar (permite anidación)", examples=[SchemaConditionRule(id_question=8, operator=EConditionalOperator.GREATER_EQUAL, value=2),{"id_question": 8, "operator": ">", "value": 2}])


"""
{
  "type": "all",
  "rules": [
    {
      "id_question": 8,
      "operator": ">=",
      "value": 2
    },
    {
      "type": "any",
      "rules": [
        {
          "id_question": 5,
          "operator": "==",
          "value": "yes"
        },
        {
          "id_question": 6,
          "operator": "<",
          "value": 10
        }
      ]
    }
  ]
}
"""