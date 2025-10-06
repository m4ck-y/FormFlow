puntuacion = "sum(answers.values)";

interpretacion = `switch(
  (puntuacion < 5, 'Depresion minima'),
  (puntuacion < 10, 'Deprecion leve'),
  (puntuacion < 15, 'Depresion moderada'),
  (puntuacion < 20, 'Depresion moderadamente severa'),
  (puntuacion <= 27, 'Depresion severa')
  )`;
