# Problema Detectado

Durante el despliegue de una aplicación desarrollada con **Vite + React + TypeScript** en **GitHub Pages**, alojada en la URL:

https://m4ck-y.github.io/FormFlow/

se observa que los archivos **JavaScript** y **CSS** no se cargan correctamente.

El archivo HTML generado tras el proceso de build contiene referencias absolutas a los recursos estáticos, por ejemplo:

```html
<script type="module" crossorigin src="/assets/index-CAl1KfkQ.js"></script>
<link rel="stylesheet" crossorigin href="/assets/index-D8b4DHJx.css">
```

Estas referencias apuntan a la raíz del dominio:

```
https://m4ck-y.github.io/assets/index-s7U60qSM.js
```

cuando en realidad los archivos están alojados en el subdirectorio correspondiente al repositorio:

```
https://m4ck-y.github.io/FormFlow/assets/index-s7U60qSM.js
```

---

# Causa del Problema

Por defecto, **Vite** genera rutas absolutas para los assets en el HTML resultante, utilizando un prefijo `/`. Esto indica que los recursos se buscan en la raíz del servidor web.

Cuando la aplicación se despliega en GitHub Pages bajo un subdirectorio (es decir, un repositorio que no es el dominio raíz `https://usuario.github.io` sino `https://usuario.github.io/repositorio/`), estas rutas absolutas ya no son válidas, ya que los recursos están dentro de ese subdirectorio.

Como resultado, el navegador intenta cargar los archivos desde una ruta incorrecta, provocando errores en la carga de los recursos estáticos (JS y CSS) y afectando el correcto funcionamiento de la aplicación.

---

# Solución Propuesta

Se debe configurar explícitamente la propiedad `base` en el archivo de configuración de Vite (`vite.config.js` o `vite.config.ts`) para reflejar el subdirectorio donde se aloja la aplicación en GitHub Pages.

Por ejemplo, para el repositorio **FormFlow**:

```jsx
base: '/FormFlow/'
```

Esto indica a Vite que todas las rutas relativas a recursos estáticos se generen con el prefijo `/FormFlow/`.

Después de aplicar esta configuración, el HTML generado tendrá referencias como:

```html
<script type="module" crossorigin src="/FormFlow/assets/index-CAl1KfkQ.js"></script>
<link rel="stylesheet" crossorigin href="/FormFlow/assets/index-D8b4DHJx.css">
```

apuntando correctamente a los archivos dentro del subdirectorio de despliegue.

---

# Procedimiento para la Corrección

1. Abrir el archivo `vite.config.js` o `vite.config.ts`.
2. Agregar o modificar la propiedad `base` con el valor correspondiente al nombre del repositorio:
    
    ```jsx
    export default defineConfig({
      base: '/FormFlow/',
      // ...otras configuraciones
    });
    ```
    
3. Ejecutar nuevamente el proceso de build para regenerar los archivos con las rutas corregidas:
    
    ```bash
    npm run build
    ```
    
4. Desplegar el contenido generado (generalmente la carpeta `dist`) en la rama o ubicación configurada para GitHub Pages.

---

# Resultado Esperado

Con esta configuración, la aplicación cargará correctamente los archivos **JavaScript** y **CSS** desde las rutas adecuadas, permitiendo su correcto funcionamiento al acceder a:

https://m4ck-y.github.io/FormFlow/

---

# Nota Adicional: Por qué Ocurre Este Problema Frecuentemente

Herramientas como **Vite** asumen por defecto que la aplicación se despliega en la raíz del dominio, generando rutas absolutas (`/assets/...`).

En GitHub Pages, cuando la aplicación se aloja en un repositorio servido bajo un subdirectorio (el nombre del repositorio), estas rutas absolutas no apuntan correctamente a los recursos.

Por ello, es necesario especificar el parámetro `base` para que el proceso de build adapte todas las rutas relativas a dicho subdirectorio, evitando problemas de carga de recursos estáticos.
