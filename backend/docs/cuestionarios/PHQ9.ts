import { OperandExpression } from "../types/typescript";

var puntuacion = "sum(answers.values)";

var interpretacion = `switch(
  (puntuacion < 5, 'Depresion minima'),
  (puntuacion < 10, 'Deprecion leve'),
  (puntuacion < 15, 'Depresion moderada'),
  (puntuacion < 20, 'Depresion moderadamente severa'),
  (puntuacion <= 27, 'Depresion severa')
  )`;


//CRAFFT
//IPAQ




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
