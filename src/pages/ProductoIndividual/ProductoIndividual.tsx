import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardCarrusel } from "../../components/CardCarrusel/CardCarrusel";
import { Breadcrumbs } from "../../components/Breadcrumbs/Breadcrumbs";
import { GaleriaProducto } from "../../components/ProductoIndividual/GaleriaProducto/GaleriaProducto";
import { ResenasProducto } from "../../components/ProductoIndividual/ResenasProducto/ResenasProducto";
import { ResumenProducto } from "../../components/ProductoIndividual/ResumenProducto/ResumenProducto";
import { IconExclamationCircle } from "../../components/UIKit/UIIcons";
import { UIProductDescription, UIProductUsage, UITechnicalSheet } from "../../components/UIKit/UIProductDescription";
import { UIProductCard } from "../../components/UIKit/UIProductCard";
import { useCarritoStore } from "../../store/carritoStore";
import {
    adaptarProductoDetalle,
    adaptarProductoRelacionado,
    obtenerProducto,
    obtenerProductosRelacionados,
} from "../../services/catalogo";
import type { ProductoDetalleView, ProductoRelacionadoView } from "../../schemas/catalogo";

type EstadoAccionCarrito = "idle" | "agregando" | "agregado" | "error";

const ordenFichaTecnica = ["Especie", "Función", "Capacidad", "Peso", "Medidas", "Material", "Características"];
const compararCampos = new Intl.Collator("es", { sensitivity: "base" });

function posicionCampoFicha(campo: string): number {
    const posicion = ordenFichaTecnica.findIndex((label) => compararCampos.compare(label, campo.trim()) === 0);
    return posicion < 0 ? ordenFichaTecnica.length : posicion;
}

function formatoPrecio(precio: number): string {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(precio);
}

function TarjetaProductoRelacionado({ producto }: { producto: ProductoRelacionadoView }) {
    const agregarProducto = useCarritoStore((state) => state.agregarProducto);
    const [estadoCarrito, setEstadoCarrito] = useState<EstadoAccionCarrito>("idle");

    async function agregarAlCarrito() {
        setEstadoCarrito("agregando");
        try {
            await agregarProducto({ productoId: producto.id, cantidad: 1 });
            setEstadoCarrito("agregado");
        } catch (error) {
            console.error("No se pudo agregar el producto al carrito.", error);
            setEstadoCarrito("error");
        }
    }

    return (
        <div>
            <UIProductCard
                imageSrc={producto.imagenes?.[0] || "https://placehold.co/400x400?text=Sin+imagen"}
                imageAlt={producto.nombre}
                name={producto.nombre}
                rating={producto.calificacionPromedio}
                price={formatoPrecio(producto.precio)}
                previousPrice={producto.precioOriginal !== undefined
                    && producto.precioOriginal > producto.precio
                    ? formatoPrecio(producto.precioOriginal)
                    : undefined}
                productTo={`/producto-individual/${encodeURIComponent(producto.id)}`}
                buttonLabel={estadoCarrito === "agregando"
                    ? "Agregando..."
                    : estadoCarrito === "agregado"
                        ? "Agregado"
                        : "Añadir al carrito"}
                onAddToCart={agregarAlCarrito}
                loading={estadoCarrito === "agregando"}
                selected={estadoCarrito === "agregado"}
            />
            {estadoCarrito === "agregado" && (
                <p role="status">Producto agregado al carrito.</p>
            )}
            {estadoCarrito === "error" && (
                <p role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>
            )}
        </div>
    );
}

const productoEjemplo: ProductoDetalleView = {
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
    const agregarProducto = useCarritoStore((state) => state.agregarProducto);
    const [estadoProducto, setEstadoProducto] = useState({
        id,
        cargando: Boolean(id),
        producto: id ? null : productoEjemplo,
        error: null as string | null,
    });
    const [estadoRelacionados, setEstadoRelacionados] = useState({
        id,
        cargando: Boolean(id),
        productos: [] as ProductoRelacionadoView[],
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
            await agregarProducto({ productoId: producto?.id ?? id, cantidad: 1 });
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
                const data = await obtenerProducto(productId, controller.signal);
                setEstadoProducto({
                    id: productId,
                    cargando: false,
                    producto: adaptarProductoDetalle(data),
                    error: null,
                });
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
                const data = await obtenerProductosRelacionados(
                    productId,
                    { limit: 4 },
                    controller.signal,
                );

                setEstadoRelacionados({
                    id: productId,
                    cargando: false,
                    productos: data.map(adaptarProductoRelacionado),
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

    const fichaTexto = producto.fichaTecnica?.trim();
    const camposFicha = Object.entries(producto.fichaTecnicaDetalle ?? {})
        .filter(([, valor]) => valor.trim())
        .sort(([primero], [segundo]) => posicionCampoFicha(primero) - posicionCampoFicha(segundo));

    return (
        <div className="producto-detalle">
            <div className="producto-detalle__contenedor">
                <section className="producto-detalle__principal" aria-label="Detalle del producto">
                    <GaleriaProducto
                        key={producto.id}
                        nombre={producto.nombre}
                        imagenes={producto.imagenes ?? []}
                    />
                    <div className="producto-detalle__informacion">
                        <Breadcrumbs variant="product-detail" items={[
                            { label: "Inicio", to: "/" },
                            { label: producto.especie, to: "/tienda" },
                            { label: producto.categoria, to: "/tienda" },
                            { label: producto.subcategoria, to: "/tienda" },
                        ]} />
                        <ResumenProducto
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                            precio={producto.precio}
                            precioOriginal={producto.precioOriginal}
                            categoria={producto.categoria}
                            subcategoria={producto.subcategoria}
                            especie={producto.especie}
                            sku={producto.sku}
                            stock={producto.stock}
                            calificacion={producto.calificacionPromedio}
                            agregando={estadoCarritoActual === "agregando"}
                            agregado={estadoCarritoActual === "agregado"}
                            errorCarrito={estadoCarritoActual === "error"}
                            puedeAgregar={Boolean(id)}
                            onAgregarAlCarrito={manejarAgregarAlCarrito}
                        />
                    </div>
                </section>
                <div className="producto-detalle__acordeones" key={producto.id}>
                    <UIProductDescription defaultOpen>
                        {fichaTexto && (
                            <p className="producto-detalle__texto-ficha">{fichaTexto}</p>
                        )}
                        {camposFicha.length > 0 && (
                            <UITechnicalSheet variant="custom" data={Object.fromEntries(camposFicha)} />
                        )}
                        {!fichaTexto && camposFicha.length === 0 && (
                            <p>No hay ficha técnica disponible para este producto.</p>
                        )}
                    </UIProductDescription>
                    <UIProductDescription type="usage" icon={<IconExclamationCircle color="var(--primario-90-color)" />}>
                        <UIProductUsage description={producto.modoDeUso || "No hay instrucciones de uso disponibles para este producto."} />
                    </UIProductDescription>
                </div>
                <ResenasProducto />
            </div>
            <section className="producto-detalle__relacionados">
                <div className="producto-detalle__contenedor">
                    <h2 className="producto-detalle__titulo-relacionados">Productos relacionados</h2>
                    {relacionadosActuales.cargando && <p role="status">Cargando productos relacionados...</p>}
                    {relacionadosActuales.error && <p role="alert">{relacionadosActuales.error}</p>}
                    {!relacionadosActuales.cargando && !relacionadosActuales.error
                        && relacionadosActuales.productos.length === 0 && (
                            <p>No hay productos relacionados disponibles.</p>
                        )}
                    {relacionadosActuales.productos.length > 0 && (
                        <CardCarrusel>
                            {relacionadosActuales.productos.map((productoRelacionado) => (
                                <TarjetaProductoRelacionado
                                    key={productoRelacionado.id}
                                    producto={productoRelacionado}
                                />
                            ))}
                        </CardCarrusel>
                    )}
                </div>
            </section>
        </div>
    );
}
