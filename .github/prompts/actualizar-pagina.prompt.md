---
agent: agent
description: Actualiza una página al diseño de Figma (análisis, confirmación, implementación)
---

Actualiza la página **${input:pagina:Nombre de la carpeta en src/pages, ej. Home o Catalogo}** para que coincida con el diseño de Figma: ${input:figma:Enlace al frame de Figma}.

Notas adicionales (opcional): ${input:notas:Qué sección priorizar, qué ignorar, etc.}

Sigue las instrucciones del repositorio (`copilot-instructions.md`). Recuerda: el header y el footer pertenecen a `layout/` y NO forman parte de esta página.

## Fase 1: Análisis (NO modifiques ningún archivo)
1. Lee la página actual, su CSS y todos los componentes, hooks, context y services que usa.
2. Lee `App.css` (variables), `index.css` (orden de imports) y la definición de rutas en `App.tsx`.
3. Lee `layout/` para saber qué estructura, anchos y espaciados aporta ya al contenido de la página.
4. Revisa `components/UIKit/`: componentes base e iconos disponibles.
5. Obtén el diseño con el MCP de Figma: estructura, textos, estados, colores, tipografía, espaciados, radios y sombras. Ignora el header y el footer.
6. Revisa al menos 2 páginas ya terminadas para extraer patrones comunes (encabezados de sección, grillas, botones, tarjetas, espaciados) y mantener coherencia visual.
7. Identifica cómo gestiona hoy la página su estado y sus datos, y confirma que la actualización visual no lo toca.
8. Entrégame un informe con:
   - Tabla: sección de Figma → componente UIKit existente / componente nuevo necesario.
   - Tabla: valor en Figma → variable de `App.css` (marca los sin equivalente y los emparejamientos dudosos).
   - Qué se conserva (lógica, estado, datos, rutas) y qué cambia (solo presentación).
   - Diferencias de coherencia con otras páginas y cómo las resolverás.
   - Datos que el diseño exige y hoy no existen (sin implementarlos).
   - Lista de archivos que crearás o modificarás (incluido `index.css`).
   - Dudas o riesgos.

Detente y espera mi confirmación.

## Fase 2: Implementación (solo tras mi confirmación)
- Reutiliza UIKit; crea componentes nuevos solo si no hay equivalente.
- Usa únicamente variables de `App.css`. Clases en BEM con el bloque propio de la página/componente.
- Registra todo CSS nuevo en `index.css`.
- Mantén intacta la lógica, el estado, las rutas y el layout.
- Incluye estados de carga, vacío y error solo si la página ya los contempla o el diseño los muestra.

## Fase 3: Verificación
- Ejecuta `pnpm lint` y `pnpm build`; corrige los errores.
- Confirma que no quedaron valores hardcodeados ni clases que puedan chocar con otros CSS.
- Resume los archivos modificados y los pendientes.