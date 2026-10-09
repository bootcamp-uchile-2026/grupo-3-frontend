type CardProductoProps = {
    titulo: string;
    urlImagen: string;
    precio: number;
    categoria: string;
    rating?: number;
    badge?: string;
    descuento?: number;

}

export function CardProducto({ titulo, urlImagen, precio, categoria, rating, badge, descuento }: CardProductoProps) {

    const precioFinal = descuento ? precio - (precio * descuento) /100 : precio;

    return (
        <article className="producto-card">
            <a href="/categoria/productos/producto-individual.html">
                <img src={urlImagen} alt={titulo} />
                <div className="producto-card-content">
                    <div className="producto-info">
                        <h3>{titulo}</h3>
                        <p>{categoria}</p>
                        {badge && <span className="badge">{badge}</span>}
                    </div>
                    <div className="producto-precio">
                        <p>Precio:<br />
                        ${precioFinal.toFixed(2)}
                        {descuento && <span className="precio-original"> ${precio.toFixed(2)}</span>}
                        </p>
                        {rating && <p>⭐ {rating}/5</p>}
                    </div>
                </div>
            </a>
            <div className="producto-card-actions">
                <button>Agregar al carrito</button>
            </div>
        </article>
    )
}