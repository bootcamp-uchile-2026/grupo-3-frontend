const CARRITO_API_URL = "http://18.226.214.170:3000/api/v1/catalogo/carrito/items";
const USUARIO_ID_PRUEBA = "duenio-123";

export async function agregarProductoAlCarrito(productoId: string, cantidad: number): Promise<void> {
    const response = await fetch(CARRITO_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productoId,
            cantidad,
            usuarioId: USUARIO_ID_PRUEBA,
        }),
    });

    if (!response.ok) {
        throw new Error(`No se pudo agregar el producto al carrito (${response.status}).`);
    }
}
