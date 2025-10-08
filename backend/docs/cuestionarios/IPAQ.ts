import { OperandExpression } from "../types/typescript";




let ipaq = [
  { id: 1, label: "cuantos dias", value: 0 },
  {
    id: 2,
    label: "cuanto tiempo?",
    value: 0,
    condition: "all([answers.id_question == 1 AND answers.value > 0 ])",
  },
  { id: 3, label: "cuantos dias", value: 0 },
  {
    id: 4,
    label: "cuanto tiempo?",
    value: 0,
    condition: "all([question.id == 1 AND question.value > 0 ])",
  },
];





//mets : unidades del indice metabolico
// 7 preguntas
mets_caminar = 3.3;
mets_actividad_moderada = 4;
mets_actividad_vigorosa = 8;

// caminar
minutes_caminar = 0;
days_by_week_caminar = 0;
// moderada
minutes_actividad_moderada = days_by_week_actividad_moderada = 0;
// vigorosa
minutes_actividad_vigorosa = 0;
days_by_week_actividad_vigorosa = 0;

puntuacion_actividad_intensa =
  mets_actividad_vigorosa *
  minutes_actividad_vigorosa *
  days_by_week_actividad_vigorosa;

puntuacion_actividad_moderada =
  mets_actividad_moderada *
  minutes_actividad_moderada *
  days_by_week_actividad_moderada;

puntuacion_caminar = mets_caminar * minutes_caminar * days_by_week_caminar;

puntuacion = {
  caminar: puntuacion_caminar,
  actividad_moderada: puntuacion_actividad_moderada,
  actividad_vigorosa: actividad_vigorosa,
};

puntuacion_total =
  puntuacion_caminar +
  puntuacion_actividad_moderada +
  puntuacion_actividad_intensa;

interperacion = function () {
  if (puntuacion_actividad_intensa >= 1500 || puntuacion_total >= 3000)
    return [3, "Alto"];
  // 3 o mas dias de actividad fisica vigorosa de al menos 25 minutos
  //categoria_memets_actividad_vigorosadia = mets_actividad_vigorosa * 25 * 3
  else if (c) {
  }
};

const interpretacion_final = {
  mets: { caminar, vigoroso, intenso },
  categoria: [3, "Alto"],
};

/*
|         resultado                 | interpretacion|
|{caminar:0, vigoroso:0, intenso:0} | {category:1, label:"Alto"}
*/
