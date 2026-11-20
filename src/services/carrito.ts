import { carritoApiResponseSchema } from "../schemas/carrito";
import type { CarritoApiResponse } from "../schemas/carrito";

const CARRITO_API_BASE_URL = "http://18.226.214.170:3000/api/v1/catalogo/carrito";
export const USUARIO_ID_CARRITO = "duenio-123";

export type { CarritoApiResponse, ItemCarrito as ItemCarritoApi } from "../schemas/carrito";

async function leerCarritoResponse(
    response: Response,
    operacion: "obtener" | "agregar" | "actualizar" | "eliminar",
): Promise<CarritoApiResponse> {
    if (!response.ok) {
        const detalle = await response.text();
        throw new Error(
            `No se pudo ${operacion} el carrito (${response.status})${detalle ? `: ${detalle}` : "."}`,
        );
    }

    const data: unknown = await response.json();
    const resultado = carritoApiResponseSchema.safeParse(data);
    if (!resultado.success) {
        throw new Error(
            `La respuesta del carrito tiene un formato inválido: ${resultado.error.message}`,
        );
    }
    return resultado.data;
}

export async function obtenerCarrito(): Promise<CarritoApiResponse> {
    const response = await fetch(
        `${CARRITO_API_BASE_URL}?usuarioId=${encodeURIComponent(USUARIO_ID_CARRITO)}`,
    );
    return leerCarritoResponse(response, "obtener");
}

export async function agregarProductoAlCarrito(
    productoId: string,
    cantidad: number,
): Promise<CarritoApiResponse> {
    // El backend requiere productoId, cantidad y usuarioId en cada alta.
    const response = await fetch(`${CARRITO_API_BASE_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productoId,
            cantidad,
            usuarioId: USUARIO_ID_CARRITO,
        }),
    });
    return leerCarritoResponse(response, "agregar");
}

export async function actualizarCantidadProducto(
    productoId: string,
    cantidad: number,
): Promise<CarritoApiResponse> {
    if (!Number.isInteger(cantidad) || cantidad < 1) {
        throw new Error("La cantidad debe ser un número entero mayor que cero.");
    }

    const response = await fetch(
        `${CARRITO_API_BASE_URL}/items/${encodeURIComponent(productoId)}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cantidad,
                usuarioId: USUARIO_ID_CARRITO,
            }),
        },
    );
    return leerCarritoResponse(response, "actualizar");
}

export async function eliminarProductoDelCarrito(
    productoId: string,
): Promise<CarritoApiResponse> {
    const response = await fetch(
        // El contrato DELETE recibe usuarioId en query, no en el body.
        `${CARRITO_API_BASE_URL}/items/${encodeURIComponent(productoId)}?usuarioId=${encodeURIComponent(USUARIO_ID_CARRITO)}`,
        { method: "DELETE" },
    );
    return leerCarritoResponse(response, "eliminar");
}
