# Documentación Técnica y General del Módulo de Noticias

## 1. Introducción

El módulo **news** es una pieza clave de la plataforma, orientada a la difusión de noticias y contenido educativo en el área de la salud. Su objetivo es informar, educar y concientizar a los usuarios sobre temas relevantes, utilizando tanto noticias externas de fuentes confiables como, en el futuro, contenido generado por personal autorizado y profesionales de la salud.

## 2. Tecnologías Utilizadas

- **React**: Biblioteca principal para la construcción de interfaces de usuario reactivas y modulares.
- **ViteJS**: Herramienta de build y desarrollo ultrarrápida, que permite hot reload y una experiencia de desarrollo moderna.
- **Node.js**: Entorno de ejecución para JavaScript en el backend y para scripts de desarrollo.
- **npm**: Gestor de paquetes para instalar dependencias y scripts de automatización.
- **TypeScript**: Superset de JavaScript que añade tipado estático, lo que ayuda a minimizar errores y mejorar la mantenibilidad del código.
- **React Router**: Librería para el manejo de rutas y navegación entre páginas de la aplicación.

## 3. Principios de Desarrollo

- **Clean Architecture**: Se busca separar responsabilidades y mantener el código desacoplado, facilitando la escalabilidad y el mantenimiento. Las entidades, lógica de negocio, acceso a datos y presentación están claramente diferenciados.
- **Código limpio**: Se prioriza la legibilidad, la reutilización y la facilidad de pruebas.
- **Tipado fuerte con TypeScript**: Permite detectar errores en tiempo de desarrollo, facilita el refactor y mejora la documentación implícita del código.

## 4. Estructura de Carpetas y Justificación

- **src/domain/**: Contiene entidades, enums, DTOs y datos relacionados con el dominio de la aplicación. Permite centralizar la lógica de negocio y los modelos de datos.
- **src/api/**: Define los endpoints y funciones para consumir servicios externos o del backend.
- **src/components/**: Componentes reutilizables y genéricos de la UI.
- **src/modules/news/**: Contiene todo lo relacionado con el módulo de noticias, incluyendo páginas, componentes específicos, mocks y estilos. Esta separación facilita el mantenimiento y la escalabilidad.
- **src/routes/**: Definición de rutas y navegación usando React Router.
- **src/utils/**: Funciones utilitarias y helpers.
- **public/**: Archivos estáticos y recursos públicos.

Esta estructura modular permite trabajar de forma colaborativa, facilita la localización de archivos y la extensión de funcionalidades.

## 5. Flujo de Trabajo del Módulo de Noticias

1. **Backend**: Realiza scraping de sitios confiables y expone endpoints REST para obtener listas y detalles de noticias.
2. **Frontend**: Consume estos endpoints usando las funciones definidas en `src/api/news/source.apis.ts`.
3. **Transformación**: Los datos recibidos se transforman a entidades de frontend mediante los DTOs en `src/domain/dto/news/new.ts`.
4. **Visualización**: Las noticias se muestran en el feed (`src/modules/news/index.tsx`) y pueden ser consultadas a detalle (`src/modules/news/detail/index.tsx`).

## 6. Uso de React Router

Se utiliza React Router para gestionar la navegación entre el feed de noticias y el detalle de cada noticia, permitiendo una experiencia de usuario fluida y sin recargas de página.

## 7. Consideraciones Técnicas y Buenas Prácticas

- **Desacoplamiento**: El frontend está desacoplado del backend, permitiendo cambiar la fuente de datos sin afectar la UI.
- **DTOs**: Facilitan la adaptación a cambios en la estructura de datos del backend.
- **Componentes modulares**: Permiten la reutilización y el mantenimiento sencillo.
- **Tipado fuerte**: Minimiza errores y mejora la calidad del código.

## 8. Documentación No Técnica (Visión y Futuro)

- El módulo de noticias busca ser un espacio confiable para la difusión de información de salud, con la posibilidad de evolucionar hacia una red social especializada.
- En el futuro, se planea habilitar la creación de contenido propio por parte de personal autorizado y profesionales de la salud, así como la interacción social (comentarios, reacciones, foros, etc.).
- El diseño actual permite escalar y adaptar el módulo a nuevas necesidades, manteniendo la seguridad y la calidad del contenido.

## 9. Roadmap Sugerido

- [ ] Integrar creación de noticias propias (blogs) por personal autorizado.
- [ ] Implementar comentarios y reacciones.
- [ ] Añadir soporte para foros y grupos temáticos.
- [ ] Mejorar la accesibilidad y experiencia de usuario.
- [ ] Internacionalización y soporte multilenguaje.

---

**Última actualización:** 04/07/2025
