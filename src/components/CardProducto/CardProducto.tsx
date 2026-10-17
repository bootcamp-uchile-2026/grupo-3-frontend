import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { agregarProductoAlCarrito } from "../../services/carrito";

export type CardProductoVariant = "standard" | "store-list";

export type CardProductoProps = {
    id?: string;
    titulo: string;
    urlImagen?: string;
    precio: number;
    precioOriginal?: number;
    categoria?: string;
    marca?: string;
    rating?: number;
    badge?: string;
    descuento?: number;
    variant?: CardProductoVariant;
};

type EstadoCarrito = "idle" | "agregando" | "agregado" | "error";

function formatoPrecio(precio: number): string {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(precio);
}

function Estrellas({ rating }: { rating: number }) {
    const estrellasLlenas = Math.round(rating);
    return (
        <span className="producto-card__rating" aria-label={`Valoración: ${rating} de 5`}>
            {"★".repeat(estrellasLlenas)}{"☆".repeat(5 - estrellasLlenas)}
            <span className="producto-card__rating-numero">{rating}</span>
        </span>
    );
}

export function CardProducto({
    id,
    titulo,
    urlImagen,
    precio,
    precioOriginal,
    categoria,
    marca,
    rating,
    badge,
    descuento,
    variant = "standard",
}: CardProductoProps) {
    const { dispatch } = useCarrito();
    const [estadoCarrito, setEstadoCarrito] = useState<EstadoCarrito>("idle");
    const claseVariante = variant === "store-list" ? " producto-card--store-list" : "";
    const mostrarDescuento = typeof descuento === "number" && descuento > 0;

    async function manejarAgregarAlCarrito() {
        if (!id) {
            setEstadoCarrito("error");
            return;
        }

        setEstadoCarrito("agregando");
        try {
            const carrito = await agregarProductoAlCarrito(id, 1);
            dispatch({ type: "SINCRONIZAR", carrito });
            setEstadoCarrito("agregado");
        } catch (error) {
            console.error("No se pudo agregar el producto al carrito.", error);
            setEstadoCarrito("error");
        }
    }

    return (
        <article className={`producto-card${claseVariante}`}>
            <Link
                className="producto-card__enlace"
                to={id ? `/producto-individual/${encodeURIComponent(id)}` : "/producto-individual"}
            >
                <span className="producto-card__imagen">
                    {urlImagen
                        ? (
                            <img
                                src={urlImagen}
                                alt={titulo}
                                onError={(event) => {
                                    event.currentTarget.parentElement?.classList.add("has-error");
                                    event.currentTarget.hidden = true;
                                }}
                            />
                        )
                        : <span className="producto-card__imagen-vacia">Imagen no disponible</span>}
                    {(badge || mostrarDescuento) && (
                        <span className="producto-card__insignia">
                            {badge || `-${descuento}%`}
                        </span>
                    )}
                </span>
                <div className="producto-card-content">
                    <div className="producto-info">
                        <h3 className="producto-info__titulo">{titulo}</h3>
                        {categoria && <span className="producto-info__categoria">{categoria}</span>}
                        {marca && <span className="producto-info__marca">{marca}</span>}
                        {rating !== undefined && rating >= 0 && rating <= 5 && <Estrellas rating={rating} />}
                    </div>
                    <div className="producto-precio">
                        {precioOriginal !== undefined && precioOriginal > precio && (
                            <span className="producto-precio-original">
                                Antes: {formatoPrecio(precioOriginal)}
                            </span>
                        )}
                        <span className="producto-precio__actual">
                            {formatoPrecio(precio)}
                        </span>
                    </div>
                </div>
            </Link>
            <div className="producto-card-actions">
                <button
                    type="button"
                    disabled={!id || estadoCarrito === "agregando"}
                    onClick={manejarAgregarAlCarrito}
                >
                    {estadoCarrito === "agregando"
                        ? "Agregando..."
                        : estadoCarrito === "agregado"
                            ? "Agregado"
                            : "Agregar al carrito"}
                </button>
                {estadoCarrito === "agregado" && <p role="status">Producto agregado al carrito.</p>}
                {estadoCarrito === "error" && <p role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>}
            </div>
        </article>
    );
}
