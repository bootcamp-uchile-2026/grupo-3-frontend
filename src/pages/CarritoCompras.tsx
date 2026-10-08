import { useState } from 'react'
import './CarritoCompras.css'
import { ProductoCarrito } from '../components/ProductoCarrito'

type Producto = {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

function CarritoCompras() {
  const [cupon, setCupon] = useState('')
  const [mensajeCupon, setMensajeCupon] = useState('')
  const [cuponAplicado, setCuponAplicado] = useState(false)

  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: 'Nombre de producto',
      precio: 5000,
      cantidad: 1,
    },
    {
      id: 2,
      nombre: 'Nombre de producto',
      precio: 5000,
      cantidad: 1,
    },
    {
      id: 3,
      nombre: 'Nombre de producto',
      precio: 5000,
      cantidad: 1,
    },
    {
      id: 4,
      nombre: 'Nombre de producto',
      precio: 5000,
      cantidad: 1,
    },
  ])

  function eliminarProducto(id: number) {
    setProductos(
      productos.filter((producto) => producto.id !== id)
    )
  }

  function aumentarCantidad(id: number) {
    setProductos(
      productos.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    )
  }

  function disminuirCantidad(id: number) {
    setProductos(
      productos.map((producto) =>
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    )
  }

  function aplicarCupon(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (cupon.trim() === '') {
      setCuponAplicado(false)
      setMensajeCupon('Debes ingresar un cupón')
      return
    }

    if (cupon.trim().toUpperCase() === 'PETLOVE10') {
      setCuponAplicado(true)
      setMensajeCupon('Cupón aplicado correctamente')
    } else {
      setCuponAplicado(false)
      setMensajeCupon('Cupón inválido')
    }
  }

  const subtotal = productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  )

  const descuento = cuponAplicado
    ? subtotal * 0.1
    : 0

  const total = subtotal - descuento

  const totalArticulos = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

  return (
    <div className="container container-carrito">
      <div id="carrito-compras">
        <h1>
          Carrito de compras ({totalArticulos} artículos)
        </h1>

        <div className="productos-cart">
          {productos.map((producto) => (
            <ProductoCarrito
              key={producto.id}
              nombre={producto.nombre}
              precio={producto.precio}
              cantidad={producto.cantidad}
              onAumentar={() => aumentarCantidad(producto.id)}
              onDisminuir={() => disminuirCantidad(producto.id)}
              onEliminar={() => eliminarProducto(producto.id)}
            />
          ))}
        </div>
      </div>

      <div id="cupon">
        <h2>Cupón</h2>

        <form
          id="form-cupon"
          onSubmit={aplicarCupon}
        >
          <input
            type="text"
            name="nombre-cupon"
            id="nombre-cupon"
            placeholder="Introduce el código promocional"
            value={cupon}
            onChange={(event) => setCupon(event.target.value)}
          />

          <button
            type="submit"
            id="aplicar-cupon"
          >
            Aplicar
          </button>
        </form>

        {mensajeCupon && (
          <p className="mensaje-cupon">
            {mensajeCupon}
          </p>
        )}
      </div>

      <div id="resumen-pedido">
        <div className="resumen-div">
          <h2>Resumen del pedido</h2>

          <div className="resumen-info-div">
            <p className="texto-resumen">
              Subtotal:
            </p>

            <p id="subtotal">
              ${subtotal.toLocaleString('es-CL')}
            </p>
          </div>

          {cuponAplicado && (
            <div className="resumen-info-div">
              <p className="texto-resumen">
                Descuento (10%):
              </p>

              <p id="descuento">
                -${descuento.toLocaleString('es-CL')}
              </p>
            </div>
          )}
        </div>

        <div className="resumen-div">
          <div className="resumen-info-div">
            <p className="texto-resumen">
              Total:
            </p>

            <p id="total">
              ${total.toLocaleString('es-CL')}
            </p>
          </div>

          <button
            type="button"
            id="finalizar-compra"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarritoCompras