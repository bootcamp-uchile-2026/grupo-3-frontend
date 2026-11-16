# Contexto del proyecto
PetLove: e-commerce B2C de mascotas. Vite + pnpm + TypeScript + React + React Router.
Zustand y Zod forman parte del stack objetivo pero AÚN NO están implementados (ver "Estado y datos").

# Estructura (src/)
- `components/`: incluye `UIKit/` (componentes base e iconos) y el resto de componentes.
- `pages/`: una carpeta por página, con su `.tsx` y su `.css`.
- `layout/`: Header, Footer y la estructura común de las rutas. Están fuera del diseño de las páginas.
- `context/`, `services/`, `assets/`
- `App.tsx`: rutas con React Router. `main.tsx`: punto de entrada.
- `App.css`: variables CSS (fuente de verdad de tokens).
- `index.css`: archivo central que importa con `@import` el CSS de cada componente y página.

# Fuentes de verdad (en este orden)
1. Diseño en Figma (vía MCP): estructura, jerarquía, espaciados, estados.
2. `App.css`: todo color, tipografía, espaciado, radio y sombra debe usar sus variables.
3. UIKit (`src/components/UIKit/`): se reutiliza antes de crear algo nuevo.
4. Páginas y componentes ya existentes: referencia de patrones y coherencia visual.

# Layout y React Router
- Header y Footer pertenecen a `layout/` y NO forman parte del diseño de las páginas.
- Al leer un frame de Figma, ignora el header y el footer: no los implementes dentro de la página.
- Las páginas se renderizan dentro del layout (vía `<Outlet />` o la estructura actual de rutas). No dupliques paddings, anchos máximos ni fondos que ya aplique el layout.
- No modifiques `layout/` ni las definiciones de rutas salvo que la tarea lo requiera; en ese caso repórtalo primero.
- Navegación con `Link`/`NavLink`/`useNavigate` de React Router, nunca `<a href>` para rutas internas.

# Reglas de estilos
- Cada componente/página tiene su `.css` en su propia carpeta.
- NO importar el CSS desde el `.tsx`. Todo CSS nuevo se registra con `@import` en `index.css`, respetando el orden y agrupación actuales.
- El CSS es global (sin CSS Modules): evita colisiones usando BEM.
- Nunca hardcodear valores si existe una variable en `App.css`. Los nombres de tokens en Figma NO coinciden con los de `App.css`: empareja por valor (hex, px, familia, peso). Si no hay equivalente, no inventes: repórtalo.
- El diseño es solo escritorio. No implementes responsive nuevo, pero no elimines reglas responsive existentes salvo que choquen con el diseño (en ese caso, repórtalo).

# Convención de nombres CSS (BEM, kebab-case)
- Bloque = nombre del componente o página: `.ui-product-description`
- Elemento = `__nombre`: `.ui-product-description__panel`
- Modificador = `--nombre`: `.ui-product-description--open`
- Los componentes de UIKit llevan prefijo `ui-`. Para componentes y páginas fuera de UIKit, deduce el prefijo y el estilo observando los CSS existentes y síguelos.
- Todas las clases de un archivo CSS cuelgan de un único bloque.
- Evita selectores por etiqueta o clases genéricas (`.title`, `.container`).

# Estado y datos
- El estado y los datos actuales viven en otra implementación (context/services). Zustand y Zod aún no existen en el proyecto.
- En tareas de diseño NO migres ni reemplaces esa lógica. Conserva la implementación actual.
- Si la migración a Zustand/Zod es necesaria para la tarea, repórtalo en el análisis; no la hagas por iniciativa propia.
- Si el diseño necesita datos que hoy no existen, indícalo sin implementarlo.

# Reglas de código
- Reutiliza UIKit e iconos existentes; si falta uno, repórtalo antes de crearlo.
- No cambies lógica, rutas, estado, servicios ni esquemas ajenos a la tarea.
- TypeScript estricto: sin `any`, props tipadas.
- Accesibilidad básica: elementos semánticos, `alt` en imágenes, foco visible, `aria-label` en botones de solo icono.
- Imita la convención de nombres y el estilo de archivos existentes.
- Si algo es ambiguo, pregunta antes de implementar.
- Comandos con pnpm (`pnpm dev`, `pnpm lint`, `pnpm build`).