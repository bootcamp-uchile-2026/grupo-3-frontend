import { z } from "zod";

const montoCLPSchema = z.number().int().nonnegative();
const cantidadSchema = z.number().int().positive();

export const itemCarritoSchema = z.object({
  productoId: z.string().min(1),
  nombre: z.string(),
  marca: z.string(),
  imagen: z.string(),
  precioOriginal: montoCLPSchema,
  precioUnitario: montoCLPSchema,
  cantidad: cantidadSchema,
  subtotal: montoCLPSchema,
});

export const carritoApiResponseSchema = z.object({
  items: z.array(itemCarritoSchema),
  totalArticulos: z.number().int().nonnegative(),
  subtotal: montoCLPSchema,
  cuponAplicado: z.string().nullable().optional(),
  descuentoCupon: montoCLPSchema,
  total: montoCLPSchema,
});

export const carritoStateSchema = z.object({
  productos: z.array(itemCarritoSchema),
  cuponAplicado: z.string().nullable(),
  descuentoCupon: montoCLPSchema,
});

export const agregarProductoAlCarritoInputSchema = z.object({
  producto: itemCarritoSchema,
});

export const eliminarProductoDelCarritoInputSchema = z.object({
  productoId: z.string().min(1),
});

export const cambiarCantidadProductoInputSchema = z.object({
  productoId: z.string().min(1),
  delta: z.number().int(),
});

export const sincronizarCarritoInputSchema = z.object({
  carrito: carritoApiResponseSchema,
});

export type ItemCarrito = z.infer<typeof itemCarritoSchema>;
export type CarritoApiResponse = z.infer<typeof carritoApiResponseSchema>;
export type CarritoState = z.infer<typeof carritoStateSchema>;
export type AgregarProductoAlCarritoInput = z.infer<
  typeof agregarProductoAlCarritoInputSchema
>;
export type EliminarProductoDelCarritoInput = z.infer<
  typeof eliminarProductoDelCarritoInputSchema
>;
export type CambiarCantidadProductoInput = z.infer<
  typeof cambiarCantidadProductoInputSchema
>;
export type SincronizarCarritoInput = z.infer<
  typeof sincronizarCarritoInputSchema
>;
