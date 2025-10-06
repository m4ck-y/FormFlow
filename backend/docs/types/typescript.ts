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


// ===== TIPOS BASE Y PRIMITIVOS =====

// Tipo de dato que puede tener el resultado de una expresión calculada
type DataType = "number" | "string" | "boolean" | "date" | "array_string" | "array_number" | "array_object";

// Tipo de datos de salida para el selector
type SelectorOutputType = "array_string" | "array_number" | "array_object";

// ===== ESTRUCTURA BASE PARA OPERADORES =====

// Interfaz base que comparten todos los operadores
interface BaseOperator {
  type: string;
  operator: string;
  args: CalculationOperand[];     // Argumentos específicos del operador
  output_data_type: DataType;     // Tipo de dato que produce este operador
}

// ===== OPERADORES ESPECÍFICOS (EXTIENDEN BASE) =====

// Operadores matemáticos soportados en expresiones
interface MathOperator extends BaseOperator {
  type: "math";
  operator: "+" | "-" | "*" | "/" | "%" | "^";  // suma, resta, multiplicación, división, módulo, potencia
  args: CalculationOperand[];     // Operandos para la operación matemática (ej: [a, b] para a + b)
  output_data_type: "number";     // Las operaciones matemáticas siempre producen números
}

// Operadores de comparación soportados
interface ComparisonOperator extends BaseOperator {
  type: "comparison";
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "in"; // igual, distinto, mayor, menor, mayor o igual, menor o igual, *IN* agregado
  args: CalculationOperand[];     // Operandos para comparar (ej: [left, right] para left > right)
  output_data_type: "boolean";    // Las comparaciones siempre producen booleanos
}

// Operadores lógicos para combinar expresiones booleanas
interface LogicOperator extends BaseOperator {
  type: "logic";
  operator: "and" | "or" | "not";  // conjunción, disyunción, negación
  args: CalculationOperand[];     // Expresiones booleanas a combinar (ej: [expr1, expr2] para expr1 AND expr2)
  output_data_type: "boolean";    // Las operaciones lógicas siempre producen booleanos
}

// Operadores de agregación que operan sobre conjuntos de datos o colecciones
interface AggregateOperator extends BaseOperator {
  type: "aggregate";
  operator: "sum" | "avg" | "min" | "max" | "count";  // suma, promedio, mínimo, máximo, conteo
  args: CalculationOperand[];     // Colección de valores a agregar
  output_data_type: "number";     // Las agregaciones numéricas siempre producen números
}

// Operadores para evaluar condiciones sobre colecciones o listas de elementos
interface CollectionOperator extends BaseOperator {
  type: "collection";
  operator: "all" | "any" | "none";  // todos cumplen, alguno cumple, ninguno cumple
  args: CalculationOperand[];     // Condiciones a evaluar sobre la colección
  output_data_type: "boolean";    // Las evaluaciones de colección siempre producen booleanos
}

// Operadores específicos para manejo de datos temporales o series de tiempo
interface TimeOperator extends BaseOperator {
  type: "time";
  operator: "range" | "movingavg" | "delta";  // rango temporal, promedio móvil, diferencia/variación
  args: CalculationOperand[];     // Datos temporales y parámetros de tiempo
  output_data_type: "number" | "array_number"; // Puede producir un número o array según la operación
}

// Unión de todos los operadores posibles para una expresión
type Operator =
  | MathOperator
  | ComparisonOperator
  | LogicOperator
  | AggregateOperator
  | CollectionOperator
  | TimeOperator;


// ===== SELECTORES Y CONDICIONES =====

// Condición de selector que extiende expresión con propiedad específica
interface SubjectSelectorCondition extends OperandExpression {
  property: string; // Propiedad a comparar en el selector
}

// Selector para sujetos (tipos predefinidos o condición personalizada)
type SubjectSelector = "group" | "all" | SubjectSelectorCondition;

// ===== HELPERS Y TIPOS DE UTILIDAD =====

// Helper para crear constantes numéricas de forma más concisa
interface NumericConstant extends OperandConst {
  const: {
    value: number;
    data_type: "number";
  };
}

// Helper para crear constantes de array de números
interface NumericArrayConstant extends OperandConst {
  const: {
    value: number[];
    data_type: "array_number";
  };
}

// Helper para referencias simples a preguntas (caso común)
interface QuestionReference extends OperandSubject {
  subject: {
    entity: "question";
    property: "value" | "id";
    selector?: SubjectSelector;
  };
}


// ===== ESTRUCTURAS BASE PARA OPERANDOS =====

// Interfaz base para todos los operandos que tienen tipo de salida
interface BaseOperand {
  output_data_type?: DataType;  // Tipo de dato que produce el operando (opcional para algunos casos)
}

// ===== TIPOS PARA FECHAS Y TIEMPO =====

// Tipo para representar una fecha que puede ser relativa o absoluta
type RelativeOrAbsoluteDate =
  | { relative: string } // Fecha relativa, ej: "-10Y" (hace 10 años), "NOW", "-6M" (hace 6 meses)
  | { absolute: string }; // Fecha absoluta en formato ISO 8601, ej: "2015-10-05T00:00:00Z"

// Estructura base para rangos de tiempo (reutilizable)
interface BaseTimeRange {
  start: RelativeOrAbsoluteDate;       // Fecha de inicio (relativa o absoluta)
  end: RelativeOrAbsoluteDate | null;  // Fecha de fin (relativa, absoluta o indefinida)
}

// ===== OPERANDOS ESPECÍFICOS =====

// Representa un operando que es un valor constante literal
interface OperandConst extends BaseOperand {
  const: {
    value: number | string | boolean | Date | number[] | string[]; // Valor constante (numérico, texto, booleano o fecha)
    data_type: DataType;                    // Tipo de dato del valor constante
  };
}

// Representa un rango de tiempo con inicio y fin (usando la estructura base)
interface TimeRangeValue extends BaseTimeRange {
  // Hereda start y end de BaseTimeRange
}

// Operando que representa un rango de tiempo con fechas de inicio y fin
interface OperandTimeRange extends BaseOperand {
  time_range: BaseTimeRange;  // Usa la estructura base de tiempo
}

// ===== REFERENCIAS A SUJETOS =====

// Estructura base para referencias de entidades
interface BaseEntityReference {
  entity: string;   // Nombre de la entidad, ej: "person", "question"
  property: string; // Propiedad específica del sujeto, ej: "weight", "value"
}

// Referencia completa a un sujeto del que se extrae un valor
interface SubjectReference extends BaseEntityReference {
  selector?: SubjectSelector;            // Selector para filtrar sujeto(s), ej: "all", "custom"
  group?: string;                        // Grupo al que pertenece (opcional)
  output_data_type?: SelectorOutputType; // Tipo de dato que produce el sujeto
}

// Operando que refiere a un sujeto específico para obtener su valor
interface OperandSubject extends BaseOperand {
  subject: SubjectReference;
}


// Unión de todos los posibles operandos que puede tener una expresión/calculación
type CalculationOperand = 
  | OperandSubject       // Referencia a un sujeto
  | OperandConst         // Valor constante literal
  | OperandExpression    // Expresión anidada
  | OperandTimeRange;    // Rango de tiempo para datos temporales

// ===== EXPRESIÓN PRINCIPAL =====

// Operando que representa una expresión compuesta con operador y argumentos
export interface OperandExpression extends BaseOperand {
  expression: Operator;            // Operador que se aplica (contiene args y output_data_type internamente)
}

// ===== EJEMPLOS USANDO LAS NUEVAS ESTRUCTURAS =====

const imcFormulaString = "person.weight / (person.height ^ 2)";

const imcCalculation: OperandExpression = {
  expression: {
    type: "math",
    operator: "/",
    args: [
      {
        subject: {
          entity: "person",
          property: "weight"
        }
      } as OperandSubject,
      {
        expression: {
          type: "math",
          operator: "^",
          args: [
            {
              subject: {
                entity: "person",
                property: "height"
              }
            } as OperandSubject,
            {
              const: {
                value: 2,
                data_type: "number"
              }
            } as NumericConstant
          ],
          output_data_type: "number"
        } as MathOperator
      } as OperandExpression
    ],
    output_data_type: "number"
  } as MathOperator
}

const totalScoreCalculation: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "sum",
    args: [
      {
        subject: {
          entity: "question",
          property: "value",
          selector: "all", // todas las preguntas
        },
      } as QuestionReference,
    ],
    output_data_type: "number"
  } as AggregateOperator
};




const avg_weight_person_str =
  'avg(timeRange(person.weight, { start: "-10Y", end: "NOW" }))';

const avg_weight_person: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "avg",
    args: [
      {
        expression: {
          type: "time",
          operator: "range",
          args: [
            {
              subject: {
                entity: "person",
                property: "weight",
              },
            } as OperandSubject,
            {
              time_range: {
                start: { relative: "-10Y" },
                end: { relative: "NOW" },
              } as BaseTimeRange
            } as OperandTimeRange,
          ],
          output_data_type: "array_number"
        } as TimeOperator
      } as OperandExpression,
    ],
    output_data_type: "number"
  } as AggregateOperator
};

// ===== FACTORY FUNCTIONS PARA CASOS COMUNES =====

// Factory para crear comparaciones simples
const createComparison = (
  left: CalculationOperand, 
  operator: ComparisonOperator["operator"], 
  right: CalculationOperand
): OperandExpression => ({
  expression: { 
    type: "comparison", 
    operator,
    args: [left, right],
    output_data_type: "boolean"
  } as ComparisonOperator
});

// Factory para crear operaciones de colección
const createCollectionOperation = (
  operator: CollectionOperator["operator"],
  ...args: CalculationOperand[]
): OperandExpression => ({
  expression: {
    type: "collection",
    operator,
    args,
    output_data_type: "boolean"
  } as CollectionOperator
});

// ===== EJEMPLO MEJORADO CON NUEVA ESTRUCTURA =====

// Ejemplo: Condición PHQ-9 usando la nueva estructura más limpia
const phq9ConditionImproved: OperandExpression = {
  expression: {
    type: "collection",
    operator: "any",
    args: [
      {
        expression: {
          type: "comparison",
          operator: ">",
          args: [
            {
              subject: {
                entity: "question",
                property: "value",
                selector: {
                  property: "id",
                  expression: {
                    type: "comparison",
                    operator: "in",
                    args: [
                      { subject: { entity: "question", property: "id" } } as OperandSubject,
                      { const: { value: [1, 2, 3, 4, 5, 6, 7, 8, 9], data_type: "array_number" } } as NumericArrayConstant
                    ],
                    output_data_type: "boolean"
                  } as ComparisonOperator,
                  output_data_type: "array_number"
                } as SubjectSelectorCondition
              }
            } as OperandSubject,
            { const: { value: 0, data_type: "number" } } as NumericConstant
          ],
          output_data_type: "boolean"
        } as ComparisonOperator
      } as OperandExpression
    ],
    output_data_type: "boolean"
  } as CollectionOperator
};
