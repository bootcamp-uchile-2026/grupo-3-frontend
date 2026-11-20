import { z } from "zod";

const montoCLPSchema = z.number().int().nonnegative();
export const productoIdSchema = z.string().min(1);
export const cantidadCarritoSchema = z.number().int().positive();

export const itemCarritoSchema = z.object({
  productoId: productoIdSchema,
  nombre: z.string(),
  marca: z.string(),
  imagen: z.string(),
  precioOriginal: montoCLPSchema,
  precioUnitario: montoCLPSchema,
  cantidad: cantidadCarritoSchema,
  subtotal: montoCLPSchema,
});

export const itemCarritoApiSchema = z.object({
  productoId: productoIdSchema,
  nombre: z.string(),
  marca: z.string().optional(),
  imagen: z.string(),
  precioOriginal: montoCLPSchema.optional(),
  precioUnitario: montoCLPSchema,
  cantidad: cantidadCarritoSchema,
  subtotal: montoCLPSchema,
});

export const carritoApiDtoSchema = z.object({
  id: productoIdSchema,
  items: z.array(itemCarritoApiSchema),
  totalArticulos: z.number().int().nonnegative(),
  subtotal: montoCLPSchema,
  cuponAplicado: z.string().optional(),
  descuentoCupon: montoCLPSchema.optional(),
  total: montoCLPSchema,
});

export const carritoStateSchema = z.object({
  carritoId: productoIdSchema.nullable(),
  productos: z.array(itemCarritoSchema),
  cuponAplicado: z.string().nullable(),
  descuentoCupon: montoCLPSchema,
  estado: z.enum(["idle", "loading", "ready", "error"]),
  error: z.string().nullable(),
});

export const carritoPersistidoSchema = z.object({
  carritoId: productoIdSchema.nullable(),
});

export const carritoSnapshotSchema = z.object({
  carritoId: productoIdSchema,
  productos: z.array(itemCarritoSchema),
  cuponAplicado: z.string().nullable(),
  descuentoCupon: montoCLPSchema,
});

export const agregarProductoAlCarritoInputSchema = z.object({
  producto: itemCarritoSchema,
});

export const eliminarProductoDelCarritoInputSchema = z.object({
  productoId: productoIdSchema,
});

export const cambiarCantidadProductoInputSchema = z.object({
  productoId: productoIdSchema,
  delta: z.number().int(),
});

export const agregarProductoStoreInputSchema = z.object({
  productoId: productoIdSchema,
  cantidad: cantidadCarritoSchema.optional(),
});

export const actualizarCantidadStoreInputSchema = z.object({
  productoId: productoIdSchema,
  cantidad: cantidadCarritoSchema,
});

export const agregarAlCarritoApiInputSchema = z.object({
  carritoId: productoIdSchema,
  productoId: productoIdSchema,
  cantidad: cantidadCarritoSchema.optional(),
});

export const actualizarItemCarritoApiInputSchema = z.object({
  carritoId: productoIdSchema,
  productoId: productoIdSchema,
  cantidad: cantidadCarritoSchema,
});

export const obtenerCarritoApiInputSchema = z.object({
  carritoId: productoIdSchema,
});

export const aplicarCuponCarritoApiInputSchema = z.object({
  carritoId: productoIdSchema,
  codigoCupon: z.string().trim().min(1),
});

export const quitarCuponCarritoApiInputSchema = z.object({
  carritoId: productoIdSchema,
});

export type ItemCarritoApiDto = z.infer<typeof itemCarritoApiSchema>;
export type CarritoApiDto = z.infer<typeof carritoApiDtoSchema>;
export type ItemCarrito = z.infer<typeof itemCarritoSchema>;
export type CarritoState = z.infer<typeof carritoStateSchema>;
export type CarritoPersistido = z.infer<typeof carritoPersistidoSchema>;
export type AgregarProductoStoreInput = z.infer<typeof agregarProductoStoreInputSchema>;
export type ActualizarCantidadStoreInput = z.infer<typeof actualizarCantidadStoreInputSchema>;
export type CarritoSnapshot = z.infer<typeof carritoSnapshotSchema>;
export type AgregarProductoAlCarritoInput = z.infer<
  typeof agregarProductoAlCarritoInputSchema
>;
export type EliminarProductoDelCarritoInput = z.infer<
  typeof eliminarProductoDelCarritoInputSchema
>;
export type CambiarCantidadProductoInput = z.infer<
  typeof cambiarCantidadProductoInputSchema
>;
export type AgregarAlCarritoApiInput = z.infer<typeof agregarAlCarritoApiInputSchema>;
export type ActualizarItemCarritoApiInput = z.infer<typeof actualizarItemCarritoApiInputSchema>;
export type ObtenerCarritoApiInput = z.infer<typeof obtenerCarritoApiInputSchema>;
export type AplicarCuponCarritoApiInput = z.infer<typeof aplicarCuponCarritoApiInputSchema>;
export type QuitarCuponCarritoApiInput = z.infer<typeof quitarCuponCarritoApiInputSchema>;
