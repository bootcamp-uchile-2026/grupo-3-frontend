# PetLove — Frontend

Aplicación web frontend para PetLove, una tienda y plataforma de servicios para mascotas. Reúne una página de inicio, catálogo de productos, detalle de producto, carrito y flujo de compra, además de vistas de perfil de usuario y mascota y pantallas demostrativas para agendar servicios veterinarios.

## Tecnologías

- **React** y **React DOM** (`^19.3.0`) para la interfaz.
- **TypeScript** (`~6.0.2`) para tipado estático.
- **Vite** (`^8.3.0`) y `@vitejs/plugin-react` para desarrollo y compilación.
- **React Router** (`react-router-dom ^7.18.4`, `react-router ^8.4.0`) para navegación en el cliente.
- **Oxlint** (`^1.81.0`) para revisión estática.
- CSS propio; no se declara un framework de estilos.

Las versiones indicadas corresponden a los rangos declarados en `package.json`.

## Requisitos previos

- Node.js **20.19 o superior**, o **22.12 o superior**. Es el rango requerido por la versión de Vite declarada.
- npm. El proyecto no fija una versión mínima de npm; se recomienda utilizar la versión incluida con una instalación compatible de Node.js.

## Instalación y ejecución

```bash
git clone https://github.com/bootcamp-uchile-2026/grupo-3-frontend.git
cd grupo-3-frontend
npm ci
```

Comandos disponibles, según los scripts del `package.json`:

```bash
npm run dev       # Servidor de desarrollo con Vite
npm run build     # Verificación TypeScript y compilación de producción
npm run preview   # Sirve localmente el resultado compilado en dist/
npm run lint      # Revisión estática con Oxlint
```

Vite muestra en la terminal la URL local del servidor de desarrollo. Para revisar la compilación de producción, ejecuta primero `npm run build` y luego `npm run preview`.

## Estructura del proyecto

```text
.
├── public/                    # Recursos estáticos servidos tal cual
├── src/
│   ├── assets/                # Imágenes, iconos y datos de ejemplo
│   ├── components/            # Componentes reutilizables y sus estilos
│   ├── context/               # Contexto y reducer del carrito
│   ├── layout/                # Estructura compartida, encabezado y pie
│   ├── pages/                 # Vistas asociadas a las rutas
│   ├── services/              # Funciones de acceso a carrito y pedidos
│   ├── App.tsx                # Definición de rutas con React Router
│   ├── TDATypes.tsx           # Tipos de datos compartidos
│   ├── index.css              # Importaciones de estilos globales y de páginas
│   └── main.tsx               # Punto de entrada; monta router y proveedor del carrito
├── vanilla html/              # Vistas HTML independientes de la aplicación React
├── index.html                 # Documento HTML de entrada de Vite
├── package.json               # Dependencias y scripts npm
├── package-lock.json          # Lockfile utilizado por npm ci
├── tsconfig*.json             # Configuración de TypeScript
└── vite.config.ts             # Configuración de Vite y plugin de React
```

Los estilos de páginas y componentes se encuentran junto a sus archivos `.tsx` en `src/pages/` y `src/components/`. `src/index.css` los importa globalmente junto con `src/App.css`. La carpeta `vanilla html/` contiene documentos HTML separados; no son las rutas React definidas en `App.tsx`.

## Páginas y navegación

Las rutas están declaradas en `src/App.tsx` y renderizan dentro de `MainLayout`, que aporta encabezado, contenido y pie de página. La aplicación utiliza `BrowserRouter`, inicializado en `src/main.tsx`.

| Ruta | Página | Propósito según la implementación |
|---|---|---|
| `/` | `Home` | Inicio con categorías, ofertas y secciones promocionales. Categorías y ofertas se solicitan al API. |
| `/tienda` | `Tienda` | Catálogo general con filtros, orden, selector de vista y carga progresiva de resultados. |
| `/categoria/*` | `Tienda` | Catálogo filtrado por la categoría derivada del segmento de la ruta. |
| `/producto-individual` | `ProductoIndividual` | Vista de producto de ejemplo cuando no se proporciona un identificador. |
| `/producto-individual/:id` | `ProductoIndividual` | Detalle del producto solicitado, con información y productos relacionados. |
| `/carrito-compras` | `CarritoCompras` | Productos del carrito, control de cantidades, cupones, resumen y recomendaciones. |
| `/checkout` y `/carrito-compras/checkout` | `Checkout` | Formulario de datos de compra, entrega y selección de método de pago; envía la creación del pedido al API. |
| `/confirmacion-pedido` y `/carrito-compras/confirmacion-pedido` | `ConfirmacionPedido` | Confirmación sin identificador; la vista informa que falta el ID del pedido. |
| `/confirmacion-pedido/:id` y `/carrito-compras/confirmacion-pedido/:id` | `ConfirmacionPedido` | Consulta y muestra los datos del pedido identificado. |
| `/mi-perfil/perfil-usuario` | `PerfilUsuario` | Vista de perfil de usuario y accesos de cuenta. |
| `/mi-perfil/configuracion` | `Configuracion` | Preferencias de notificaciones presentadas en la interfaz. |
| `/mi-perfil/perfil-mascota` | `PerfilMascota` | Datos, información, historial y resumen de vacunas de una mascota. |
| `/mi-perfil/perfil-mascota/historial-medico` | `HistorialMedico` | Historial con pestañas de consultas, vacunas y exámenes. |
| `/servicios-veterinarios/agendar-veterinario-lista-servicios` | `AgendarVeterinarioProfesional` | Selección de profesional en un flujo de agendamiento. |
| `/servicios-veterinarios/agendar-veterinario-datos-contacto` | `AgendarVeterinarioDatosContacto` | Formulario de contacto del flujo de agendamiento. |

No se declara una ruta comodín (`*`) para una página 404.

## Componentes principales

- **Tienda:** `CardProducto`, `CardCarrusel`, `CardCategoria`, `Breadcrumbs`, `HeroTienda`, `FiltroTienda` y `OrdenTienda` presentan y permiten explorar el catálogo.
- **Producto:** `GaleriaProducto`, `ResumenProducto`, `FichaTecnica`, `TabsProducto` y componentes de reseñas organizan el detalle y sus secciones.
- **Carrito:** `CartItem`, `QuantityStepper`, `CouponBox` y `OrderSummary` separan el producto del carrito, el ajuste de cantidades, la entrada de cupones y el resumen de compra.
- **Pedido:** `CardProductoConfirmacion` presenta cada producto en la confirmación.
- **Mascotas e historial:** `DatosMascota`, `InformacionMascota`, `ResumenHistorialMascota`, `ResumenVacunasMascota`, `TabConsultas`, `TabVacunas` y `TabExamenes` componen las vistas del perfil médico.
- **Estructura compartida:** `MainLayout`, `Header`, `Body` y `Footer` organizan las páginas; `CarritoProvider` comparte el estado del carrito.
- **Iconografía:** `UIKit/UIIcons` contiene iconos SVG reutilizables.

## Integración con API

La aplicación usa `fetch` y espera respuestas JSON con las formas comprobadas en el cliente. El código define una URL base fija:

```text
http://18.226.214.170:3000/api/v1/catalogo
```

No se configura mediante una variable de entorno. Los endpoints observados son:

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/categorias` | Categorías de la página de inicio. |
| `GET` | `/productos` | Catálogo; el cliente aplica filtros, orden y carga progresiva. |
| `GET` | `/productos/ofertas` | Ofertas del inicio y recomendaciones del carrito. |
| `GET` | `/productos/{id}` | Detalle de un producto. |
| `GET` | `/productos/{id}/relacionados` | Productos relacionados al detalle. |
| `GET` | `/carrito?usuarioId=duenio-123` | Carga/sincronización del carrito. |
| `POST` | `/carrito/items` | Agrega un producto; el cuerpo incluye `productoId`, `cantidad` y `usuarioId`. |
| `PATCH` | `/carrito/items/{productoId}` | Actualiza cantidad; el cuerpo incluye `cantidad` y `usuarioId`. |
| `DELETE` | `/carrito/items/{productoId}?usuarioId=duenio-123` | Elimina un producto del carrito. |
| `POST` | `/pedidos` | Crea un pedido con los datos del checkout. |
| `GET` | `/pedidos/{id}` | Obtiene un pedido para la confirmación. |

Los servicios de carrito y pedidos están en `src/services/carrito.ts` y `src/services/pedidos.ts`. Las solicitudes de catálogo, categorías, ofertas, detalle y productos relacionados se realizan desde las páginas correspondientes. El carrito recibe el identificador fijo `duenio-123`; no se observa una integración de autenticación que lo determine dinámicamente.

El checkout permite seleccionar Mercado Pago, tarjeta o Webpay Plus y envía esa selección al crear el pedido. En el frontend no se observa una integración directa con los proveedores de pago ni una URL de redirección de pago.

## Variables de entorno

No se encontraron lecturas de `import.meta.env`, variables `VITE_*` ni configuración de entorno para la URL del API. Por lo tanto, no se requiere crear un `.env` para ejecutar el proyecto y no corresponde añadir un `.env.example`. Para usar otro servidor API habría que cambiar las URLs codificadas en el código.

## Funcionalidades implementadas

- Página de inicio con carga de categorías y ofertas desde el API.
- Catálogo conectado al API, con filtro por categoría y selecciones de especie, tipo de producto, edad, comida, sabor, formato, material y marca; orden por precio o nombre, vista de cuadrícula/lista y botón «Ver más».
- Detalle de producto, productos relacionados y acción para agregar al carrito.
- Carrito sincronizado con el API para consultar, agregar, cambiar cantidad y eliminar productos; muestra subtotal, descuento, total y recomendaciones.
- Cupones reconocidos en la interfaz: `CUPONCLIENTENUEVO`, `CYBERWEEK`, `ENVIOGRATIS`, `BLACKFRIDAY` y `REGALO`. En el código del carrito, los cuatro primeros ajustan el resumen en el cliente y `REGALO` agrega un artículo local; no se observa una solicitud de validación del cupón al API.
- Checkout con datos del comprador, envío normal o retiro en tienda, y selección de método de pago; creación del pedido y navegación a confirmación.
- Confirmación que consulta el pedido por ID y muestra estado, fecha, entrega, productos y montos.
- Vistas de perfil, configuración, perfil de mascota e historial médico, además de pantallas de agendamiento veterinario.

## Estado y limitaciones conocidas

- Los flujos de catálogo, carrito y pedidos dependen de que el API indicado esté accesible desde el navegador y acepte las solicitudes del frontend.
- La URL del API y el ID `duenio-123` están codificados en el cliente; no hay variables de entorno ni selección de usuario observables.
- Los métodos de pago son opciones del formulario enviadas en la solicitud de pedido; la interfaz no implementa el procesamiento con un proveedor de pago.
- Las pantallas de perfil y agendamiento contienen datos estáticos o controles de presentación; no se observa en esas páginas una integración API para guardar perfiles, preferencias o reservas. Algunos recursos visuales usan imágenes de `placehold.co`.
- `package.json` no define un script de pruebas automatizadas. Los comandos de revisión declarados son `npm run lint` y `npm run build` (este último incluye `tsc -b`).
- El repositorio incluye tanto la aplicación React como páginas independientes en `vanilla html/`; las rutas documentadas arriba corresponden a la aplicación React.
