import { useState } from "react"
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export function CarritoCompras() {
  const { state, dispatch } = useCarrito();
  const productos = state.productos;
  const [cupon, setCupon] = useState("");

  const handleEliminar = (id: number) => {
    dispatch({ type: "ELIMINAR", id });
  };

  const handleCantidad = (id: number, delta: number) => {
    dispatch({ type: "CAMBIAR_CANTIDAD", id, delta });
  };

   const handleVaciar = () => {
    dispatch({ type: "LIMPIAR" });
  };

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const total = subtotal; 

  const handleAplicarCupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let nuevoTotal = subtotal;

  switch (cupon.toUpperCase()) {
    case "CUPONCLIENTENUEVO":
      nuevoTotal = subtotal - 10;
      break;
    case "CYBERWEEK":
      nuevoTotal = subtotal * 0.8;
      break;
    case "ENVIOGRATIS":
      // aquí podrías tener un costo de envío fijo
      nuevoTotal = subtotal; // sin envío
      break;
    case "BLACKFRIDAY":
      if (subtotal > 100) nuevoTotal = subtotal * 0.85;
      break;
    case "REGALO":
      dispatch({
        type: "AGREGAR",
        producto: { idProducto: 999, titulo: "Producto de regalo", precio: 0, cantidad: 1 }
      });
      break;
    default:
      alert("Cupón no válido");
  }
    console.log("Cupón aplicado:", cupon);
  };

  return (
    <main>
      <section>
        <div className="container container-carrito">
          <div id="carrito-compras">
            <h1>Carrito de compras ({productos.length} artículos)</h1>
            <div className="productos-cart">
              {productos.map((p) => (
                <article key={p.idProducto} className="producto-cart">
                  <div className="info-producto-cart">
                    <Link to={`/categoria/productos/${p.idProducto}`}>
                      <h3 className="nombre-producto-cart">{p.titulo}</h3>
                    </Link>
                    <p className="precio-producto-cart">${p.precio}</p>
                  </div>
                  <div className="accion-producto-cart">
                    <button
                      className="eliminar-producto-cart"
                      onClick={() => handleEliminar(p.idProducto)}
                    >
                      Eliminar
                    </button>
                    <div className="contador-ctrl-producto-cart">
                      <button onClick={() => handleCantidad(p.idProducto, +1)}>+</button>
                      <p className="contador-cantidad">{p.cantidad}</p>
                      <button onClick={() => handleCantidad(p.idProducto, -1)}>-</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Aca es donde yo vacío el carrito */}
            {productos.length > 0 && (
                <div className="acciones-carrito">
                    <button className="vaciar-carrito" onClick={handleVaciar}>
                    Vaciar carrito
                    </button>
                </div>
            )}

          {/* Cupón */}
          <div id="cupon">
            <h2>Cupón</h2>
            <form id="form-cupon" onSubmit={handleAplicarCupon}>
              <input
                type="text"
                name="nombre-cupon"
                id="nombre-cupon"
                placeholder="Introduce el código promocional"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
              />
              <button type="submit" id="aplicar-cupon">Aplicar</button>
            </form>
          </div>

          {/* Resumen */}
          <div id="resumen-pedido">
            <div className="resumen-div">
              <h2>Resumen del pedido</h2>
              <div className="resumen-info-div">
                <p className="texto-resumen">Subtotal: </p>
                <p id="subtotal">${subtotal}</p>
              </div>
            </div>
            <div className="resumen-div">
              <div className="resumen-info-div">
                <p className="texto-resumen">Total: </p>
                <p id="total">${total}</p>
              </div>
              <Link to="/carrito-compras/checkout">
                <button id="finalizar-compra">Finalizar Compra</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}