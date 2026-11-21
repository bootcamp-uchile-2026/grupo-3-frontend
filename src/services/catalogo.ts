import { z } from "zod";
import {
  categoriasCatalogoSchema,
  listarProductosQuerySchema,
  productoApiSchema,
  productoCatalogoViewSchema,
  productoDetalleViewSchema,
  productoOfertaViewSchema,
  productoRelacionadoQuerySchema,
  productoRelacionadoViewSchema,
  productosSugeridosQuerySchema,
} from "../schemas/catalogo";
import type {
  ListarProductosQuery,
  ProductoApi,
  ProductoCatalogoView,
  ProductoDetalleView,
  ProductoOfertaView,
  ProductoRelacionadoView,
  ProductoRelacionadoQuery,
  ProductosSugeridosQuery,
} from "../schemas/catalogo";
import { apiFetch, ApiError } from "./apiClient";

function serializarQuery<T extends Record<string, string | number | boolean | undefined>>(
  query: T,
): string {
  const parametros = new URLSearchParams();
  for (const clave in query) {
    const valor = query[clave];
    if (valor !== undefined) parametros.set(clave, String(valor));
  }
  const resultado = parametros.toString();
  return resultado ? `?${resultado}` : "";
}

type ResultadoValidacion<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string } };

function validarQuery<Output>(
  resultado: ResultadoValidacion<Output>,
  mensaje: string,
): Output {
  if (!resultado.success) {
    throw new ApiError(`${mensaje}: ${resultado.error.message}`);
  }
  return resultado.data;
}

export async function obtenerCategorias(signal?: AbortSignal) {
  return apiFetch("/catalogo/categorias", categoriasCatalogoSchema, { signal });
}

export async function obtenerProductos(
  query: ListarProductosQuery = {},
  signal?: AbortSignal,
) {
  const filtros = validarQuery(
    listarProductosQuerySchema.safeParse(query),
    "Los filtros del catálogo son inválidos",
  );
  return apiFetch(
    `/catalogo/productos${serializarQuery(filtros)}`,
    z.array(productoApiSchema),
    { signal },
  );
}

export async function obtenerOfertas(
  query: ProductosSugeridosQuery = {},
  signal?: AbortSignal,
) {
  const filtros = validarQuery(
    productosSugeridosQuerySchema.safeParse(query),
    "Los parámetros de ofertas son inválidos",
  );
  return apiFetch(
    `/catalogo/productos/ofertas${serializarQuery(filtros)}`,
    z.array(productoApiSchema),
    { signal },
  );
}

export async function obtenerSugeridos(
  query: ProductosSugeridosQuery = {},
  signal?: AbortSignal,
) {
  const filtros = validarQuery(
    productosSugeridosQuerySchema.safeParse(query),
    "Los parámetros de sugerencias son inválidos",
  );
  return apiFetch(
    `/catalogo/productos/sugeridos${serializarQuery(filtros)}`,
    z.array(productoApiSchema),
    { signal },
  );
}

export async function obtenerProducto(id: string, signal?: AbortSignal) {
  const productoId = z.string().min(1).parse(id);
  return apiFetch(
    `/catalogo/productos/${encodeURIComponent(productoId)}`,
    productoApiSchema,
    { signal },
  );
}

export async function obtenerProductosRelacionados(
  id: string,
  query: ProductoRelacionadoQuery,
  signal?: AbortSignal,
) {
  const productoId = z.string().min(1).parse(id);
  const filtros = validarQuery(
    productoRelacionadoQuerySchema.safeParse(query),
    "Los parámetros de productos relacionados son inválidos",
  );
  return apiFetch(
    `/catalogo/productos/${encodeURIComponent(productoId)}/relacionados${serializarQuery(filtros)}`,
    z.array(productoApiSchema),
    { signal },
  );
}

export function adaptarProductoCatalogo(producto: ProductoApi): ProductoCatalogoView {
  return productoCatalogoViewSchema.parse({
    ...producto,
    precioOriginal: producto.precioOriginal ?? producto.precio,
  });
}

export function adaptarProductoOferta(producto: ProductoApi): ProductoOfertaView {
  return productoOfertaViewSchema.parse({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    precioOriginal: producto.precioOriginal ?? producto.precio,
    imagenes: producto.imagenes,
    categoria: producto.categoria,
    calificacionPromedio: producto.calificacionPromedio,
  });
}

export function adaptarProductoDetalle(producto: ProductoApi): ProductoDetalleView {
  return productoDetalleViewSchema.parse({
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    precioOriginal: producto.precioOriginal,
    imagenes: producto.imagenes,
    categoria: producto.categoria,
    subcategoria: producto.subcategoria ?? producto.categoria,
    especie: producto.especie,
    sku: producto.sku,
    stock: producto.stock,
    calificacionPromedio: producto.totalResenas > 0 ? producto.calificacionPromedio : undefined,
    fichaTecnica: producto.fichaTecnica,
    modoDeUso: producto.modoDeUso,
    fichaTecnicaDetalle: producto.fichaTecnicaDetalle
      ? Object.fromEntries(
          Object.entries(producto.fichaTecnicaDetalle).map(([clave, valor]) => [
            clave,
            String(valor),
          ]),
        )
      : undefined,
  });
}

export function adaptarProductoRelacionado(producto: ProductoApi): ProductoRelacionadoView {
  return productoRelacionadoViewSchema.parse({
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    precioOriginal: producto.precioOriginal,
    imagenes: producto.imagenes,
    categoria: producto.categoria,
    calificacionPromedio: producto.totalResenas > 0 ? producto.calificacionPromedio : undefined,
  });
}
