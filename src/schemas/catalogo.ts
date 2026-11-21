import { z } from "zod";

const montoSchema = z.number().finite().nonnegative();

export const productoApiSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  sku: z.string(),
  tipo: z.string(),
  descripcion: z.string(),
  marca: z.string(),
  precio: montoSchema,
  precioOriginal: montoSchema.optional(),
  stock: z.number().finite().nonnegative(),
  imagenes: z.array(z.string()),
  categoria: z.string(),
  subcategoria: z.string().optional(),
  especie: z.string(),
  rangoEdad: z.string().optional(),
  material: z.string().optional(),
  descuento: z.number().finite().optional(),
  cantidad: z.number().finite().optional(),
  fichaTecnica: z.string().optional(),
  modoDeUso: z.string().optional(),
  fichaTecnicaDetalle: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
  calificacionPromedio: z.number().finite().min(0).max(5),
  totalResenas: z.number().finite().nonnegative(),
});

export const productoCatalogoViewSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  precio: montoSchema,
  precioOriginal: montoSchema.optional(),
  imagenes: z.array(z.string()).min(1),
  categoria: z.string(),
  marca: z.string().optional(),
  descuento: z.number().finite().optional(),
  calificacionPromedio: z.number().finite().min(0).max(5).optional(),
  especie: z.string().optional(),
  subcategoria: z.string().optional(),
  descripcion: z.string().optional(),
  fichaTecnica: z.string().optional(),
  modoDeUso: z.string().optional(),
  fichaTecnicaDetalle: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
}).catchall(z.unknown());

export const productoOfertaViewSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  precio: montoSchema,
  precioOriginal: montoSchema,
  imagenes: z.array(z.string()).min(1),
  categoria: z.string(),
  calificacionPromedio: z.number().finite().min(0).max(5).optional(),
});

export const productoDetalleViewSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  precio: montoSchema,
  precioOriginal: montoSchema.optional(),
  imagenes: z.array(z.string()).optional(),
  categoria: z.string(),
  subcategoria: z.string(),
  especie: z.string(),
  sku: z.string().optional(),
  stock: montoSchema.optional(),
  calificacionPromedio: productoApiSchema.shape.calificacionPromedio.optional(),
  fichaTecnica: z.string().optional(),
  modoDeUso: z.string().optional(),
  fichaTecnicaDetalle: z.record(z.string(), z.string()).optional(),
});

export const productoRelacionadoViewSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  precio: montoSchema,
  precioOriginal: montoSchema.optional(),
  imagenes: z.array(z.string()).optional(),
  categoria: z.string(),
  calificacionPromedio: productoApiSchema.shape.calificacionPromedio.optional(),
});

export const categoriasCatalogoSchema = z.array(
  z.object({
    id: z.string(),
    nombre: z.string(),
    imagen: z.string(),
    ruta: z.string(),
  }).catchall(z.unknown()),
);

export const listarProductosQuerySchema = z.object({
  buscar: z.string().optional(),
  especie: z.string().optional(),
  categoria: z.string().optional(),
  subcategoria: z.string().optional(),
  rangoEdad: z.string().optional(),
  material: z.string().optional(),
  marca: z.string().optional(),
  enOferta: z.boolean().optional(),
  orden: z.enum(["popularidad", "precio_asc", "precio_desc", "calificacion"]).optional(),
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
});

export const productosSugeridosQuerySchema = z.object({
  limit: z.number().int().positive().optional(),
});

export const productoRelacionadoQuerySchema = z.object({
  limit: z.number().int().positive(),
});

export type ProductoApi = z.infer<typeof productoApiSchema>;
export type ProductoCatalogoView = z.infer<typeof productoCatalogoViewSchema>;
export type ProductoOfertaView = z.infer<typeof productoOfertaViewSchema>;
export type ProductoDetalleView = z.infer<typeof productoDetalleViewSchema>;
export type ProductoRelacionadoView = z.infer<typeof productoRelacionadoViewSchema>;
export type CategoriaCatalogo = z.infer<typeof categoriasCatalogoSchema>[number];
export type ListarProductosQuery = z.infer<typeof listarProductosQuerySchema>;
export type ProductosSugeridosQuery = z.infer<typeof productosSugeridosQuerySchema>;
export type ProductoRelacionadoQuery = z.infer<typeof productoRelacionadoQuerySchema>;
