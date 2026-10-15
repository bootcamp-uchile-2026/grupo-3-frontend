import { Link } from "react-router-dom";

type CardProductoConfirmacionProps ={
    productoId: string;
    nombreProducto: string;
    cantidad: number;
    precio: number;
    imagenUrl: string;

}
export function CardProductoConfirmacion({ productoId, nombreProducto, cantidad, precio, imagenUrl }: CardProductoConfirmacionProps) {
    const precioFormateado = new Intl.NumberFormat("es-CL", {
        maximumFractionDigits: 0,
    }).format(precio);

    return (
        <article className="producto-cart-confirmacion">
            <img src={imagenUrl} alt="" className="thumbnail-producto-cart" />
            <div className="info-producto-cart-confirmacion">
                <div className="nombre-cantidad">
                    <Link to={`/producto-individual/${encodeURIComponent(productoId)}`}>
                        <h3 className="nombre-producto-cart-confirmacion">{nombreProducto}</h3>
                    </Link>
                    <p className="cantidad-producto-cart-confirmacion">Cantidad: {cantidad}</p>
                </div>
                <p className="precio-producto-cart-confirmacion">Subtotal: ${precioFormateado}</p>
            </div>
        </article>
    )

}