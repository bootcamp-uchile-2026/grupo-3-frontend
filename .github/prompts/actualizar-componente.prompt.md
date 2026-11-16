---
agent: agent
description: Actualiza un componente al diseño de Figma (análisis, confirmación, implementación)
---

Actualiza el componente **${input:componente:Ruta o nombre en src/components, ej. UIKit/Button o ProductCard}** según el diseño de Figma: ${input:figma:Enlace al nodo/frame de Figma}.

Notas adicionales (opcional): ${input:notas:Variantes o estados a considerar, qué ignorar, etc.}

Sigue las instrucciones del repositorio (`copilot-instructions.md`).

## Fase 1: Análisis (NO modifiques ningún archivo)
1. Lee el componente, su CSS y sus props, y busca TODOS los lugares donde se usa (páginas, layout y otros componentes).
2. Revisa `components/UIKit/` por si ya existe algo equivalente o puede componerse con piezas existentes.
3. Obtén el diseño con el MCP de Figma: variantes, estados (hover, focus, disabled, error, loading), tamaños y valores de estilo.
4. Lee `App.css` e `index.css`, y empareja cada valor de Figma con una variable por valor.
5. Revisa componentes similares ya terminados para mantener coherencia visual y de API.
6. Identifica cómo gestiona hoy el componente su estado y datos, y confirma que la actualización visual no lo toca.
7. Entrégame un informe con:
   - Cambios necesarios y si rompen la API de props (con los usos afectados).
   - Variantes y estados que exige el diseño.
   - Tabla: valor en Figma → variable de `App.css` (marca los sin equivalente y los dudosos).
   - Riesgo de colisión de clases CSS con otros componentes.
   - Lista de archivos que crearás o modificarás (incluido `index.css`).
   - Dudas o riesgos.

Detente y espera mi confirmación.

## Fase 2: Implementación (solo tras mi confirmación)
- Mantén la API de props salvo acuerdo; si cambia, actualiza todos los usos.
- Props tipadas, accesibilidad básica, solo variables de `App.css`.
- Clases en BEM con el bloque propio; si creas o renombras CSS, actualiza `index.css`.
- No toques el layout ni las rutas.

## Fase 3: Verificación
- Ejecuta `pnpm lint` y `pnpm build`; corrige los errores.
- Revisa cada página y componente que usa este componente para confirmar que no se rompió nada.
- Resume los archivos modificados y los pendientes.