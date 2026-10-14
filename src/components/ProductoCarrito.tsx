type ProductoCarritoProps = {
  nombre: string
  precio: number
  cantidad: number
  onAumentar: () => void
  onDisminuir: () => void
  onEliminar: () => void
}

function ProductoCarrito({
  nombre,
  precio,
  cantidad,
  onAumentar,
  onDisminuir,
  onEliminar,
}: ProductoCarritoProps) {
  return (
    <article className="producto-cart">
      <div className="info-producto-cart">
        <a href="#">
          <h3 className="nombre-producto-cart">
            {nombre}
          </h3>
        </a>

        <p className="precio-producto-cart">
          ${precio.toLocaleString('es-CL')}
        </p>
      </div>

      <div className="accion-producto-cart">
        <button
          type="button"
          className="eliminar-producto-cart"
          onClick={onEliminar}
        >
          Eliminar
        </button>

        <div className="contador-ctrl-producto-cart">
          <button
            type="button"
            className="contador-mas"
            onClick={onAumentar}
          >
            +
          </button>

          <p className="contador-cantidad">
            {cantidad}
          </p>

          <button
            type="button"
            className="contador-menos"
            onClick={onDisminuir}
          >
            -
          </button>
        </div>
      </div>
    </article>
  )
}

export { ProductoCarrito }