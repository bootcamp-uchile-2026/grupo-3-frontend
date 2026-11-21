import { z } from "zod";
import {
  crearPedidoSchema,
  idPedidoSchema,
  pedidoSchema,
  referenciaPedidoSchema,
  seguimientoPedidoSchema,
  type CreatePedidoDto,
} from "../schemas/pedidos";
import { apiFetch, ApiError } from "./apiClient";

export type { CreatePedidoDto, PedidoCreado, SeguimientoPedido } from "../schemas/pedidos";

const rutaPedidos = "/catalogo/pedidos";
const respuestaCreacionSchema = z.union([pedidoSchema, referenciaPedidoSchema]);

export class DetallePedidoPendienteError extends ApiError {
  constructor(pedidoId: string) {
    super(`El servidor devolvió el número de pedido ${pedidoId}, pero no pudimos cargar el detalle. Consulta la confirmación sin volver a realizar la compra.`);
  }
}

function codificarId(id: string): string {
  const resultado = idPedidoSchema.safeParse(id);
  if (!resultado.success) {
    throw new ApiError("Falta un identificador válido.", 400);
  }
  return encodeURIComponent(resultado.data);
}

export async function crearPedido(carritoId: string, datos: CreatePedidoDto) {
  const id = codificarId(carritoId);
  const resultado = crearPedidoSchema.safeParse(datos);
  if (!resultado.success) {
    throw new ApiError("Revisa los datos obligatorios de contacto, entrega y pago.", 400);
  }

  let respuesta: z.infer<typeof respuestaCreacionSchema>;
  try {
    respuesta = await apiFetch(`/carritos/${id}/pedido`, respuestaCreacionSchema, {
      method: "POST",
      body: JSON.stringify(resultado.data),
    });
  } catch (error) {
    if (!(error instanceof ApiError)) throw error;

    switch (error.status) {
      case 400:
        throw new ApiError("Revisa los datos del pedido y verifica que el carrito tenga productos.", 400);
      case 404:
        throw new ApiError("El carrito ya no está disponible. Puede haber expirado o haberse usado para una compra. Revisa si recibiste una confirmación antes de volver a comprar.", 404);
      case 409:
        throw new ApiError("El stock cambió. Revisa las cantidades en el carrito antes de volver a intentar.", 409);
      default:
        throw error;
    }
  }

  if ("items" in respuesta) return respuesta;

  // Con el número de orden podemos recuperar el detalle sin repetir el POST.
  try {
    const pedido = await obtenerPedido(respuesta.id);
    if (pedido.id !== respuesta.id) throw new Error("El identificador del pedido no coincide.");
    return pedido;
  } catch {
    throw new DetallePedidoPendienteError(respuesta.id);
  }
}

export async function obtenerPedido(id: string, signal?: AbortSignal) {
  try {
    return await apiFetch(`${rutaPedidos}/${codificarId(id)}`, pedidoSchema, { signal });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new ApiError("No se encontró el pedido solicitado.", 404);
    }
    throw error;
  }
}

export async function obtenerSeguimientoPedido(id: string, signal?: AbortSignal) {
  return apiFetch(`${rutaPedidos}/${codificarId(id)}/seguimiento`, seguimientoPedidoSchema, { signal });
}
