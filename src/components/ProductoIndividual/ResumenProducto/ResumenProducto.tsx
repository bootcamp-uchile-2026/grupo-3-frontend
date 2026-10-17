import { Link } from "react-router-dom";

type ResumenProductoProps = {
    nombre: string;
    descripcion: string;
    precio: number;
    precioOriginal?: number;
    categoria: string;
    subcategoria: string;
    sku?: string;
    agregando: boolean;
    agregado: boolean;
    errorCarrito: boolean;
    puedeAgregar: boolean;
    onAgregarAlCarrito: () => void;
};

function formatoPrecio(precio: number): string {
    return `$${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(precio)}`;
}

export function ResumenProducto({
    nombre,
    descripcion,
    precio,
    precioOriginal,
    categoria,
    subcategoria,
    sku,
    agregando,
    agregado,
    errorCarrito,
    puedeAgregar,
    onAgregarAlCarrito,
}: ResumenProductoProps) {
    return (
        <div className="resumen-producto">
            <h1 className="resumen-producto__nombre">{nombre}</h1>
            <p className="resumen-producto__valoracion">Valoraciones no disponibles</p>
            <p className="resumen-producto__descripcion">{descripcion}</p>
            <p className="resumen-producto__disponibilidad">
                <span aria-hidden="true">✓</span> Disponibilidad no informada
            </p>
            <div className="resumen-producto__precios">
                {precioOriginal !== undefined && precioOriginal > precio && (
                    <span className="resumen-producto__precio-original">{formatoPrecio(precioOriginal)}</span>
                )}
                <strong>{formatoPrecio(precio)}</strong>
            </div>
            <div className="resumen-producto__acciones">
                <Link className="resumen-producto__boton resumen-producto__boton--secundario" to="/carrito-compras">
                    Ver el carrito
                </Link>
                <button
                    className="resumen-producto__boton resumen-producto__boton--principal"
                    type="button"
                    disabled={!puedeAgregar || agregando}
                    onClick={onAgregarAlCarrito}
                >
                    {agregando ? "Añadiendo..." : agregado ? "Añadido al carrito" : "Añadir al carrito"}
                </button>
            </div>
            {errorCarrito && <p className="resumen-producto__mensaje" role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>}
            {agregado && <p className="resumen-producto__mensaje" role="status">Producto agregado al carrito.</p>}
            <dl className="resumen-producto__metadatos">
                <div><dt>Categorías</dt><dd>{categoria}, {subcategoria}</dd></div>
                <div><dt>SKU</dt><dd>{sku || "No disponible"}</dd></div>
            </dl>
        </div>
    );
}
