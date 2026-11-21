import { Link } from "react-router-dom";

type CardProductoConfirmacionProps = {
    productoId: string;
    nombreProducto: string;
    cantidad: number;
    precio: number;
    imagenUrl: string;
};

const formatoCLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

export function CardProductoConfirmacion({ productoId, nombreProducto, cantidad, precio, imagenUrl }: CardProductoConfirmacionProps) {
    return (
        <article className="card-producto-confirmacion">
            {imagenUrl && <img src={imagenUrl} alt="" className="card-producto-confirmacion__imagen" />}
            <div className="card-producto-confirmacion__texto">
                <h3 className="card-producto-confirmacion__nombre">
                    <Link to={`/producto-individual/${encodeURIComponent(productoId)}`}>{nombreProducto}</Link>
                </h3>
                <p>Cantidad: {cantidad}</p>
            </div>
            <p className="card-producto-confirmacion__precio" aria-label={`Subtotal: ${formatoCLP.format(precio)}`}>
                {formatoCLP.format(precio)}
            </p>
        </article>
    );
}
