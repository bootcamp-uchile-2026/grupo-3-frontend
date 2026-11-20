import {
    agregarAlCarritoApiInputSchema,
    actualizarItemCarritoApiInputSchema,
    aplicarCuponCarritoApiInputSchema,
    carritoApiDtoSchema,
    carritoSnapshotSchema,
    eliminarProductoDelCarritoInputSchema,
    obtenerCarritoApiInputSchema,
    quitarCuponCarritoApiInputSchema,
} from "../schemas/carrito";
import type { CarritoApiDto, CarritoSnapshot } from "../schemas/carrito";
import { apiFetch, ApiError } from "./apiClient";

export const USUARIO_ID_CARRITO = "duenio-123";

export type { ItemCarrito as ItemCarritoApi } from "../schemas/carrito";

type ResultadoValidacion<T> =
    | { success: true; data: T }
    | { success: false; error: { message: string } };

function adaptarCarritoApi(carrito: CarritoApiDto): CarritoSnapshot {
    return carritoSnapshotSchema.parse({
        carritoId: carrito.id,
        productos: carrito.items.map((item) => ({
            ...item,
            marca: item.marca ?? "",
            precioOriginal: item.precioOriginal ?? item.precioUnitario,
        })),
        cuponAplicado: carrito.cuponAplicado ?? null,
        descuentoCupon: carrito.descuentoCupon ?? 0,
    });
}

function validarEntrada<Output>(
    resultado: ResultadoValidacion<Output>,
    mensaje: string,
): Output {
    if (!resultado.success) {
        throw new ApiError(`${mensaje}: ${resultado.error.message}`);
    }
    return resultado.data;
}

export async function crearCarritoInvitado(signal?: AbortSignal): Promise<CarritoSnapshot> {
    const carrito = await apiFetch("/carritos", carritoApiDtoSchema, {
        method: "POST",
        signal,
    });
    return adaptarCarritoApi(carrito);
}

export async function obtenerCarritoPorId(
    carritoId: string,
    signal?: AbortSignal,
): Promise<CarritoSnapshot> {
    const entrada = validarEntrada(
        obtenerCarritoApiInputSchema.safeParse({ carritoId }),
        "El identificador del carrito es inválido",
    );
    const carrito = await apiFetch(
        `/carritos/${encodeURIComponent(entrada.carritoId)}`,
        carritoApiDtoSchema,
        { signal },
    );
    return adaptarCarritoApi(carrito);
}

export async function agregarItemAlCarritoApi(
    valores: { carritoId: string; productoId: string; cantidad?: number },
): Promise<CarritoSnapshot> {
    const entrada = validarEntrada(
        agregarAlCarritoApiInputSchema.safeParse(valores),
        "Los datos del producto son inválidos",
    );
    const carrito = await apiFetch(
        `/carritos/${encodeURIComponent(entrada.carritoId)}/items`,
        carritoApiDtoSchema,
        {
            method: "POST",
            body: JSON.stringify({
                productoId: entrada.productoId,
                ...(entrada.cantidad !== undefined && { cantidad: entrada.cantidad }),
            }),
        },
    );
    return adaptarCarritoApi(carrito);
}

export async function actualizarItemCarritoApi(
    valores: { carritoId: string; productoId: string; cantidad: number },
): Promise<CarritoSnapshot> {
    const entrada = validarEntrada(
        actualizarItemCarritoApiInputSchema.safeParse(valores),
        "La cantidad del producto es inválida",
    );
    const carrito = await apiFetch(
        `/carritos/${encodeURIComponent(entrada.carritoId)}/items/${encodeURIComponent(entrada.productoId)}`,
        carritoApiDtoSchema,
        {
            method: "PATCH",
            body: JSON.stringify({ cantidad: entrada.cantidad }),
        },
    );
    return adaptarCarritoApi(carrito);
}

export async function eliminarItemDelCarritoApi(
    carritoId: string,
    productoId: string,
): Promise<CarritoSnapshot> {
    const entrada = validarEntrada(
        eliminarProductoDelCarritoInputSchema.safeParse({ productoId }),
        "El identificador del producto es inválido",
    );
    const cart = validarEntrada(
        obtenerCarritoApiInputSchema.safeParse({ carritoId }),
        "El identificador del carrito es inválido",
    );
    const carrito = await apiFetch(
        `/carritos/${encodeURIComponent(cart.carritoId)}/items/${encodeURIComponent(entrada.productoId)}`,
        carritoApiDtoSchema,
        { method: "DELETE" },
    );
    return adaptarCarritoApi(carrito);
}

export async function aplicarCuponCarritoApi(
    valores: { carritoId: string; codigoCupon: string },
): Promise<CarritoSnapshot> {
    const entrada = validarEntrada(
        aplicarCuponCarritoApiInputSchema.safeParse(valores),
        "El código del cupón es inválido",
    );
    const carrito = await apiFetch(
        `/carritos/${encodeURIComponent(entrada.carritoId)}/cupon`,
        carritoApiDtoSchema,
        {
            method: "PUT",
            body: JSON.stringify({ codigoCupon: entrada.codigoCupon }),
        },
    );
    return adaptarCarritoApi(carrito);
}

export async function quitarCuponCarritoApi(carritoId: string): Promise<CarritoSnapshot> {
    const entrada = validarEntrada(
        quitarCuponCarritoApiInputSchema.safeParse({ carritoId }),
        "El identificador del carrito es inválido",
    );
    const carrito = await apiFetch(
        `/carritos/${encodeURIComponent(entrada.carritoId)}/cupon`,
        carritoApiDtoSchema,
        { method: "DELETE" },
    );
    return adaptarCarritoApi(carrito);
}
