type CardProductoConfirmacionProps ={
    nombreProducto: string;
    cantidad: number;
    precio: number;
    imagenUrl: string;

}
export function CardProductoConfirmacion({ nombreProducto, cantidad, precio, imagenUrl }: CardProductoConfirmacionProps) {

    return (
        <article className="producto-cart-confirmacion">
            <img src={imagenUrl} alt="" className="thumbnail-producto-cart" />
            <div className="info-producto-cart-confirmacion">
                <div className="nombre-cantidad">
                    <a href="/categoria/productos/producto-individual.html">
                        <h3 className="nombre-producto-cart-confirmacion">{nombreProducto}</h3>
                    </a>
                    <p className="cantidad-producto-cart-confirmacion">Cantidad: {cantidad}</p>
                </div>
                <p className="precio-producto-cart-confirmacion">${precio}</p>
            </div>
        </article>
    )

}