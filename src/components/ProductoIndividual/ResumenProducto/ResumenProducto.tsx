import { IconCheck, IconShoppoingCart } from "../../UIKit/UIIcons";
import { UIBadge } from "../../UIKit/UIBadge/UIBadge";
import { UIQualification } from "../../UIKit/UIQualification/UIQualification";
import UIButton from "../../UIKit/UIButton/UIButton";
import { Link } from "react-router-dom";

type ResumenProductoProps = {
    nombre: string;
    descripcion: string;
    precio: number;
    precioOriginal?: number;
    categoria: string;
    subcategoria: string;
    especie: string;
    sku?: string;
    stock?: number;
    calificacion?: number;
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
    especie,
    sku,
    stock,
    calificacion,
    agregando,
    agregado,
    errorCarrito,
    puedeAgregar,
    onAgregarAlCarrito,
}: ResumenProductoProps) {
    const categorias = [...new Set([especie, categoria, subcategoria].filter(Boolean))];
    const tieneOferta = precioOriginal !== undefined && precioOriginal > precio;
    const hayStock = stock !== undefined && stock > 0;
    const disponibilidad = stock === undefined
        ? "Disponibilidad no informada"
        : hayStock ? "Disponible" : "Sin stock";

    return (
        <div className="resumen-producto">
            <h1 className="resumen-producto__nombre">{nombre}</h1>
            {calificacion === undefined ? (
                <p className="resumen-producto__valoracion">Valoraciones no disponibles</p>
            ) : (
                <div className="resumen-producto__calificacion">
                    <UIQualification value={calificacion} size="lg" ariaLabel={`Calificación: ${calificacion.toLocaleString("es-CL")} de 5`} />
                    <strong aria-hidden="true">{calificacion.toLocaleString("es-CL", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>
                </div>
            )}
            <div className="resumen-producto__precios">
                {tieneOferta && (
                    <span className="resumen-producto__precio-original">
                        <del>Normal {formatoPrecio(precioOriginal)}</del>
                    </span>
                )}
                <strong>{tieneOferta && "Oferta Web "}{formatoPrecio(precio)}</strong>
            </div>
            <p className="resumen-producto__descripcion">{descripcion}</p>
            <UIBadge
                className="resumen-producto__disponibilidad"
                variant={hayStock ? "success" : "neutral"}
                size="md"
                ariaLabel={disponibilidad}
            >
                {hayStock && <IconCheck color="currentColor" aria-hidden="true" />}
                {disponibilidad}
            </UIBadge>
            <dl className="resumen-producto__metadatos">
                <div><dt>Categorías</dt><dd>{categorias.join(", ")}</dd></div>
                <div><dt>SKU</dt><dd>{sku || "No disponible"}</dd></div>
            </dl>
            <div className="resumen-producto__acciones">
                <Link className="resumen-producto__boton resumen-producto__boton--secundario" to="/carrito-compras">
                    Ver carrito
                </Link>
                <UIButton
                    className="resumen-producto__boton resumen-producto__boton--principal"
                    iconLeft={<IconShoppoingCart color="currentColor" />}
                    disabled={!puedeAgregar || agregando}
                    onClick={onAgregarAlCarrito}
                >
                    {agregando ? "Añadiendo..." : agregado ? "Añadido al carrito" : "Añadir al carrito"}
                </UIButton>
            </div>
            {errorCarrito && <p className="resumen-producto__mensaje" role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>}
            {agregado && <p className="resumen-producto__mensaje" role="status">Producto agregado al carrito.</p>}
        </div>
    );
}
