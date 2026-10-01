type CardProductoProps = {
    titulo: string;
    urlImagen: string;
    precio: number;
    categoria: string;

}

export function CardProducto({ titulo, urlImagen, precio, categoria }: CardProductoProps) {
    return (
        <article className="producto-card">
            <a href="/categoria/productos/producto-individual.html">
                <img src={urlImagen} alt={titulo} />
                <div className="producto-card-content">
                    <div className="producto-info">
                        <h3>{titulo}</h3>
                        <p>{categoria}</p>
                    </div>
                    <div className="producto-precio">
                        <p>Precio:<br />${precio.toFixed(2)}</p>
                    </div>
                </div>
            </a>
            <div className="producto-card-actions">
                <button>Agregar al carrito</button>
            </div>
        </article>
    )
}