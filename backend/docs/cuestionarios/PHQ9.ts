import { OperandExpression } from "../types/typescript";
df_
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


const my_new_schema_expression: OperandExpression = {
  expression: {
    type: "collection",
    operator: "any",
  },
  args: [
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 1,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 2,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 3,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 4,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 5,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 6,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 7,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 8,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
    {
      expression: {
        type: "logic",
        operator: "and",
      },
      args: [
        {
          expression: {
            type: "comparison",
            operator: "==",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "id",
              },
            },
            {
              const: {
                value: 9,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
        {
          expression: {
            type: "comparison",
            operator: ">",
          },
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
              },
            },
            {
              const: {
                value: 0,
                data_type: "number",
              },
            },
          ],
          output_data_type: "boolean",
        },
      ],
      output_data_type: "boolean",
    },
  ],
  output_data_type: "boolean",
}
// nueva propuesta

const condition_phq9_with_selector: OperandExpression = {
    expression: {
        type: "collection",  // Operador de colección
        operator: "all",  // `all` significa que todas las condiciones deben ser verdaderas
    },

    args: [
        {
            expression: {
                type: "comparison",  // Operación de comparación
                operator: ">",  // Operador "mayor que" para la propiedad "value"
            },
            args: [
                {
                    subject: {
                        entity: "question",
                        property: "value",  // Queremos la propiedad "value"
                        selector: {
                            property: "id",  // Selección basada en "id"
                            expression: {
                                type: "comparison",  // Operación de comparación dentro del selector
                                operator: "in",  // Operador "in"
                            },
                            args: [
                                {
                                    const: {
                                        value: [1, 2, 3, 4, 5, 6, 7, 8, 9],  // Los ids que estamos comparando
                                        data_type: "array_number",  // Especificamos que es un array de números
                                    },
                                },
                            ],
                            output_data_type: "array_number",  // El resultado del selector es un array de números
                        },
                    },
                },
                {
                    const: {
                        value: 0,  // Comparamos si "value" es mayor que 0
                        data_type: "number",  // El valor constante es un número
                    },
                },
            ],
            output_data_type: "boolean",  // El resultado de la comparación es un valor booleano
        },
    ],
    output_data_type: "boolean",  // El resultado total es un valor booleano
};
