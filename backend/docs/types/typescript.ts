// Tipo de dato de salida (valor calculado)
type DataType = "number" | "string" | "boolean" | "date";

// Clasificación de tipo de expresión
type ExpressionType =
  | "math"
  | "logic"
  | "comparison"
  | "aggregate"
  | "collection"
  | "time"; // 🟢 Agregado para operaciones temporales

// Operadores matemáticos
type MathOperator = "+" | "-" | "*" | "/" | "%" | "^";

// Operadores de comparación
type ComparisonOperator = "==" | "!=" | ">" | "<" | ">=" | "<=";

// Operadores lógicos
type LogicOperator = "and" | "or" | "not";

// Funciones agregadas
type AggregateOperator = "sum" | "avg" | "min" | "max" | "count";

// Operadores de colección booleanos
type CollectionOperator = "all" | "any" | "none";

// Operadores relacionados con tiempo 🟢
type TimeOperator = "range" | "movingavg" | "delta"; // ejemplo de otros operadores temporales

// Operador unificado (puedes usar este si quieres simplificar)
type Operator =
  | MathOperator
  | ComparisonOperator
  | LogicOperator
  | AggregateOperator
  | CollectionOperator
  | TimeOperator; // 🟢 Incluido operador temporal

// Selector para sujetos
type SubjectSelector = "id" | "group" | "all" | "custom";

interface SubjectReference {
  entity: string; // e.g. "person", "question", etc.
  property: string; // e.g. "weight", "value", etc.
  selector?: SubjectSelector;
  id?: number | string;
  group?: string;
}

// Para valores literales simples
interface OperandLiteral {
  value: number | string | boolean | Date | TimeRangeValue; // 🟢 Permitimos TimeRangeValue aquí para fechas relativas/absolutas
  data_type: DataType;
}

// 🟢 Tipado para rangos de tiempo (start/end pueden ser relativos o absolutos)
interface TimeRangeValue {
  start: RelativeOrAbsoluteDate;
  end: RelativeOrAbsoluteDate | null;
}

// 🟢 Soporte para fecha relativa (ej: "-10Y") o fecha absoluta ISO string
type RelativeOrAbsoluteDate =
  | { relative: string } // ej: "-10Y", "NOW", "-6M"
  | { absolute: string }; // ISO 8601, ej: "2015-10-05T00:00:00Z"

interface SubjectReference {
  entity: string; // e.g. "person", "question", etc.
  property: string; // e.g. "weight", "value", etc.
  selector?: SubjectSelector;
  id?: number | string;
  group?: string;
}

interface OperandSubject {
  subject: SubjectReference;
}

interface OperandExpression {
  expression: {
    type: ExpressionType;
    operator: Operator;
  };
  args: CalculationOperand[];
}

type CalculationOperand = OperandSubject | OperandLiteral | OperandExpression;

interface Calculation {
  expression: {
    type: ExpressionType;
    operator: Operator;
  };
  args: CalculationOperand[];
  output_data_type: DataType;
}

const imcFormulaString = "person.weight / (person.height ^ 2)";

const imcCalculation: Calculation = {
  expression: {
    type: "math",
    operator: "/",
  },
  args: [
    // Peso (numerador)
    {
      subject: {
        entity: "person",
        property: "weight",
      },
    },
    // Altura ^ 2 (denominador)
    {
      expression: {
        type: "math",
        operator: "^",
      },
      args: [
        {
          subject: {
            entity: "person",
            property: "height",
          },
        },
        {
          value: 2,
          data_type: "number",
        },
      ],
    },
  ],
  output_data_type: "number",
};

const totalScoreCalculation: Calculation = {
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

const avg_weight_person: Calculation = {
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
          value: {
            start: {
              relative: "-10Y",
            },
            end: {
              relative: "NOW",
            },
          },
          data_type: "date",
        },
      ],
    },
  ],
  output_data_type: "number",
};