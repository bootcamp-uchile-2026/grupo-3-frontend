# PetLove — Frontend

Repositorio de **frontend** del proyecto **PetLove**, desarrollado en el marco del Bootcamp DCC 2026 (Grupo 3).

> 🚧 Proyecto en desarrollo activo. Este README se irá actualizando a medida que avance la implementación.

## ¿Qué es PetLove?

PetLove es un **e-commerce B2C de productos para mascotas** (alimentos, accesorios y medicamentos) que integra además servicios de valor agregado:

- Agendamiento de consultas veterinarias
- Perfil de mascota con historial médico
- Recordatorios
- Gestión de recetas médicas

**Problema que resuelve:** la dificultad de hacer seguimiento y tomar decisiones informadas sobre el cuidado de una mascota.
**Público objetivo:** dueños de mascotas que buscan una experiencia confiable y cercana al cuidado de su mascota.

Documentación completa del producto, arquitectura y decisiones: ver Wiki del proyecto

## Tecnologías

| Área | Actual | Planificado |
|---|---|---|
| Maquetación | HTML5 + CSS3 (vanilla) | React |
| Entorno de desarrollo | Live Server | Vite |
| Backend | — (repo aparte) | API REST documentada en Swagger |

## Cómo ejecutar el proyecto

**Estado actual (sin bundler):**
1. Clonar el repositorio.
2. Abrir el proyecto en VS Code (u otro editor) con la extensión **Live Server**.
3. Ejecutar `index.html` con Live Server (o abrirlo directamente en el navegador).

**Próximamente (post-migración a Vite):**
```bash
npm install
npm run dev
```

> El backend (API en Swagger) vive en un repositorio separado y aún no está integrado a este frontend.

## Repositorios del proyecto

| Repositorio | Contenido |
|---|---|
| `grupo-3-frontend` (este repo) | Interfaz web del e-commerce |
| backend | API REST (Swagger), en desarrollo |
| mobile | Aplicación móvil, en desarrollo |

## Flujo de trabajo (Gitflow)

- `main` — versión estable; se etiqueta con un tag por cada hito de entrega
- `develop` — rama de integración
- `feature/nombre-de-funcionalidad` — desarrollo de nuevas vistas/funcionalidades
- `release` / `hotfix` — según flujo estándar de Gitflow
- Todo merge a `develop` y `main` requiere **Pull Request con revisión obligatoria**

## Licencia

MIT — ver [LICENSE](./LICENSE)
