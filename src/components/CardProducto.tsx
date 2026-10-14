
import { useCarrito } from '../context/CarritoContext'

type CardProductoProps = {
  idProducto: number
  titulo: string
  urlImagen: string
  precio: number
  categoria: string
}

export function CardProducto({
  idProducto,
  titulo,
  urlImagen,
  precio,
  categoria,
}: CardProductoProps) {
  const { agregarProducto } = useCarrito()

  function handleAgregarAlCarrito() {
    agregarProducto({
      id: idProducto,
      nombre: titulo,
      precio: precio,
      cantidad: 1,
    })
  }

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
            <p>
              Precio:
              <br />
              ${precio.toFixed(2)}
            </p>
          </div>
        </div>
      </a>

      <div className="producto-card-actions">
        <button type="button" onClick={handleAgregarAlCarrito}>
          Agregar al carrito
        </button>
      </div>
    </article>
  )
}
