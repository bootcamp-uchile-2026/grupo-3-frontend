import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardProducto } from "../../components/CardProducto/CardProducto";
import { useCarrito } from "../../context/CarritoContext";
import { agregarProductoAlCarrito } from "../../services/carrito";

type ProductoDetalle = {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precioOriginal?: number;
    imagenes: string[];
    categoria: string;
    subcategoria: string;
    especie: string;
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
        && "imagenes" in value && Array.isArray(value.imagenes)
        && value.imagenes.length > 0
        && value.imagenes.every((imagen) => typeof imagen === "string")
        && "categoria" in value && typeof value.categoria === "string"
        && "subcategoria" in value && typeof value.subcategoria === "string"
        && "especie" in value && typeof value.especie === "string"
        && (!("fichaTecnica" in value) || typeof value.fichaTecnica === "string")
        && (!("modoDeUso" in value) || typeof value.modoDeUso === "string")
        && (!("fichaTecnicaDetalle" in value) || esFichaTecnicaDetalle(value.fichaTecnicaDetalle));
}

type ProductoRelacionado = {
    id: string;
    nombre: string;
    precio: number;
    precioOriginal?: number;
    imagenes: string[];
    categoria: string;
};

type EstadoAccionCarrito = "idle" | "agregando" | "agregado" | "error";

function esProductoRelacionado(value: unknown): value is ProductoRelacionado {
    return typeof value === "object" && value !== null
        && "id" in value && typeof value.id === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "precio" in value && typeof value.precio === "number"
        && (!("precioOriginal" in value) || typeof value.precioOriginal === "number")
        && "imagenes" in value && Array.isArray(value.imagenes)
        && value.imagenes.length > 0
        && value.imagenes.every((imagen) => typeof imagen === "string")
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

function formatoPrecio(precio: number): string {
    return `$${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(precio)}`;
}

export function ProductoIndividual() {
    const { id } = useParams();
    const { dispatch } = useCarrito();
    const sliderRef = useRef<HTMLDivElement>(null);
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
    const [puedeRetroceder, setPuedeRetroceder] = useState(false);
    const [puedeAvanzar, setPuedeAvanzar] = useState(false);
    // Vincular el estado al ID evita que otro producto herede el resultado anterior.
    const [estadoCarrito, setEstadoCarrito] = useState<{
        id: string | undefined;
        estado: EstadoAccionCarrito;
    }>({ id, estado: "idle" });
    const estadoCarritoActual = estadoCarrito.id === id ? estadoCarrito.estado : "idle";

    const desplazarCarrusel = useCallback((direccion: -1 | 1) => {
        const slider = sliderRef.current;
        if (slider) {
            slider.scrollBy({ left: direccion * slider.clientWidth, behavior: "smooth" });
        }
    }, []);
    const actualizarControlesCarrusel = useCallback(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        setPuedeRetroceder(slider.scrollLeft > 1);
        setPuedeAvanzar(slider.scrollLeft + slider.clientWidth < slider.scrollWidth - 1);
    }, []);

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

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const animationFrame = requestAnimationFrame(actualizarControlesCarrusel);
        slider.addEventListener("scroll", actualizarControlesCarrusel, { passive: true });
        window.addEventListener("resize", actualizarControlesCarrusel);

        return () => {
            cancelAnimationFrame(animationFrame);
            slider.removeEventListener("scroll", actualizarControlesCarrusel);
            window.removeEventListener("resize", actualizarControlesCarrusel);
        };
    }, [actualizarControlesCarrusel, id, estadoRelacionados.id, estadoRelacionados.productos.length]);

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
        <>
            <section>
                <div className="container producto-individual">
                    <img src={producto.imagenes[0]} alt={producto.nombre} />
                    <div className="info-producto-individual">
                        <nav className="breadcrumbs" aria-label="Ruta de navegación">
                            <Link to="/">Home</Link>
                            <span> &gt; </span>
                            <Link to="/tienda">{producto.especie}</Link>
                            <span> &gt; </span>
                            <Link to="/tienda">{producto.categoria}</Link>
                        </nav>
                        <h1 className="nombre-producto-individual">{producto.nombre}</h1>
                        {producto.precioOriginal !== undefined && producto.precioOriginal > producto.precio && (
                            <p className="precio-normal-producto-individual">
                                Normal <span className="precio">{formatoPrecio(producto.precioOriginal)}</span>
                            </p>
                        )}
                        <p className="precio-oferta-producto-individual">
                            {producto.precioOriginal !== undefined && producto.precioOriginal > producto.precio
                                ? "Oferta Web"
                                : "Precio"}
                            {" "}
                            <span className="precio">{formatoPrecio(producto.precio)}</span>
                        </p>
                        <p className="descripcion-corta-producto-individual">{producto.descripcion}</p>
                        <div className="botones-producto-individual">
                            <button
                                className="agregar-carrito"
                                type="button"
                                disabled={!id || estadoCarritoActual === "agregando"}
                                onClick={manejarAgregarAlCarrito}
                            >
                                {estadoCarritoActual === "agregando"
                                    ? "Agregando..."
                                    : estadoCarritoActual === "agregado"
                                        ? "Agregado al carrito"
                                        : "Agregar al carrito"}
                            </button>
                            <button className="comprar-ahora" type="button">Comprar ahora</button>
                        </div>
                        {estadoCarritoActual === "error" && (
                            <p role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>
                        )}
                        {estadoCarritoActual === "agregado" && (
                            <p role="status">Producto agregado al carrito.</p>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="tabs-container">
                        <div className="tab-buttons">
                            <button className="tab-btn active">Descripción</button>
                            <button className="tab-btn">Formas de entrega</button>
                        </div>
                        <div className="tab-content active">
                            <p className="descripcion-producto-individual">{producto.descripcion}</p>
                            {producto.fichaTecnica && <p>{producto.fichaTecnica}</p>}
                            {producto.modoDeUso && <p>Modo de uso: {producto.modoDeUso}</p>}
                            {producto.fichaTecnicaDetalle && (
                                <ul>
                                    {Object.entries(producto.fichaTecnicaDetalle).map(([caracteristica, dato]) => (
                                        <li key={caracteristica}>{caracteristica}: {dato}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="titulo-seccion">Productos relacionados</h2>
                    {relacionadosActuales.cargando && <p role="status">Cargando productos relacionados...</p>}
                    {relacionadosActuales.error && <p role="alert">{relacionadosActuales.error}</p>}
                    {!relacionadosActuales.cargando && !relacionadosActuales.error
                        && relacionadosActuales.productos.length === 0 && (
                            <p>No hay productos relacionados disponibles.</p>
                        )}
                    {relacionadosActuales.productos.length > 0 && (
                        <div className="carrusel">
                            <button
                                className="slide-left"
                                aria-label="Productos anteriores"
                                disabled={!puedeRetroceder}
                                onClick={() => desplazarCarrusel(-1)}
                            >
                                ‹
                            </button>
                            <div className="slider-productos" ref={sliderRef}>
                                {relacionadosActuales.productos.map((productoRelacionado) => (
                                    <CardProducto
                                        key={productoRelacionado.id}
                                        id={productoRelacionado.id}
                                        titulo={productoRelacionado.nombre}
                                        urlImagen={productoRelacionado.imagenes[0]}
                                        precio={productoRelacionado.precio}
                                        precioOriginal={productoRelacionado.precioOriginal}
                                        categoria={productoRelacionado.categoria}
                                    />
                                ))}
                            </div>
                            <button
                                className="slide-right"
                                aria-label="Productos siguientes"
                                disabled={!puedeAvanzar}
                                onClick={() => desplazarCarrusel(1)}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
