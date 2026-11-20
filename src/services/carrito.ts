<<<<<<< HEAD
const API_URL = import.meta.env.VITE_API_URL ?? "http://18.226.214.170:3000"
const CARRITO_API = `${API_URL}/api/v1/carritos`;
export const USUARIO_ID_CARRITO = "duenio-123";

const CLAVE_CARRITO_ID = "petlove-carrito-id";

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
=======
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
>>>>>>> develop

type ResultadoValidacion<T> =
    | { success: true; data: T }
    | { success: false; error: { message: string } };

<<<<<<< HEAD
type Operacion = "crear" | "obtener" | "agregar" | "actualizar" | "eliminar" ;

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

async function launchFailureErrors(response: Response, operacion: Operacion): Promise<void> {
    if(response.ok) return;
    const detalle = await response.text();
    throw new Error (
    `No se pudo ${operacion} el carrito
    (${response.status})${detalle ? `: ${detalle}` : "."}`, );
}

let creandoCarrito: Promise<string> | null = null;

function crearCarrito(): Promise<string> {
    creandoCarrito ??= (async () => {
        try {
            const response = await fetch(CARRITO_API, { method: "POST" });
            await launchFailureErrors(response, "crear");

            const data: unknown = await response.json();
            const id = typeof data === "object" && data !== null
                ? ("carritoId" in data ? data.carritoId : "id" in data ? data.id : undefined)
                : undefined;

            if (typeof id !== "string" && typeof id !== "number") {
                throw new Error("La API no devolvió el id del carrito.");
            }

            const carritoId = String(id);
            localStorage.setItem(CLAVE_CARRITO_ID, carritoId);
            return carritoId;
        } finally {
            creandoCarrito = null;
        }
    })();
    return creandoCarrito;
}

async function obtenerCarritoId(): Promise<string> {
    return localStorage.getItem(CLAVE_CARRITO_ID) ?? crearCarrito();
}

function urlItem(carritoId: string, productoId: string): string {
    return `${CARRITO_API}/${encodeURIComponent(carritoId)}/items/${encodeURIComponent(productoId)}`;
}

async function carritoDesdeRespuesta(
    response: Response,
    operacion: Operacion,
): Promise<CarritoApiResponse> {
    await launchFailureErrors(response, operacion);

    const texto = await response.text();
    if (texto) {
        try {
            const data: unknown = JSON.parse(texto);
            if (esCarritoApiResponse(data)) return data;
        } catch {
            // La respuesta no es JSON: se vuelve a pedir el carrito abajo.
        }
    }
    return obtenerCarrito();
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
    let carritoId = await obtenerCarritoId();
    let response = await fetch(`${CARRITO_API}/${encodeURIComponent(carritoId)}`);

    // El id guardado ya no existe en el servidor → se crea un carrito nuevo.
    if (response.status === 404) {
        localStorage.removeItem(CLAVE_CARRITO_ID);
        carritoId = await crearCarrito();
        response = await fetch(`${CARRITO_API}/${encodeURIComponent(carritoId)}`);
    }

    await launchFailureErrors(response, "obtener");

    const data: unknown = await response.json();
    if (!esCarritoApiResponse(data)) {
        throw new Error("La respuesta del carrito tiene un formato inválido.");
    }
    return data;
}

export async function agregarProductoAlCarrito(
    productoId: string,
    cantidad: number,
): Promise<CarritoApiResponse> {
    const carritoId = await obtenerCarritoId();
    const response = await fetch(`${CARRITO_API}/${encodeURIComponent(carritoId)}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId, cantidad }),
    });
    return carritoDesdeRespuesta(response, "agregar");
=======
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
>>>>>>> develop
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

<<<<<<< HEAD
    const carritoId = await obtenerCarritoId();
    const response = await fetch(urlItem(carritoId, productoId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad }),
    });
    return carritoDesdeRespuesta(response, "actualizar");
=======
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
>>>>>>> develop
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
<<<<<<< HEAD
): Promise<CarritoApiResponse> {
    const carritoId = await obtenerCarritoId();
    const response = await fetch(urlItem(carritoId, productoId), { method: "DELETE" });
    return carritoDesdeRespuesta(response, "eliminar");
=======
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
>>>>>>> develop
}
