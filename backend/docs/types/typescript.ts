/**
 * El objetivo de este esquema es definir una estructura tipada y flexible para representar expresiones y cálculos complejos
 * sobre datos de distintas entidades (como personas, preguntas, etc.), incluyendo soporte para operadores matemáticos,
 * lógicos, comparativos, agregados, colecciones y temporales.
 *
 * Esto permite modelar fórmulas y consultas dinámicas que pueden involucrar valores constantes, referencias a sujetos específicos,
 * expresiones anidadas y rangos de tiempo con fechas relativas (ejemplo: "-10Y") o absolutas (fechas ISO 8601).
 *
 * Este esquema de tipos está diseñado para representar expresiones calculadas en un sistema de análisis o motor de reglas,
 * facilitando la construcción de cálculos complejos sobre datos estructurados.
 * Cada expresión está compuesta por operadores específicos (como sumas, promedios, comparaciones o rangos temporales) y operandos
 * que pueden ser constantes, referencias a propiedades de sujetos o incluso sub-expresiones anidadas.
 *
 * Además, se incluye soporte explícito para operaciones temporales mediante rangos de tiempo, lo cual es crucial para analizar
 * datos históricos o realizar cálculos dinámicos basados en ventanas temporales.
 *
 * Este esquema permite, por ejemplo, calcular índices biométricos, sumar valores de colecciones o promediar pesos en un rango
 * temporal determinado, de forma tipada y estructurada, lo que facilita la validación y ejecución confiable de las expresiones definidas.
 */

/**
 * Estructura del esquema para formularios y preguntas:
 * 
 * - `form`: Representa un formulario que contiene una lista de preguntas.
 *   - `id`: Identificador único del formulario.
 *   - `list_questions`: Lista de preguntas que forman parte del formulario.
 * 
 * - `question`: Representa una pregunta dentro de un formulario.
 *   - `id`: Identificador único de la pregunta.
 *   - `type`: Tipo de la pregunta (puede ser de selección múltiple, abierta, etc.).
 *   - `text`: El texto o enunciado de la pregunta.
 *   - `order`: El orden en el que aparece la pregunta en el formulario.
 *   - `list_options`: Opciones posibles (si aplica) para la respuesta de la pregunta.
 *   - `conditions`: Condiciones adicionales para la pregunta, representadas por una expresión matemática o lógica (usando `OperandExpression`).
 */


// Tipo de dato que puede tener el resultado de una expresión calculada
type DataType = "number" | "string" | "boolean" | "date" | "array_string" | "array_number" | "array_object";

// Tipo de datos de salida para el selector 🎯
type SelectorOutputType = "array_string" | "array_number" | "array_object"; // 📢 *Nuevo tipo agregado* 🎯

// Operadores matemáticos soportados en expresiones
type MathOperator = { 
  type: "math", 
  operator: "+" | "-" | "*" | "/" | "%" | "^"  // suma, resta, multiplicación, división, módulo, potencia
};

// Operadores de comparación soportados
type ComparisonOperator = { 
  type: "comparison", 
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "in" // igual, distinto, mayor, menor, mayor o igual, menor o igual , *IN* agregado
};

// Operadores lógicos para combinar expresiones booleanas
type LogicOperator = { 
  type: "logic", 
  operator: "and" | "or" | "not"  // conjunción, disyunción, negación
};

// Operadores de agregación que operan sobre conjuntos de datos o colecciones
type AggregateOperator = { 
  type: "aggregate", 
  operator: "sum" | "avg" | "min" | "max" | "count"  // suma, promedio, mínimo, máximo, conteo
};

// Operadores para evaluar condiciones sobre colecciones o listas de elementos
type CollectionOperator = { 
  type: "collection", 
  operator: "all" | "any" | "none"  // todos cumplen, alguno cumple, ninguno cumple
};

// Operadores específicos para manejo de datos temporales o series de tiempo
type TimeOperator = { 
  type: "time", 
  operator: "range" | "movingavg" | "delta"  // rango temporal, promedio móvil, diferencia/variación
};

// Unión de todos los operadores posibles para una expresión
type Operator =
  | MathOperator
  | ComparisonOperator
  | LogicOperator
  | AggregateOperator
  | CollectionOperator
  | TimeOperator;


interface SubjectSelectorCondition extends OperandExpression{
  property: string; //propiedad a comparar
}
// Selector para sujetos
type SubjectSelector = "group" | "all" | SubjectSelectorCondition;  // 📢 *Nuevo tipo de selector agregado* 🎯


// Representa un operando que es un valor constante literal
interface OperandConst {
  const: {
    value: number | string | boolean | Date | number[] | string[]; // Valor constante (numérico, texto, booleano o fecha)
    data_type: DataType;                    // Tipo de dato del valor constante
  };
}

// Representa un rango de tiempo con inicio y fin, que pueden ser fechas relativas o absolutas
interface TimeRangeValue {
  start: RelativeOrAbsoluteDate;       // Fecha de inicio (relativa o absoluta)
  end: RelativeOrAbsoluteDate | null;  // Fecha de fin (relativa, absoluta o indefinida)
}

// Tipo para representar una fecha que puede ser relativa o absoluta
type RelativeOrAbsoluteDate =
  | { relative: string } // Fecha relativa, ej: "-10Y" (hace 10 años), "NOW", "-6M" (hace 6 meses)
  | { absolute: string }; // Fecha absoluta en formato ISO 8601, ej: "2015-10-05T00:00:00Z"

// Operando que representa un rango de tiempo con fechas de inicio y fin
interface OperandTimeRange {
  time_range: {
    start: RelativeOrAbsoluteDate;       // Fecha de inicio del rango (relativa o absoluta)
    end: RelativeOrAbsoluteDate | null;  // Fecha de fin del rango (relativa, absoluta o indefinida)
  };
}

// Referencia a un sujeto del que se extrae un valor, como "persona" o "pregunta"
interface SubjectReference {
  entity: string;             // Nombre de la entidad, ej: "person", "question"
  property: string;           // Propiedad específica del sujeto, ej: "weight", "value"
  selector?: SubjectSelector; // Selector para filtrar sujeto(s), ej: "all", "custom [cuando se ocupe el subjectSelector]"
  group?: string;             // Grupo al que pertenece (opcional)
  output_data_type?: SelectorOutputType; // Tipo de dato que produce el sujeto
}

// Operando que refiere a un sujeto específico para obtener su valor
interface OperandSubject {
  subject: SubjectReference;
}


// Unión de todos los posibles operandos que puede tener una expresión/calculación
type CalculationOperand = 
  | OperandSubject       // Referencia a un sujeto
  | OperandConst         // Valor constante literal
  | OperandExpression    // Expresión anidada
  | OperandTimeRange;    // Rango de tiempo para datos temporales

// Operando que representa una expresión compuesta con operador y argumentos
export interface OperandExpression {
  expression: Operator;            // Operador que se aplica (math, logic, aggregate, etc.)
  args: CalculationOperand[];     // Argumentos o sub-operandos de la expresión
  output_data_type: DataType;     // Tipo de dato que produce la expresión
}

const imcFormulaString = "person.weight / (person.height ^ 2)";

const imcCalculation: OperandExpression = {
  "expression": {
    "type": "math",
    "operator": "/",
  },
  "args": [
    {
      "subject": {
        "entity": "person",
        "property": "weight"
      }
    },
    {
      "output_data_type": "number",
      "expression": {
        "type": "math",
        "operator": "^",
      },
      "args": [
        {
          "subject": {
            "entity": "person",
            "property": "height"
          }
        },
        {
          "const": {
            "value": 2,
            "data_type": "number"
          }
        }
      ]
    }
  ],
  "output_data_type": "number"
}

const totalScoreCalculation: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "sum",
  },
  args: [
    {
      subject: {
        entity: "question",
        property: "value",
        selector: "all", // todas las preguntas
      },
    },
  ],
  output_data_type: "number",
};

const avg_weight_person_str =
  'avg(timeRange(person.weight, { start: "-10Y", end: "NOW" }))';

const avg_weight_person: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "avg",
  },
  args: [
    {
      expression: {
        type: "time",
        operator: "range",
      },
      args: [
        {
          subject: {
            entity: "person",
            property: "weight",
          },
        },
        {
          time_range: {
            start: {
              relative: "-10Y",
            },
            end: {
              relative: "NOW",
            },
          }
        },
      ],
      output_data_type: "number",
    },
  ],
  output_data_type: "number",
};