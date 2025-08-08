# Documentación del Módulo de Noticias

## Visión General

El módulo **news** es una parte fundamental de la plataforma, orientada a la difusión de noticias y contenido educativo en el área de la salud. Su objetivo es informar, educar y concientizar a los usuarios sobre temas relevantes, utilizando tanto noticias externas de fuentes confiables como, en el futuro, contenido generado por personal autorizado y profesionales de la salud.

Actualmente, el módulo consume noticias obtenidas mediante un servicio de webscraping desarrollado por el equipo de backend, que recopila información de sitios reconocidos en el ámbito de la salud. El frontend se encarga de mostrar estas noticias de manera atractiva y funcional, sentando las bases para futuras extensiones como blogs, foros, comentarios y reacciones.

## Objetivos del Módulo

- **Difusión de noticias de salud**: Mostrar información relevante y actualizada de fuentes confiables.
- **Concientización y educación**: Fomentar el cuidado de la salud a través de contenido curado.
- **Escalabilidad**: Preparar la arquitectura para soportar la creación de contenido propio, interacción social y crecimiento como red social.

## Arquitectura y Estructura de Archivos

### 1. Dominio y Datos

- `src/domain/entity/NewPost.ts`: Define la entidad principal de una noticia, incluyendo campos como título, autor, fuente, fecha, contenido, imágenes, etc.
- `src/domain/entity/NewSource.ts`: Define la entidad de fuente de noticias.
- `src/domain/enum/news/source.ts`: Enumera las fuentes de noticias soportadas.
- `src/domain/data/new.source.ts`: Contiene la lista y metadatos de las fuentes de noticias.
- `src/domain/dto/news/new.ts`: Define los DTOs y funciones de transformación entre datos de la API y entidades del frontend.

### 2. API

- `src/api/news/source.apis.ts`: Define los endpoints y funciones para consumir el backend de noticias (listado, detalle, etc.).

### 3. Mock Data

- `src/modules/news/news.mook.data.ts`: Datos simulados de noticias para pruebas y desarrollo.
- `src/modules/news/new.mook.data.ts`: Contenido HTML simulado de una noticia.

### 4. Componentes y Páginas

- `src/modules/news/index.tsx`: Página principal del feed de noticias.
- `src/modules/news/components/NewList.tsx`: Lista de tarjetas de noticias.
- `src/modules/news/components/NewCard.tsx`: Tarjeta individual de noticia.
- `src/modules/news/components/NewFooter.tsx`: Pie de cada noticia (acciones sociales, diseño).
- `src/modules/news/components/NewAdd.tsx`: Formulario para agregar noticia (solo UI, sin funcionalidad aún).
- `src/modules/news/components/header.tsx`: Header de la sección de noticias.
- `src/modules/news/detail/index.tsx`: Página de detalle de noticia.
- `src/modules/news/detail/components/header.tsx`: Header para el detalle de noticia.
- `src/modules/news/components/NewList.module.css`, `src/modules/news/detail/index.css`, `src/modules/news/NewDetailMilenio.module.css`: Estilos específicos para la sección de noticias.

## Flujo de Datos

1. **Backend**: Realiza scraping de sitios confiables y expone endpoints REST para obtener listas y detalles de noticias.
2. **Frontend**: Consume estos endpoints usando las funciones definidas en `source.apis.ts`.
3. **Transformación**: Los datos recibidos se transforman a entidades de frontend mediante los DTOs.
4. **Visualización**: Las noticias se muestran en el feed y pueden ser consultadas a detalle.

## Extensibilidad y Futuro

El diseño del módulo permite:
- Agregar la funcionalidad de creación de noticias propias (blogs) desde la web o móvil.
- Implementar comentarios, reacciones, foros y otras funciones sociales.
- Añadir nuevas fuentes de noticias fácilmente.
- Escalar la plataforma hacia una red social de salud.

## Ejemplo de Uso

- El feed de noticias se muestra usando el componente `NewsList`, que recibe las noticias desde el backend y las renderiza en tarjetas.
- Al seleccionar una noticia, se navega a la página de detalle, donde se muestra el contenido completo y metadatos.

## Consideraciones Técnicas

- El módulo está desacoplado del backend, permitiendo cambiar la fuente de datos sin afectar la UI.
- El uso de DTOs facilita la adaptación a cambios en la estructura de datos del backend.
- El diseño de componentes es modular y reutilizable.

## Roadmap Sugerido

- [ ] Integrar creación de noticias propias (blogs).
- [ ] Implementar comentarios y reacciones.
- [ ] Añadir soporte para foros y grupos temáticos.
- [ ] Mejorar la accesibilidad y experiencia de usuario.
- [ ] Internacionalización y soporte multilenguaje.

---

**Última actualización:** 04/07/2025
