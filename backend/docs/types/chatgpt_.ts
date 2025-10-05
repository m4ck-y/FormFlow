type Operator = ">=" | ">" | "<=" | "<" | "==" | "!=";

type CalculationType = "sum" | "average" | "multiply" | "custom";

type OutputType = "value" | "condition";

type SelectorType = "all" | "group" | "range" | "custom" | "id";

interface SubjectBase {
  entity: string; // ej: "question", "form"
  property: string; // ej: "value", "calculation_result"
}

interface SubjectById extends SubjectBase {
  selector?: "id"; // explícito, o puede omitirse para default id
  id: number;
}

interface SubjectByGroup extends SubjectBase {
  selector: "group";
  group: string;
}

interface SubjectByRange extends SubjectBase {
  selector: "range";
  id_range: [number, number];
}

interface SubjectAll extends SubjectBase {
  selector: "all";
}

interface SubjectCustom extends SubjectBase {
  selector: "custom";
  filter: Record<string, any>; // filtro flexible según la lógica
}

type Subject =
  | SubjectById
  | SubjectByGroup
  | SubjectByRange
  | SubjectAll
  | SubjectCustom;

interface CalculationFormula {
  type: CalculationType;
  subjects: Subject[];
  output: OutputType;
  operator?: Operator; // requerido si output es "condition"
  value?: number | string; // requerido si output es "condition"
  data_type: "number" | "string" | "boolean"; // para manejo correcto del dato
}

interface Conditional {
  subject: Subject;
  operator: Operator;
  value: number | string | boolean;
  data_type: "number" | "string" | "boolean";
}

interface Question {
  id: number;
  type: string; // ejemplo: "numeric", "text", etc.
  value?: number | string | boolean; // valor de respuesta o calculado
  calculation?: CalculationFormula; // fórmula para autocalcular valor en esta pregunta
  conditional?: Conditional; // condición para mostrar/habilitar la pregunta
}

interface Form {
  id: number;
  questions: Question[];
  calculation?: CalculationFormula; // fórmula para calcular valor global del formulario
  conditional?: Conditional; // condición para activar o mostrar el formulario
}

const form_example = {
  id: 1,
  questions: [
    {
      id: 101,
      type: "numeric",
      value: 5,
    },
    {
      id: 102,
      type: "numeric",
      value: 7,
    },
    {
      id: 103,
      type: "numeric",
      calculation: {
        type: "sum",
        subjects: [
          {
            entity: "question",
            property: "value",
            selector: "range",
            id_range: [101, 102],
          },
        ],
        output: "value",
        data_type: "number",
      },
    },
    {
      id: 104,
      type: "text",
      value: "Sólo si suma > 10",
      conditional: {
        subject: {
          entity: "question",
          property: "value",
          selector: "id",
          id: 103,
        },
        operator: ">",
        value: 10,
        data_type: "number",
      },
    },
  ],
  calculation: {
    type: "average",
    subjects: [
      {
        entity: "question",
        property: "value",
        selector: "all",
      },
    ],
    output: "value",
    data_type: "number",
  },
  conditional: {
    subject: {
      entity: "question",
      property: "value",
      selector: "id",
      id: 103,
    },
    operator: ">=",
    value: 10,
    data_type: "number",
  },
};
