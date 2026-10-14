
import { useState, type FormEvent } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { ProductoCarrito } from '../components/ProductoCarrito'
import './CarritoCompras.css'

function CarritoCompras() {
  const {
    productos,
    eliminarProducto,
    aumentarCantidad,
    disminuirCantidad,
    vaciarCarrito,
    agregarProducto,
  } = useCarrito()

  const [cupon, setCupon] = useState('')
  const [mensajeCupon, setMensajeCupon] = useState('')
  const [cuponAplicado, setCuponAplicado] = useState('')

  const subtotal = productos.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  )

  const totalArticulos = productos.reduce(
    (total, producto) => total + producto.cantidad,
    0
  )

  let descuento = 0

  switch (cuponAplicado) {
    case 'PETLOVE10':
      descuento = subtotal * 0.1
      break

    case 'CUPONCLIENTENUEVO':
      descuento = Math.min(10, subtotal)
      break

    case 'CYBERWEEK':
      descuento = subtotal * 0.2
      break

    case 'BLACKFRIDAY':
      if (subtotal > 100) {
        descuento = subtotal * 0.15
      }
      break
  }

  const total = Math.max(0, subtotal - descuento)

  function aplicarCupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const codigo = cupon.trim().toUpperCase()

    if (!codigo) {
      setMensajeCupon('Debes ingresar un cupón')
      return
    }

    if (codigo === 'REGALO') {
      if (productos.some((producto) => producto.id === 999)) {
        setMensajeCupon('El regalo ya está en tu carrito')
        return
      }

      agregarProducto({
        id: 999,
        nombre: 'Producto de regalo',
        precio: 0,
        cantidad: 1,
      })

      setMensajeCupon('Regalo agregado correctamente')
      setCupon('')
      return
    }

    const cuponesValidos = [
      'PETLOVE10',
      'CUPONCLIENTENUEVO',
      'CYBERWEEK',
      'ENVIOGRATIS',
      'BLACKFRIDAY',
    ]

    if (!cuponesValidos.includes(codigo)) {
      setMensajeCupon('Cupón inválido')
      return
    }

    if (codigo === 'BLACKFRIDAY' && subtotal <= 100) {
      setMensajeCupon(
        'BLACKFRIDAY requiere un subtotal superior a $100'
      )
      return
    }

    setCuponAplicado(codigo)

    if (codigo === 'ENVIOGRATIS') {
      setMensajeCupon(
        'Cupón de envío gratis registrado. El envío aún no se calcula en esta página.'
      )
    } else {
      setMensajeCupon('Cupón aplicado correctamente')
    }
  }

  function handleVaciarCarrito() {
    vaciarCarrito()
    setCuponAplicado('')
    setCupon('')
    setMensajeCupon('')
  }

  return (
    <div className="container container-carrito">
      <div id="carrito-compras">
        <h1>
          Carrito de compras ({totalArticulos} artículos)
        </h1>

        <div className="productos-cart">
          {productos.length === 0 ? (
            <p>
              Tu carrito está vacío.
              ¡Agrega productos desde la tienda!
            </p>
          ) : (
            productos.map((producto) => (
              <ProductoCarrito
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                cantidad={producto.cantidad}
                onAumentar={() =>
                  aumentarCantidad(producto.id)
                }
                onDisminuir={() =>
                  disminuirCantidad(producto.id)
                }
                onEliminar={() =>
                  eliminarProducto(producto.id)
                }
              />
            ))
          )}
        </div>

        {productos.length > 0 && (
          <div className="acciones-carrito">
            <button
              type="button"
              className="vaciar-carrito"
              onClick={handleVaciarCarrito}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>

      <div id="cupon">
        <h2>Cupón</h2>

        <form id="form-cupon" onSubmit={aplicarCupon}>
          <input
            type="text"
            name="nombre-cupon"
            id="nombre-cupon"
            placeholder="Introduce el código promocional"
            value={cupon}
            onChange={(event) =>
              setCupon(event.target.value)
            }
          />

          <button type="submit" id="aplicar-cupon">
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

          {descuento > 0 && (
            <div className="resumen-info-div">
              <p className="texto-resumen">
                Descuento:
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
