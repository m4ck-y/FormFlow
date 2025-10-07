import { OperandExpression } from "../types/typescript";

var puntuacion_str = "sum(answers.values)";

//calcular el puntaje de un formulario (o de una asignación específica)
var puntuacion_sql = `SELECT SUM((answer->>'value')::numeric) AS puntuacion
FROM answers
WHERE id_assignment = 123
  AND answer->>'type' = 'number';
`

//mejora esto aplicando las entidades correspondientes
const puntiacion_expression: OperandExpression = { //where id_form
  expression: {
    type: "aggregate",
    operator: "avg",  // Promedio en lugar de suma
    args: [
      {
        subject: {
          entity: "answer",
          property: "value",
          selector: "all"
        }
      }
    ],
    output_data_type: "number"
  }
};


// ===== INTERPRETACIÓN PHQ-9 CON OPERADOR CONDICIONAL =====

var interpretacion_str = `switch(
  (puntuacion < 5, 'Depresion minima'),
  (puntuacion < 10, 'Deprecion leve'),
  (puntuacion < 15, 'Depresion moderada'),
  (puntuacion < 20, 'Depresion moderadamente severa'),
  (puntuacion <= 27, 'Depresion severa')
  )`;


var interpretacion_sql = `SELECT 
  CASE 
    WHEN puntuacion < 5 THEN 'Depresion minima'
    WHEN puntuacion < 10 THEN 'Depresion leve'
    WHEN puntuacion < 15 THEN 'Depresion moderada'
    WHEN puntuacion < 20 THEN 'Depresion moderadamente severa'
    WHEN puntuacion <= 27 THEN 'Depresion severa'
    ELSE 'Valor fuera de rango'
  END AS interpretacion
FROM form_response;`

// Interpretación de puntuación PHQ-9 usando CaseOperator
const phq9Interpretation: OperandExpression = {
  expression: {
    type: "case",
    operator: "when",
    subject: {
      // Sujeto: puntuación total del PHQ-9 (evaluado una sola vez)
      expression: {
        type: "aggregate",
        operator: "sum",
        args: [
          {
            subject: {
              entity: "question",
              property: "value",
              selector: "all"  // Suma de todas las respuestas
            }
          }
        ],
        output_data_type: "number"
      }
    },
    cases: [
      {
        // WHEN puntuacion < 5 THEN "Depresión mínima"
        when: {
          operator: "<",
          operand: { const: { value: 5, data_type: "number" } }
        },
        then: { const: { value: "Depresión mínima", data_type: "string" } }
      },
      {
        // WHEN puntuacion < 10 THEN "Depresión leve"
        when: {
          operator: "<",
          operand: { const: { value: 10, data_type: "number" } }
        },
        then: { const: { value: "Depresión leve", data_type: "string" } }
      },
      {
        // WHEN puntuacion < 15 THEN "Depresión moderada"
        when: {
          operator: "<",
          operand: { const: { value: 15, data_type: "number" } }
        },
        then: { const: { value: "Depresión moderada", data_type: "string" } }
      },
      {
        // WHEN puntuacion < 20 THEN "Depresión moderadamente severa"
        when: {
          operator: "<",
          operand: { const: { value: 20, data_type: "number" } }
        },
        then: { const: { value: "Depresión moderadamente severa", data_type: "string" } }
      },
      {
        // WHEN puntuacion <= 27 THEN "Depresión severa"
        when: {
          operator: "<=",
          operand: { const: { value: 27, data_type: "number" } }
        },
        then: { const: { value: "Depresión severa", data_type: "string" } }
      }
    ],
    default: { const: { value: "Puntuación fuera de rango", data_type: "string" } },
    output_data_type: "string",  // La interpretación es un string
    args: [] // Requerido por BaseOperator pero no usado en CaseOperator
  }
};


//condition question number 10
const condition_phq9_my_str = "all(["
  + "(question.id == 1 and question.value > 0), "
  + "(question.id == 2 and question.value > 0), "
  + "(question.id == 3 and question.value > 0), "
  + "(question.id == 4 and question.value > 0), "
  + "(question.id == 5 and question.value > 0), "
  + "(question.id == 6 and question.value > 0), "
  + "(question.id == 7 and question.value > 0), "
  + "(question.id == 8 and question.value > 0), "
  + "(question.id == 9 and question.value > 0)"
  + "])";
const condition_phq9_my_str_with_selector = "all([selector(question, id, in[1,2,3,4,5,6,7,8,9]), value > 0])";
//const condition_phq9_pandas = df_questions[(df_questions['id'].isin([1, 2, 3, 4, 5, 6, 7, 8, 9])) & (df_questions['value'] > 0)]
const condition_phq9_sql = `SELECT EXISTS (
    SELECT 1
    FROM question
    WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9)
      AND value > 0
) AS cumple_condicion;`


// ===== VERSIÓN VERBOSA (ACTUALIZADA CON NUEVA ESTRUCTURA) =====
const my_new_schema_expression: OperandExpression = {
  expression: {
    type: "collection",
    operator: "any",  // Al menos UNA pregunta debe tener valor > 0
    args: [
      // Pregunta 1: ¿id == 1 AND value > 0?
      {
        expression: {
          type: "logic",
          operator: "and",
          args: [
            {
              expression: {
                type: "comparison",
                operator: "==",
                args: [
                  { subject: { entity: "question", property: "id" } },
                  { const: { value: 1, data_type: "number" } }
                ],
                output_data_type: "boolean"
              }
            },
            {
              expression: {
                type: "comparison",
                operator: ">",
                args: [
                  { subject: { entity: "question", property: "value" } },
                  { const: { value: 0, data_type: "number" } }
                ],
                output_data_type: "boolean"
              }
            }
          ],
          output_data_type: "boolean"
        }
      },
      // Pregunta 2: ¿id == 2 AND value > 0?
      {
        expression: {
          type: "logic",
          operator: "and",
          args: [
            {
              expression: {
                type: "comparison",
                operator: "==",
                args: [
                  { subject: { entity: "question", property: "id" } },
                  { const: { value: 2, data_type: "number" } }
                ],
                output_data_type: "boolean"
              }
            },
            {
              expression: {
                type: "comparison",
                operator: ">",
                args: [
                  { subject: { entity: "question", property: "value" } },
                  { const: { value: 0, data_type: "number" } }
                ],
                output_data_type: "boolean"
              }
            }
          ],
          output_data_type: "boolean"
        }
      },
      // Preguntas 3-9 (patrón similar)...
      {
        expression: {
          type: "logic",
          operator: "and",
          args: [
            {
              expression: {
                type: "comparison",
                operator: "==",
                args: [
                  { subject: { entity: "question", property: "id" } },
                  { const: { value: 3, data_type: "number" } }
                ],
                output_data_type: "boolean"
              }
            },
            {
              expression: {
                type: "comparison",
                operator: ">",
                args: [
                  { subject: { entity: "question", property: "value" } },
                  { const: { value: 0, data_type: "number" } }
                ],
                output_data_type: "boolean"
              }
            }
          ],
          output_data_type: "boolean"
        }
      },
      // ... (continúa para preguntas 4-9 con el mismo patrón)
    ],
    output_data_type: "boolean"
  }
}
// nueva propuesta

// ===== VERSIÓN OPTIMIZADA CON SELECTOR (NUEVA ESTRUCTURA) =====
const condition_phq9_with_selector: OperandExpression = {
  expression: {
    type: "collection",  // Operador de colección para evaluar múltiples elementos
    operator: "any",  // `any` = al menos UNA pregunta debe tener valor > 0 (lógica médica PHQ-9)
    args: [
      {
        expression: {
          type: "comparison",  // Comparación: verificar si el valor de las preguntas es mayor que 0
          operator: ">",  // Operador "mayor que" - busca síntomas reportados (value > 0)
          args: [
            {
              subject: {
                entity: "question",  // Entidad: preguntas del formulario PHQ-9
                property: "value",  // Propiedad: valor de respuesta de cada pregunta (0-3 en PHQ-9)
                selector: {
                  property: "id",  // Selector: filtrar preguntas por su ID
                  expression: {
                    type: "comparison",  // Comparación dentro del selector
                    operator: "in",  // Operador "in" - verificar si el ID está en la lista
                    args: [
                      {
                        const: {
                          value: [1, 2, 3, 4, 5, 6, 7, 8, 9],  // IDs de las 9 preguntas principales del PHQ-9
                          data_type: "array_number",  // Tipo: array de números (IDs de preguntas)
                        },
                      },
                    ],
                    output_data_type: "boolean",  // El resultado de la comparación "in"
                  },
                  output_data_type: "array_number",  // Resultado del selector: array de valores numéricos
                },
              },
            },
            {
              const: {
                value: 0,  // Umbral: comparar contra 0 (sin síntomas vs con síntomas)
                data_type: "number",  // Tipo: número entero
              },
            },
          ],
          output_data_type: "boolean",  // Resultado: true si alguna pregunta tiene síntomas (value > 0)
        },
      },
    ],
    output_data_type: "boolean",  // Resultado final: true = mostrar pregunta 10, false = ocultarla
  }
};
