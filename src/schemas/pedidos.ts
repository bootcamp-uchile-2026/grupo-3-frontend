import { z } from "zod";

const campoObligatorio = z.string().trim().min(1);
const montoCLP = z.number().int().nonnegative();

export const idPedidoSchema = campoObligatorio;
export const referenciaPedidoSchema = z.object({ id: idPedidoSchema });
export const tipoComprobanteSchema = z.enum(["Boleta", "Factura"]);
export const metodoPagoSchema = z.enum(["MercadoPago", "Tarjeta", "WebpayPlus"]);

const datosCompradorSchema = z.object({
  nombre: campoObligatorio,
  apellidos: campoObligatorio,
  correoElectronico: z.string().trim().pipe(z.email()),
  telefono: campoObligatorio,
  tipoComprobante: tipoComprobanteSchema,
  rutDocumento: campoObligatorio,
  metodoPago: metodoPagoSchema,
  aceptaTerminos: z.boolean().refine((valor) => valor, "Debes aceptar los términos y condiciones."),
});

export const crearPedidoSchema = z.discriminatedUnion("tipoEntrega", [
  datosCompradorSchema.extend({
    tipoEntrega: z.literal("EnvioNormal"),
    region: campoObligatorio,
    comuna: campoObligatorio,
    direccion: campoObligatorio,
    departamentoOficina: campoObligatorio.optional(),
    referencia: campoObligatorio.optional(),
  }),
  datosCompradorSchema.extend({
    tipoEntrega: z.literal("RetiroEnTienda"),
    sucursalRetiro: campoObligatorio,
  }),
]);

const itemPedidoSchema = z.object({
  productoId: campoObligatorio,
  nombre: z.string(),
  imagen: z.string(),
  cantidad: z.number().int().positive(),
  precioUnitario: montoCLP,
  subtotal: montoCLP,
});

export const pedidoSchema = z.object({
  id: idPedidoSchema,
  nombreCliente: z.string(),
  correoElectronico: z.string(),
  telefono: z.string(),
  modoEntrega: z.string(),
  tiempoEstimadoEntrega: z.string(),
  direccionEntrega: z.string().nullish(),
  sucursalRetiro: z.string().nullish(),
  items: z.array(itemPedidoSchema),
  subtotal: montoCLP,
  costoEnvio: montoCLP,
  descuento: montoCLP,
  total: montoCLP,
  estadoPedido: campoObligatorio,
  fechaCreacion: z.iso.datetime({ offset: true }),
});

const pasoSeguimientoSchema = z.object({
  paso: campoObligatorio,
  completado: z.boolean(),
  fecha: z.iso.datetime({ offset: true }).nullable(),
});

export const seguimientoPedidoSchema = z.object({
  numeroOrden: idPedidoSchema,
  estadoActual: campoObligatorio,
  // OpenAPI declara cadenas y muestra pasos estructurados en su ejemplo.
  historialPasos: z.union([z.array(z.string()), z.array(pasoSeguimientoSchema)]),
});

export type CreatePedidoDto = z.infer<typeof crearPedidoSchema>;
export type PedidoCreado = z.infer<typeof pedidoSchema>;
export type SeguimientoPedido = z.infer<typeof seguimientoPedidoSchema>;
export type TipoComprobante = z.infer<typeof tipoComprobanteSchema>;
export type TipoEntrega = CreatePedidoDto["tipoEntrega"];
export type MetodoPago = z.infer<typeof metodoPagoSchema>;
