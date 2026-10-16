import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardCarrusel } from "../../components/CardCarrusel/CardCarrusel";
import { CardProducto } from "../../components/CardProducto/CardProducto";
import { Breadcrumbs } from "../../components/ProductoIndividual/Breadcrumbs/Breadcrumbs";
import { GaleriaProducto } from "../../components/ProductoIndividual/GaleriaProducto/GaleriaProducto";
import { ResenasProducto } from "../../components/ProductoIndividual/ResenasProducto/ResenasProducto";
import { ResumenProducto } from "../../components/ProductoIndividual/ResumenProducto/ResumenProducto";
import { TabsProducto } from "../../components/ProductoIndividual/TabsProducto/TabsProducto";
import { useCarrito } from "../../context/CarritoContext";
import { agregarProductoAlCarrito } from "../../services/carrito";

type ProductoDetalle = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precioOriginal?: number;
    imagenes?: string[];
    categoria: string;
    subcategoria: string;
    especie: string;
    sku?: string;
    fichaTecnica?: string;
    modoDeUso?: string;
    fichaTecnicaDetalle?: Record<string, string>;
};

function esFichaTecnicaDetalle(value: unknown): value is Record<string, string> {
    return typeof value === "object" && value !== null
        && Object.values(value).every((dato) => typeof dato === "string");
}

function esProductoDetalle(value: unknown): value is ProductoDetalle {
    return typeof value === "object" && value !== null
        && "id" in value && typeof value.id === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "descripcion" in value && typeof value.descripcion === "string"
        && "precio" in value && typeof value.precio === "number"
        && (!("precioOriginal" in value) || typeof value.precioOriginal === "number")
        && (!("imagenes" in value) || (Array.isArray(value.imagenes)
            && value.imagenes.every((imagen) => typeof imagen === "string")))
        && "categoria" in value && typeof value.categoria === "string"
        && "subcategoria" in value && typeof value.subcategoria === "string"
        && "especie" in value && typeof value.especie === "string"
        && (!("sku" in value) || typeof value.sku === "string")
        && (!("fichaTecnica" in value) || typeof value.fichaTecnica === "string")
        && (!("modoDeUso" in value) || typeof value.modoDeUso === "string")
        && (!("fichaTecnicaDetalle" in value) || esFichaTecnicaDetalle(value.fichaTecnicaDetalle));
}

type ProductoRelacionado = {
    id: string;
    nombre: string;
    precio: number;
    precioOriginal?: number;
    imagenes?: string[];
    categoria: string;
};

type EstadoAccionCarrito = "idle" | "agregando" | "agregado" | "error";

function esProductoRelacionado(value: unknown): value is ProductoRelacionado {
    return typeof value === "object" && value !== null
        && "id" in value && typeof value.id === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "precio" in value && typeof value.precio === "number"
        && (!("precioOriginal" in value) || typeof value.precioOriginal === "number")
        && (!("imagenes" in value) || (Array.isArray(value.imagenes)
            && value.imagenes.every((imagen) => typeof imagen === "string")))
        && "categoria" in value && typeof value.categoria === "string";
}

const productoEjemplo: ProductoDetalle = {
    id: "ejemplo",
    nombre: "Comedero Elevado 450 ml",
    descripcion: "Comedero elevado estilo gatitos, práctico para servir agua o alimento de manera cómoda y segura.",
    precio: 3690,
    precioOriginal: 4610,
    imagenes: ["https://placehold.co/600x600"],
    categoria: "Accesorios",
    subcategoria: "Platos y bebederos",
    especie: "Gato",
    fichaTecnica: "Capacidad: 400 ml.",
    modoDeUso: "Lavar con agua tibia antes del primer uso.",
};

export function ProductoIndividual() {
    const { id } = useParams();
    const { dispatch } = useCarrito();
    const [estadoProducto, setEstadoProducto] = useState({
        id,
        cargando: Boolean(id),
        producto: id ? null : productoEjemplo,
        error: null as string | null,
    });
    const [estadoRelacionados, setEstadoRelacionados] = useState({
        id,
        cargando: Boolean(id),
        productos: [] as ProductoRelacionado[],
        error: null as string | null,
    });
    // Vincular el estado al ID evita que otro producto herede el resultado anterior.
    const [estadoCarrito, setEstadoCarrito] = useState<{
        id: string | undefined;
        estado: EstadoAccionCarrito;
    }>({ id, estado: "idle" });
    const estadoCarritoActual = estadoCarrito.id === id ? estadoCarrito.estado : "idle";

    async function manejarAgregarAlCarrito() {
        if (!id) return;

        setEstadoCarrito({ id, estado: "agregando" });
        try {
            // Sincronizar la vista del carrito con el DTO que entrega el API.
            const carrito = await agregarProductoAlCarrito(producto?.id ?? id, 1);
            dispatch({ type: "SINCRONIZAR", carrito });
            setEstadoCarrito({ id, estado: "agregado" });
        } catch (error) {
            console.error("No se pudo agregar el producto al carrito.", error);
            setEstadoCarrito({ id, estado: "error" });
        }
    }

    useEffect(() => {
        if (!id) return;

        const productId = id;
        const controller = new AbortController();
        async function cargarProducto() {
            try {
                const response = await fetch(
                    `http://18.226.214.170:3000/api/v1/catalogo/productos/${encodeURIComponent(productId)}`,
                    { signal: controller.signal }
                );

                if (response.status === 404) {
                    throw new Error("No se encontró el producto solicitado.");
                }
                if (!response.ok) {
                    throw new Error(`No se pudo cargar el producto (${response.status}).`);
                }

                const data: unknown = await response.json();
                if (!esProductoDetalle(data)) {
                    throw new Error("La respuesta del producto tiene un formato inválido.");
                }

                setEstadoProducto({ id: productId, cargando: false, producto: data, error: null });
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("No se pudo cargar el detalle del producto.", error);
                    setEstadoProducto({
                        id: productId,
                        cargando: false,
                        producto: null,
                        error: error instanceof Error ? error.message : "No se pudo cargar el producto.",
                    });
                }
            }
        }

        void cargarProducto();

        return () => controller.abort();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        const productId = id;
        const controller = new AbortController();
        async function cargarRelacionados() {
            try {
                const response = await fetch(
                    `http://18.226.214.170:3000/api/v1/catalogo/productos/${encodeURIComponent(productId)}/relacionados`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`No se pudieron cargar los productos relacionados (${response.status}).`);
                }

                const data: unknown = await response.json();
                if (!Array.isArray(data) || !data.every(esProductoRelacionado)) {
                    throw new Error("La respuesta de productos relacionados tiene un formato inválido.");
                }

                setEstadoRelacionados({
                    id: productId,
                    cargando: false,
                    productos: data,
                    error: null,
                });
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("No se pudieron cargar los productos relacionados.", error);
                    setEstadoRelacionados({
                        id: productId,
                        cargando: false,
                        productos: [],
                        error: error instanceof Error ? error.message : "No se pudieron cargar los productos relacionados.",
                    });
                }
            }
        }

        void cargarRelacionados();

        return () => controller.abort();
    }, [id]);

    const estadoActual = estadoProducto.id === id
        ? estadoProducto
        : {
            id,
            cargando: Boolean(id),
            producto: id ? null : productoEjemplo,
            error: null,
        };
    const relacionadosActuales = estadoRelacionados.id === id
        ? estadoRelacionados
        : {
            id,
            cargando: Boolean(id),
            productos: [],
            error: null,
        };

    if (estadoActual.cargando) {
        return <section><div className="container"><p role="status">Cargando producto...</p></div></section>;
    }

    const producto = estadoActual.producto;
    if (estadoActual.error || !producto) {
        return (
            <section>
                <div className="container">
                    <p role="alert">{estadoActual.error ?? "No se encontró el producto solicitado."}</p>
                </div>
            </section>
        );
    }

    return (
        <main className="producto-detalle">
            <div className="producto-detalle__contenedor">
                <section className="producto-detalle__principal" aria-label="Detalle del producto">
                    <GaleriaProducto
                        key={producto.id}
                        nombre={producto.nombre}
                        imagenes={producto.imagenes ?? []}
                    />
                    <div className="producto-detalle__informacion">
                        <Breadcrumbs
                            especie={producto.especie}
                            categoria={producto.categoria}
                            subcategoria={producto.subcategoria}
                        />
                        <ResumenProducto
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                            precio={producto.precio}
                            precioOriginal={producto.precioOriginal}
                            categoria={producto.categoria}
                            subcategoria={producto.subcategoria}
                            sku={producto.sku}
                            agregando={estadoCarritoActual === "agregando"}
                            agregado={estadoCarritoActual === "agregado"}
                            errorCarrito={estadoCarritoActual === "error"}
                            puedeAgregar={Boolean(id)}
                            onAgregarAlCarrito={manejarAgregarAlCarrito}
                        />
                    </div>
                </section>
                <TabsProducto
                    descripcion={producto.descripcion}
                    modoDeUso={producto.modoDeUso}
                    fichaTecnica={producto.fichaTecnica}
                    fichaTecnicaDetalle={producto.fichaTecnicaDetalle}
                />
                <ResenasProducto />
            </div>
            <section className="producto-relacionados">
                <div className="producto-detalle__contenedor">
                    <h2>Productos relacionados</h2>
                    {relacionadosActuales.cargando && <p role="status">Cargando productos relacionados...</p>}
                    {relacionadosActuales.error && <p role="alert">{relacionadosActuales.error}</p>}
                    {!relacionadosActuales.cargando && !relacionadosActuales.error
                        && relacionadosActuales.productos.length === 0 && (
                            <p>No hay productos relacionados disponibles.</p>
                        )}
                    {relacionadosActuales.productos.length > 0 && (
                        <CardCarrusel>
                            {relacionadosActuales.productos.map((productoRelacionado) => (
                                <CardProducto
                                    key={productoRelacionado.id}
                                    id={productoRelacionado.id}
                                    titulo={productoRelacionado.nombre}
                                    urlImagen={productoRelacionado.imagenes?.[0] || "https://placehold.co/400x400?text=Sin+imagen"}
                                    precio={productoRelacionado.precio}
                                    precioOriginal={productoRelacionado.precioOriginal}
                                    categoria={productoRelacionado.categoria}
                                />
                            ))}
                        </CardCarrusel>
                    )}
                </div>
            </section>
        </main>
    );
}
