const CARRITO_API_BASE_URL = "http://18.226.214.170:3000/api/v1/catalogo/carrito";
export const USUARIO_ID_CARRITO = "duenio-123";

// Refleja la estructura del item que devuelve el endpoint del carrito.
export type ItemCarritoApi = {
    productoId: string;
    nombre: string;
    marca: string;
    imagen: string;
    precioOriginal: number;
    precioUnitario: number;
    cantidad: number;
    subtotal: number;
};

export type CarritoApiResponse = {
    items: ItemCarritoApi[];
    totalArticulos: number;
    subtotal: number;
    cuponAplicado?: string | null;
    descuentoCupon: number;
    total: number;
};

function esItemCarritoApi(value: unknown): value is ItemCarritoApi {
    return typeof value === "object" && value !== null
        && "productoId" in value && typeof value.productoId === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "marca" in value && typeof value.marca === "string"
        && "imagen" in value && typeof value.imagen === "string"
        && "precioOriginal" in value && typeof value.precioOriginal === "number"
        && "precioUnitario" in value && typeof value.precioUnitario === "number"
        && "cantidad" in value && typeof value.cantidad === "number"
        && "subtotal" in value && typeof value.subtotal === "number";
}

function esCarritoApiResponse(value: unknown): value is CarritoApiResponse {
    return typeof value === "object" && value !== null
        && "items" in value && Array.isArray(value.items)
        && value.items.every(esItemCarritoApi)
        && "totalArticulos" in value && typeof value.totalArticulos === "number"
        && "subtotal" in value && typeof value.subtotal === "number"
        && (!("cuponAplicado" in value) || value.cuponAplicado === null || typeof value.cuponAplicado === "string")
        && "descuentoCupon" in value && typeof value.descuentoCupon === "number"
        && "total" in value && typeof value.total === "number";
}

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
    if (!esCarritoApiResponse(data)) {
        throw new Error("La respuesta del carrito tiene un formato inválido.");
    }
    return data;
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
