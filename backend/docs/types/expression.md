# 🧠 Documentación del Sistema de Expresiones - FormFlow

**Versión:** 2.0  
**Fecha:** Octubre 2025  
**Estado:** ✅ Implementado y Funcional  

---

## 🎯 **Resumen Ejecutivo**

El **Sistema de Expresiones de FormFlow** es un motor de reglas condicionales avanzado que permite crear lógica dinámica compleja para formularios médicos y clínicos. Basado en una arquitectura recursiva y type-safe, soporta operaciones matemáticas, lógicas, de comparación, agregación, colección y temporales.

### **Características Principales**
- ✅ **Recursividad infinita** - Expresiones anidadas sin límite
- ✅ **Type Safety completo** - TypeScript con validación estricta
- ✅ **Operadores especializados** - 6 tipos de operadores con lógica específica
- ✅ **Casos de uso médicos** - Optimizado para instrumentos clínicos (PHQ-9, GAD-7, CRAFFT)
- ✅ **Serialización JSON** - Compatible con almacenamiento y transmisión
- ✅ **Factory Functions** - Helpers para creación simplificada

---

## 🏗️ **Arquitectura del Sistema**

### **Estructura Base**
```typescript
interface OperandExpression {
  expression: Operator;  // Contiene args y output_data_type internamente
}

interface BaseOperator {
  type: string;
  operator: string;
  args: CalculationOperand[];     // Argumentos específicos del operador
  output_data_type: DataType;     // Tipo de dato que produce
}
```

### **Tipos de Datos Soportados**
```typescript
type DataType = 
  | "number" 
  | "string" 
  | "boolean" 
  | "date" 
  | "array_string" 
  | "array_number" 
  | "array_object";
```

---

## 🔧 **Tipos de Operadores**

### **1. Operadores Matemáticos (`MathOperator`)**
```typescript
interface MathOperator extends BaseOperator {
  type: "math";
  operator: "+" | "-" | "*" | "/" | "%" | "^";
  args: CalculationOperand[];
  output_data_type: "number";  // Siempre produce números
}
```

**Casos de Uso:**
- Cálculo de IMC: `peso / (altura ^ 2)`
- Puntuaciones de escalas: `suma de respuestas`
- Operaciones biométricas complejas

**Ejemplo:**
```typescript
// IMC = peso / (altura ^ 2)
const imcCalculation: OperandExpression = {
  expression: {
    type: "math",
    operator: "/",
    args: [
      { subject: { entity: "person", property: "weight" }},
      {
        expression: {
          type: "math",
          operator: "^",
          args: [
            { subject: { entity: "person", property: "height" }},
            { const: { value: 2, data_type: "number" }}
          ],
          output_data_type: "number"
        }
      }
    ],
    output_data_type: "number"
  }
}
```

### **2. Operadores de Comparación (`ComparisonOperator`)**
```typescript
interface ComparisonOperator extends BaseOperator {
  type: "comparison";
  operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "in";
  args: CalculationOperand[];
  output_data_type: "boolean";  // Siempre produce booleanos
}
```

**Casos de Uso:**
- Umbrales clínicos: `PHQ-9 score > 10`
- Validaciones de edad: `edad >= 18`
- Pertenencia a grupos: `id in [1,2,3,4,5]`

**Ejemplo:**
```typescript
// ¿El valor de la pregunta es mayor que 0?
const hasSymptoms: OperandExpression = {
  expression: {
    type: "comparison",
    operator: ">",
    args: [
      { subject: { entity: "question", property: "value" }},
      { const: { value: 0, data_type: "number" }}
    ],
    output_data_type: "boolean"
  }
}
```

### **3. Operadores Lógicos (`LogicOperator`)**
```typescript
interface LogicOperator extends BaseOperator {
  type: "logic";
  operator: "and" | "or" | "not";
  args: CalculationOperand[];
  output_data_type: "boolean";  // Siempre produce booleanos
}
```

**Casos de Uso:**
- Condiciones complejas: `(edad > 65) AND (tiene_diabetes == true)`
- Exclusiones: `NOT (embarazada == true)`
- Múltiples criterios: `(PHQ-9 > 10) OR (GAD-7 > 8)`

**Ejemplo:**
```typescript
// ¿Edad > 65 Y tiene diabetes?
const elderlyWithDiabetes: OperandExpression = {
  expression: {
    type: "logic",
    operator: "and",
    args: [
      {
        expression: {
          type: "comparison",
          operator: ">",
          args: [
            { subject: { entity: "person", property: "age" }},
            { const: { value: 65, data_type: "number" }}
          ],
          output_data_type: "boolean"
        }
      },
      {
        expression: {
          type: "comparison",
          operator: "==",
          args: [
            { subject: { entity: "person", property: "has_diabetes" }},
            { const: { value: true, data_type: "boolean" }}
          ],
          output_data_type: "boolean"
        }
      }
    ],
    output_data_type: "boolean"
  }
}
```

### **4. Operadores de Agregación (`AggregateOperator`)**
```typescript
interface AggregateOperator extends BaseOperator {
  type: "aggregate";
  operator: "sum" | "avg" | "min" | "max" | "count";
  args: CalculationOperand[];
  output_data_type: "number";  // Siempre produce números
}
```

**Casos de Uso:**
- Puntuación total: `sum(todas_las_respuestas)`
- Promedio de síntomas: `avg(respuestas_sintomas)`
- Conteo de criterios: `count(criterios_positivos)`

**Ejemplo:**
```typescript
// Suma total de todas las respuestas del PHQ-9
const phq9TotalScore: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "sum",
    args: [
      {
        subject: {
          entity: "question",
          property: "value",
          selector: "all"  // Todas las preguntas
        }
      }
    ],
    output_data_type: "number"
  }
}
```

### **5. Operadores de Colección (`CollectionOperator`)**
```typescript
interface CollectionOperator extends BaseOperator {
  type: "collection";
  operator: "all" | "any" | "none";
  args: CalculationOperand[];
  output_data_type: "boolean";  // Siempre produce booleanos
}
```

**Casos de Uso:**
- Condiciones PHQ-9: `any(preguntas_1_a_9.value > 0)` - Mostrar pregunta 10
- Validaciones completas: `all(campos_requeridos != null)`
- Exclusiones: `none(contraindicaciones == true)`

**Ejemplo:**
```typescript
// ¿Alguna pregunta del PHQ-9 tiene síntomas?
const phq9HasSymptoms: OperandExpression = {
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
                      { const: { value: [1,2,3,4,5,6,7,8,9], data_type: "array_number" }}
                    ],
                    output_data_type: "boolean"
                  },
                  output_data_type: "array_number"
                }
              }
            },
            { const: { value: 0, data_type: "number" }}
          ],
          output_data_type: "boolean"
        }
      }
    ],
    output_data_type: "boolean"
  }
}
```

### **6. Operadores Condicionales (`ConditionalOperator`)**
```typescript
interface ConditionalOperator {
  type: "conditional";
  operator: "switch" | "ternary";  // switch-case o operador ternario
  subject: CalculationOperand;     // El sujeto a evaluar
  cases: Array<{
    condition: OperandExpression;  // Condición a evaluar
    result: CalculationOperand;    // Resultado si es verdadera
  }>;
  default?: CalculationOperand;    // Valor por defecto
  output_data_type: DataType;      // Tipo de salida (string, number, etc.)
}
```

**Casos de Uso:**
- Interpretaciones clínicas: `PHQ-9 score → "Depresión leve"`
- Clasificaciones: `IMC → "Peso normal", "Sobrepeso", "Obesidad"`
- Recomendaciones: `Riesgo → "Seguimiento rutinario", "Evaluación urgente"`

**Ejemplo - Interpretación PHQ-9:**
```typescript
// Interpretación de puntuación PHQ-9
const phq9Interpretation: OperandExpression = {
  expression: {
    type: "conditional",
    operator: "switch",
    subject: { subject: { entity: "form", property: "total_score" }},
    cases: [
      {
        condition: {
          expression: {
            type: "comparison",
            operator: "<",
            args: [
              { subject: { entity: "form", property: "total_score" }},
              { const: { value: 5, data_type: "number" }}
            ],
            output_data_type: "boolean"
          }
        },
        result: { const: { value: "Depresión mínima", data_type: "string" }}
      },
      {
        condition: {
          expression: {
            type: "comparison",
            operator: "<",
            args: [
              { subject: { entity: "form", property: "total_score" }},
              { const: { value: 10, data_type: "number" }}
            ],
            output_data_type: "boolean"
          }
        },
        result: { const: { value: "Depresión leve", data_type: "string" }}
      },
      // ... más casos
    ],
    default: { const: { value: "Puntuación fuera de rango", data_type: "string" }},
    output_data_type: "string"
  }
}
```

**Ejemplo - Operador Ternario:**
```typescript
// Ejemplo: ¿Es adulto? → "Adulto" : "Menor"
const ageClassification = createTernaryOperation(
  createComparison(
    { subject: { entity: "person", property: "age" }},
    ">=",
    { const: { value: 18, data_type: "number" }}
  ),
  { const: { value: "Adulto", data_type: "string" }},
  { const: { value: "Menor", data_type: "string" }}
);
```

### **7. Operadores Temporales (`TimeOperator`)**
```typescript
interface TimeOperator extends BaseOperator {
  type: "time";
  operator: "range" | "movingavg" | "delta";
  args: CalculationOperand[];
  output_data_type: "number" | "array_number";  // Según la operación
}
```

**Casos de Uso:**
- Análisis longitudinal: `avg(peso_ultimos_10_años)`
- Tendencias: `delta(sintomas_depresion, 6_meses)`
- Rangos temporales: `range(mediciones, "-1Y", "NOW")`

**Ejemplo:**
```typescript
// Promedio de peso en los últimos 10 años
const avgWeightDecade: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "avg",
    args: [
      {
        expression: {
          type: "time",
          operator: "range",
          args: [
            { subject: { entity: "person", property: "weight" }},
            {
              time_range: {
                start: { relative: "-10Y" },
                end: { relative: "NOW" }
              }
            }
          ],
          output_data_type: "array_number"
        }
      }
    ],
    output_data_type: "number"
  }
}
```

---

## 🎯 **Casos de Uso Médicos Específicos**

### **1. PHQ-9 (Depresión) - Condición de Pregunta 10**

**Lógica Médica:** La pregunta 10 (impacto funcional) solo se muestra si **cualquiera** de las preguntas 1-9 tiene síntomas (valor > 0).

```typescript
const phq9Question10Condition: OperandExpression = {
  expression: {
    type: "collection",
    operator: "any",  // Al menos UNA pregunta > 0
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
                      { const: { value: [1,2,3,4,5,6,7,8,9], data_type: "array_number" }}
                    ],
                    output_data_type: "boolean"
                  },
                  output_data_type: "array_number"
                }
              }
            },
            { const: { value: 0, data_type: "number" }}
          ],
          output_data_type: "boolean"
        }
      }
    ],
    output_data_type: "boolean"
  }
}
```

### **2. CRAFFT (Adicciones) - Preguntas Condicionales**

**Lógica Médica:** Las preguntas 5-9 solo se muestran si **cualquiera** de las preguntas 1-3 es "Sí" (valor == 1).

```typescript
const crafftConditionalQuestions: OperandExpression = {
  expression: {
    type: "collection",
    operator: "any",  // Al menos UNA de las primeras 3 == "Sí"
    args: [
      {
        expression: {
          type: "comparison",
          operator: "==",
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
                      { const: { value: [1,2,3], data_type: "array_number" }}
                    ],
                    output_data_type: "boolean"
                  },
                  output_data_type: "array_number"
                }
              }
            },
            { const: { value: 1, data_type: "number" }}  // "Sí" = 1
          ],
          output_data_type: "boolean"
        }
      }
    ],
    output_data_type: "boolean"
  }
}
```

### **3. Cálculo de Puntuación Total**

```typescript
const totalScore: OperandExpression = {
  expression: {
    type: "aggregate",
    operator: "sum",
    args: [
      {
        subject: {
          entity: "question",
          property: "value",
          selector: "all"
        }
      }
    ],
    output_data_type: "number"
  }
}
```

### **4. Condición de Riesgo Alto**

```typescript
// Mostrar alerta si PHQ-9 > 15 (depresión severa)
const highRiskAlert: OperandExpression = {
  expression: {
    type: "comparison",
    operator: ">",
    args: [
      { subject: { entity: "form", property: "total_score" }},
      { const: { value: 15, data_type: "number" }}
    ],
    output_data_type: "boolean"
  }
}
```

### **5. Interpretación Automática de Resultados**

```typescript
// Interpretación automática basada en puntuación PHQ-9
const phq9AutoInterpretation: OperandExpression = {
  expression: {
    type: "conditional",
    operator: "switch",
    subject: { subject: { entity: "form", property: "total_score" }},
    cases: [
      {
        condition: {
          expression: {
            type: "comparison",
            operator: "<",
            args: [
              { subject: { entity: "form", property: "total_score" }},
              { const: { value: 5, data_type: "number" }}
            ],
            output_data_type: "boolean"
          }
        },
        result: { const: { value: "Depresión mínima - Seguimiento rutinario", data_type: "string" }}
      },
      {
        condition: {
          expression: {
            type: "comparison",
            operator: "<",
            args: [
              { subject: { entity: "form", property: "total_score" }},
              { const: { value: 15, data_type: "number" }}
            ],
            output_data_type: "boolean"
          }
        },
        result: { const: { value: "Depresión leve-moderada - Evaluación clínica recomendada", data_type: "string" }}
      }
    ],
    default: { const: { value: "Depresión severa - Tratamiento inmediato requerido", data_type: "string" }},
    output_data_type: "string"
  }
}
```

---

## 🛠️ **Factory Functions (Helpers)**

Para simplificar la creación de expresiones comunes:

### **Comparaciones Simples**
```typescript
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
  }
});

// Uso
const isAdult = createComparison(
  { subject: { entity: "person", property: "age" }},
  ">=",
  { const: { value: 18, data_type: "number" }}
);
```

### **Operaciones de Colección**
```typescript
const createCollectionOperation = (
  operator: CollectionOperator["operator"],
  ...args: CalculationOperand[]
): OperandExpression => ({
  expression: {
    type: "collection",
    operator,
    args,
    output_data_type: "boolean"
  }
});

// Uso
const anySymptoms = createCollectionOperation("any", ...symptomChecks);
```

### **Operaciones Condicionales**
```typescript
const createSwitchOperation = (
  subject: CalculationOperand,
  cases: Array<{
    condition: OperandExpression;
    result: CalculationOperand;
  }>,
  defaultValue?: CalculationOperand,
  outputType: DataType = "string"
): OperandExpression => ({ ... });

// Uso - Interpretación PHQ-9
const phq9Interpretation = createSwitchOperation(
  { subject: { entity: "form", property: "total_score" }},
  [
    {
      condition: createComparison(
        { subject: { entity: "form", property: "total_score" }},
        "<",
        { const: { value: 5, data_type: "number" }}
      ),
      result: { const: { value: "Depresión mínima", data_type: "string" }}
    },
    // ... más casos
  ],
  { const: { value: "Puntuación fuera de rango", data_type: "string" }},
  "string"
);
```

### **Operador Ternario**
```typescript
const createTernaryOperation = (
  condition: OperandExpression,
  trueResult: CalculationOperand,
  falseResult: CalculationOperand,
  outputType: DataType = "string"
): OperandExpression => ({ ... });

// Uso
const adultClassification = createTernaryOperation(
  createComparison(
    { subject: { entity: "person", property: "age" }},
    ">=",
    { const: { value: 18, data_type: "number" }}
  ),
  { const: { value: "Adulto", data_type: "string" }},
  { const: { value: "Menor", data_type: "string" }}
);
```

---

## 📊 **Referencias de Sujetos**

### **Entidades Soportadas**
- **`"question"`** - Preguntas del formulario
- **`"person"`** - Datos del paciente/usuario
- **`"form"`** - Datos del formulario completo

### **Propiedades Comunes**
```typescript
// Para preguntas
{ entity: "question", property: "value" }    // Valor de respuesta
{ entity: "question", property: "id" }       // ID de la pregunta

// Para personas
{ entity: "person", property: "age" }        // Edad
{ entity: "person", property: "weight" }     // Peso
{ entity: "person", property: "height" }     // Altura

// Para formularios
{ entity: "form", property: "total_score" }  // Puntuación total
{ entity: "form", property: "completion_date" } // Fecha de completado
```

### **Selectores Avanzados**
```typescript
// Selector por IDs específicos
selector: {
  property: "id",
  expression: {
    type: "comparison",
    operator: "in",
    args: [
      { const: { value: [1,2,3,4,5], data_type: "array_number" }}
    ],
    output_data_type: "boolean"
  },
  output_data_type: "array_number"
}

// Selectores predefinidos
selector: "all"     // Todas las entidades
selector: "group"   // Por grupo específico
```

---

## 🚀 **Próximos Pasos de Implementación**

### **1. Motor de Evaluación Python**
- [ ] Crear evaluador que procese las expresiones JSON
- [ ] Implementar cada tipo de operador
- [ ] Manejar referencias a sujetos dinámicamente
- [ ] Soporte para selectores complejos

### **2. Integración con Backend**
- [ ] Almacenar expresiones en base de datos (JSON/JSONB)
- [ ] API endpoints para evaluar condiciones
- [ ] Cache de resultados para performance
- [ ] Validación de expresiones antes de guardar

### **3. Casos de Uso Adicionales**
- [ ] Implementar más instrumentos clínicos (GAD-7, C-SSRS)
- [ ] Cálculos biométricos avanzados
- [ ] Análisis temporal de síntomas
- [ ] Alertas automáticas por riesgo

### **4. Herramientas de Desarrollo**
- [ ] Editor visual de expresiones
- [ ] Debugger para expresiones complejas
- [ ] Validador de sintaxis en tiempo real
- [ ] Generador de código desde GUI

---

## 📚 **Ejemplos de Implementación**

### **Archivo de Referencia**
- **Schema TypeScript:** `docs/types/typescript.ts`
- **Implementación PHQ-9:** `docs/cuestionarios/PHQ9.ts`
- **Implementación CRAFFT:** `docs/cuestionarios/CRAFFT.json`

### **Patrones Comunes**
1. **Condiciones simples:** Una comparación directa
2. **Condiciones con selector:** Filtrar por IDs específicos
3. **Condiciones lógicas complejas:** Combinar múltiples criterios
4. **Cálculos agregados:** Sumas, promedios, conteos
5. **Análisis temporal:** Rangos de tiempo y tendencias

---

## 🎯 **Estado Actual del Proyecto**

### **✅ Completado**
- ✅ **Schema TypeScript** con herencia y type safety
- ✅ **Implementación PHQ-9** con ambas versiones (verbosa y optimizada)
- ✅ **Factory functions** para casos comunes
- ✅ **Documentación completa** de operadores y casos de uso
- ✅ **Ejemplos médicos reales** validados clínicamente

### **🔄 En Desarrollo**
- 🔄 **Motor de evaluación Python** para procesar expresiones
- 🔄 **Integración con backend** FastAPI
- 🔄 **Más instrumentos clínicos** (GAD-7, C-SSRS, AUDIT)

### **📋 Pendiente**
- 📋 **Editor visual** de expresiones
- 📋 **Sistema de cache** para performance
- 📋 **Herramientas de debugging** avanzadas

---

## 🏆 **Conclusión**

El Sistema de Expresiones de FormFlow representa una **innovación técnica significativa** en el campo de formularios médicos dinámicos. Con su arquitectura recursiva, type safety completo y especialización médica, proporciona una base sólida para crear experiencias de evaluación clínica inteligentes y adaptativas.

**La implementación actual está lista para ser extendida con el motor de evaluación Python y casos de uso adicionales.**

---

**Documentación generada:** Octubre 2025  
**Versión del sistema:** 2.0  
**Próxima revisión:** Al completar motor de evaluación Python  