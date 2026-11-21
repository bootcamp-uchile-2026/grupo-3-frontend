# PetLove - Frontend

Aplicacion web de comercio electronico y servicios para mascotas. El proyecto incluye el catalogo de productos, detalle de producto, carrito persistido, checkout, confirmacion de pedidos, perfil de usuario y mascota, historial medico y un flujo demostrativo de agendamiento veterinario.

## Estado del proyecto

Avance actual del frontend:

- Diseno responsive implementado con React y CSS global basado en tokens.
- Catalogo conectado al API con categorias, ofertas, filtros y productos relacionados.
- Carrito invitado sincronizado con el API y persistido en el navegador.
- Cupones, cantidades, eliminacion y vaciado de carrito.
- Checkout con datos de entrega, compra y metodo de pago.
- Creacion y consulta de pedidos.
- Store de pedidos para controlar envios duplicados y reintentos pendientes.
- Paginas de perfil, mascota e historial con datos locales o demostrativos.
- Paginas de UIKit para consultar componentes e iconos reutilizables.

## Tecnologias

- React 19
- TypeScript
- Vite
- React Router
- Zustand
- Zod
- CSS global con variables CSS
- Oxlint

Las versiones exactas se encuentran en `package.json`.

## Requisitos

- Node.js 20.19+ o 22.12+
- pnpm

Vite 8 requiere una version de Node.js compatible con los rangos anteriores.

## Instalacion y ejecucion

```bash
git clone https://github.com/bootcamp-uchile-2026/grupo-3-frontend.git
cd grupo-3-frontend
pnpm install --frozen-lockfile
```

Configura la variable de entorno antes de iniciar la aplicacion:

```bash
cp .env.example .env
```

Edita `VITE_API_URL` en `.env` si necesitas apuntar a otra instancia del backend.

```bash
pnpm dev       # Servidor de desarrollo
pnpm build     # Verificacion TypeScript y build de produccion
pnpm preview   # Sirve la compilacion de dist/
pnpm lint      # Revision estatica con Oxlint
```

El servidor muestra en la terminal la URL local generada por Vite.

## Variables de entorno

El unico valor requerido por el frontend es:

```text
VITE_API_URL=http://18.226.214.170:3000/api/v1
```

`apiClient.ts` exige que `VITE_API_URL` exista y elimina automaticamente las barras finales. Las respuestas de los servicios pasan por schemas de Zod antes de usarse en la interfaz.

Una API HTTP puede presentar problemas de contenido mixto si el frontend se sirve mediante HTTPS. Tambien deben revisarse las reglas CORS del backend.

## Navegacion

Las rutas se encuentran en `src/App.tsx` y se renderizan dentro de `MainLayout`, que incluye el header y el footer compartidos.

| Ruta | Pagina | Funcionalidad |
|---|---|---|
| `/` | `Home` | Inicio con categorias y ofertas obtenidas del API |
| `/tienda` | `Tienda` | Catalogo completo con filtros, orden y vista de resultados |
| `/categoria/*` | `Tienda` | Catalogo filtrado segun la categoria de la URL |
| `/producto-individual` | `ProductoIndividual` | Vista de producto de ejemplo |
| `/producto-individual/:id` | `ProductoIndividual` | Detalle y productos relacionados desde el API |
| `/carrito-compras` | `CarritoCompras` | Consulta y modificacion del carrito |
| `/checkout` | `Checkout` | Datos de entrega y pago para crear el pedido |
| `/carrito-compras/checkout` | `Checkout` | Ruta alternativa del checkout |
| `/confirmacion-pedido/:id` | `ConfirmacionPedido` | Detalle del pedido |
| `/carrito-compras/confirmacion-pedido/:id` | `ConfirmacionPedido` | Ruta alternativa de confirmacion |
| `/confirmacion-pedido` | `ConfirmacionPedido` | Estado sin identificador |
| `/mi-perfil/perfil-usuario` | `PerfilUsuario` | Perfil de usuario |
| `/mi-perfil/configuracion` | `Configuracion` | Preferencias de notificaciones |
| `/mi-perfil/perfil-mascota` | `PerfilMascota` | Datos e historial resumido de la mascota |
| `/mi-perfil/perfil-mascota/historial-medico` | `HistorialMedico` | Consultas, vacunas y examenes |
| `/servicios-veterinarios/agendar-veterinario-lista-servicios` | `AgendarVeterinarioProfesional` | Seleccion de profesional |
| `/servicios-veterinarios/agendar-veterinario-datos-contacto` | `AgendarVeterinarioDatosContacto` | Datos de contacto del agendamiento |
| `/ui-kit/icons` | `UIKitIcons` | Catalogo de iconos |
| `/ui-kit/components` | `UIKitComponents` | Catalogo de componentes reutilizables |

No existe actualmente una ruta comodin (`*`) para mostrar una pagina 404.

## Integracion con API

Todas las llamadas pasan por `src/services/apiClient.ts`, que maneja JSON, errores HTTP y validacion de respuestas.

### Catalogo

| Metodo | Endpoint | Uso |
|---|---|---|
| `GET` | `/catalogo/categorias` | Categorias |
| `GET` | `/catalogo/productos` | Listado y filtros del catalogo |
| `GET` | `/catalogo/productos/ofertas` | Productos en oferta |
| `GET` | `/catalogo/productos/sugeridos` | Productos sugeridos |
| `GET` | `/catalogo/productos/{id}` | Detalle de producto |
| `GET` | `/catalogo/productos/{id}/relacionados?limit=4` | Productos relacionados |

Los servicios de catalogo estan en `src/services/catalogo.ts`. Sus schemas estan en `src/schemas/catalogo.ts`.

### Carrito

| Metodo | Endpoint | Uso |
|---|---|---|
| `POST` | `/carritos` | Crear carrito invitado |
| `GET` | `/carritos/{carritoId}` | Consultar carrito |
| `POST` | `/carritos/{carritoId}/items` | Agregar producto |
| `PATCH` | `/carritos/{carritoId}/items/{productoId}` | Cambiar cantidad |
| `DELETE` | `/carritos/{carritoId}/items/{productoId}` | Eliminar producto |
| `PUT` | `/carritos/{carritoId}/cupon` | Aplicar cupon |
| `DELETE` | `/carritos/{carritoId}/cupon` | Quitar cupon |

Los servicios estan en `src/services/carrito.ts` y el estado global en `src/store/carritoStore.ts`.

Solo se persiste el ID del carrito en `localStorage`, bajo la clave `petlove-carrito`. Los productos, cantidades y cupones se consultan al API y se mantienen como fuente de verdad. Las mutaciones se encadenan para evitar solicitudes simultaneas.

Si el carrito persistido ya no existe, el store elimina el estado de carrito antiguo y crea uno nuevo. Vaciarlo elimina los items uno por uno porque no existe una operacion masiva.

### Pedidos

| Metodo | Endpoint | Uso |
|---|---|---|
| `POST` | `/carritos/{carritoId}/pedido` | Crear pedido |
| `GET` | `/catalogo/pedidos/{id}` | Consultar detalle |
| `GET` | `/catalogo/pedidos/{id}/seguimiento` | Consultar seguimiento |

La implementacion esta en `src/services/pedidos.ts` y `src/store/pedidosStore.ts`. El store usa `sessionStorage` para recordar temporalmente un envio pendiente y evitar que el usuario repita el POST.

## Estado y funcionalidad

- El catalogo permite buscar, filtrar por categoria y atributos, ordenar y cargar mas resultados.
- El detalle muestra informacion, stock, ficha tecnica, modo de uso y productos relacionados.
- El carrito sincroniza productos, cantidades, subtotal, descuento y total con el API.
- El checkout valida datos de comprador, entrega y pago con Zod antes del envio.
- Se admiten Mercado Pago, tarjeta y Webpay Plus como metodos seleccionables.
- La confirmacion consulta el pedido por ID y presenta montos y estado.
- El historial veterinario usa tabs y datos locales o demostrativos.
- Las pantallas de perfil y agendamiento no tienen aun persistencia completa en el backend.

## Estado global

- `src/store/carritoStore.ts`: carrito invitado, persistencia del ID y mutaciones sincronizadas.
- `src/store/pedidosStore.ts`: estado de envio del pedido y proteccion ante envios duplicados.
- El proyecto ya usa Zustand. No se conserva el Context/Provider anterior del carrito.

## Componentes principales

- `components/UIKit/`: botones, campos, dropdowns, tarjetas, paginacion, enlaces, toggles e iconos.
- `components/CartItem`, `QuantityStepper`, `CouponBox` y `OrderSummary`: componentes del carrito.
- `components/FiltroTienda` y `OrdenTienda`: filtros y orden del catalogo.
- `components/ProductoIndividual/`: galeria, resumen, ficha tecnica, tabs y resenas.
- `components/DatosMascota`, `InformacionMascota` y componentes de tabs: informacion veterinaria.
- `layout/`: `Header`, `Footer`, `Body` y `MainLayout` compartidos por las rutas.

## Estructura

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layout/
│   ├── pages/
│   ├── schemas/
│   ├── services/
│   ├── store/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── TDATypes.tsx
├── vanilla html/
├── .env.example
├── package.json
├── pnpm-lock.yaml
├── tsconfig*.json
└── vite.config.ts
```

Los estilos viven junto a sus componentes o paginas. `src/index.css` registra los imports CSS globales. `vanilla html/` contiene vistas independientes y no forma parte de las rutas React.

## Convenciones

- Navegacion interna con `Link`, `NavLink` o `useNavigate`.
- Clases CSS con convencion BEM y prefijo `ui-` para componentes UIKit.
- Colores, tipografia, espaciado y radios obtenidos de las variables de `App.css`.
- TypeScript estricto, sin uso de `any` en el codigo nuevo.
- Validacion de datos externos con Zod.

## Limitaciones conocidas

- Las vistas de perfil, configuracion, mascota y agendamiento contienen datos locales o demostrativos; faltan integraciones completas de backend.
- No se implementa el procesamiento real de Mercado Pago, tarjeta o Webpay Plus.
- No hay script de pruebas automatizadas definido en `package.json`.
- No existe una ruta 404.
- La disponibilidad de los datos depende de que el API configurado sea accesible y admita solicitudes CORS.
