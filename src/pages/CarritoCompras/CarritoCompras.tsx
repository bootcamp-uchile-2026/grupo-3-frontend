
import { useEffect, useState } from "react";
import { useCarrito } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import {
  actualizarCantidadProducto,
  eliminarProductoDelCarrito,
  obtenerCarrito,
} from "../../services/carrito";

export function CarritoCompras() {
  const { state, dispatch } = useCarrito();
  const productos = state.productos;

  const [cupon, setCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState("");
  const [cargando, setCargando] = useState(true);
  const [actualizandoProductoId, setActualizandoProductoId] = useState<string | null>(null);
  const [eliminandoProductoId, setEliminandoProductoId] = useState<string | null>(null);
  const [errorCarrito, setErrorCarrito] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    async function cargarCarrito() {
      try {
        // Hidratar el contexto al entrar para mostrar también el carrito ya guardado en el servidor.
        const carrito = await obtenerCarrito();
        if (activo) {
          dispatch({ type: "SINCRONIZAR", carrito });
        }
      } catch (error) {
        if (activo) {
          console.error("No se pudo cargar el carrito.", error);
          setErrorCarrito(
            error instanceof Error ? error.message : "No se pudo cargar el carrito.",
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void cargarCarrito();
    return () => {
      activo = false;
    };
  }, [dispatch]);

  async function handleEliminar(id: string) {
    if (cargando || actualizandoProductoId !== null || eliminandoProductoId !== null) return;

    setEliminandoProductoId(id);
    setErrorCarrito(null);
    try {
      // Reflejar la eliminación solo al recibir el carrito actualizado del servidor.
      const carrito = await eliminarProductoDelCarrito(id);
      dispatch({ type: "SINCRONIZAR", carrito });
    } catch (error) {
      console.error("No se pudo eliminar el producto del carrito.", error);
      setErrorCarrito(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el producto del carrito.",
      );
    } finally {
      setEliminandoProductoId(null);
    }
  }

  async function handleCantidad(id: string, delta: number) {
    if (actualizandoProductoId !== null || eliminandoProductoId !== null || cargando) return;

    const producto = productos.find((item) => item.productoId === id);
    if (!producto) return;

    const cantidad = Math.max(1, producto.cantidad + delta);
    if (cantidad === producto.cantidad) return;

    setActualizandoProductoId(id);
    setErrorCarrito(null);
    try {
      // No cambiar la vista de forma optimista; aplicar solo el carrito confirmado por el API.
      const carrito = await actualizarCantidadProducto(id, cantidad);
      dispatch({ type: "SINCRONIZAR", carrito });
    } catch (error) {
      console.error("No se pudo actualizar la cantidad del producto.", error);
      setErrorCarrito(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la cantidad del producto.",
      );
    } finally {
      setActualizandoProductoId(null);
    }
  }

  const handleVaciar = () => {
    dispatch({ type: "LIMPIAR" });
    setCuponAplicado("");
  };

  const subtotalCalculado = productos.reduce(
    (acc, p) => acc + p.subtotal,
    0
  );
  const subtotal = state.resumenApi?.subtotal ?? subtotalCalculado;

  let total = state.resumenApi?.total ?? subtotal;

  switch (cuponAplicado) {
    case "CUPONCLIENTENUEVO":
      total = Math.max(0, subtotal - 10);
      break;

    case "CYBERWEEK":
      total = subtotal * 0.8;
      break;

    case "ENVIOGRATIS":
      total = subtotal;
      break;

    case "BLACKFRIDAY":
      if (subtotal > 100) {
        total = subtotal * 0.85;
      }
      break;
  }

  const handleAplicarCupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const codigo = cupon.trim().toUpperCase();

    switch (codigo) {
      case "CUPONCLIENTENUEVO":
      case "CYBERWEEK":
      case "ENVIOGRATIS":
      case "BLACKFRIDAY":
        setCuponAplicado(codigo);
        break;

      case "REGALO":
        dispatch({
          type: "AGREGAR",
          producto: {
            productoId: "regalo",
            nombre: "Producto de regalo",
            marca: "PetLove",
            imagen: "",
            precioOriginal: 0,
            precioUnitario: 0,
            cantidad: 1,
            subtotal: 0,
          },
        });
        break;

      default:
        alert("Cupón no válido");
    }

    console.log("Cupón aplicado:", codigo);
  };

  return (
      <section>
        <div className="container container-carrito">
          <div id="carrito-compras">
            <h1>
              Carrito de compras ({state.resumenApi?.totalArticulos ?? productos.reduce((totalItems, p) => totalItems + p.cantidad, 0)} artículos)
            </h1>

            {cargando && <p role="status">Cargando carrito...</p>}
            {errorCarrito && <p role="alert">{errorCarrito}</p>}

            <div className="productos-cart">
              {productos.map((p) => (
                <article
                  key={p.productoId}
                  className="producto-cart"
                >
                  {p.imagen && <img src={p.imagen} alt={p.nombre} />}
                  <div className="info-producto-cart">
                    <Link to={`/producto-individual/${encodeURIComponent(p.productoId)}`}>
                      <h3 className="nombre-producto-cart">
                        {p.nombre}
                      </h3>
                    </Link>

                    <p className="precio-producto-cart">
                      ${p.precioUnitario}
                    </p>
                    {p.precioOriginal > p.precioUnitario && (
                      <p>Precio original: ${p.precioOriginal}</p>
                    )}
                    <p>{p.marca}</p>
                  </div>

                  <div className="accion-producto-cart">
                    <button
                      className="eliminar-producto-cart"
                      type="button"
                      disabled={cargando || actualizandoProductoId !== null || eliminandoProductoId !== null}
                      onClick={() => handleEliminar(p.productoId)}
                    >
                      {eliminandoProductoId === p.productoId ? "Eliminando..." : "Eliminar"}
                    </button>

                    <div className="contador-ctrl-producto-cart">
                      <button
                        type="button"
                        disabled={cargando || actualizandoProductoId !== null || eliminandoProductoId !== null}
                        onClick={() =>
                          handleCantidad(p.productoId, +1)
                        }
                      >
                        +
                      </button>

                      <p className="contador-cantidad">
                        {p.cantidad}
                      </p>
                      {actualizandoProductoId === p.productoId && <span role="status">Actualizando...</span>}

                      <button
                        type="button"
                        disabled={cargando || actualizandoProductoId !== null || eliminandoProductoId !== null || p.cantidad <= 1}
                        onClick={() =>
                          handleCantidad(p.productoId, -1)
                        }
                      >
                        -
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Vaciar carrito */}
          {productos.length > 0 && (
            <div className="acciones-carrito">
              <button
                className="vaciar-carrito"
                onClick={handleVaciar}
              >
                Vaciar carrito
              </button>
            </div>
          )}

          {/* Cupón */}
          <div id="cupon">
            <h2>Cupón</h2>

            <form
              id="form-cupon"
              onSubmit={handleAplicarCupon}
            >
              <input
                type="text"
                name="nombre-cupon"
                id="nombre-cupon"
                placeholder="Introduce el código promocional"
                value={cupon}
                onChange={(e) =>
                  setCupon(e.target.value)
                }
              />

              <button
                type="submit"
                id="aplicar-cupon"
              >
                Aplicar
              </button>
            </form>
          </div>

          {/* Resumen */}
          <div id="resumen-pedido">
            <div className="resumen-div">
              <h2>Resumen del pedido</h2>

              <div className="resumen-info-div">
                <p className="texto-resumen">
                  Subtotal:
                </p>

                <p id="subtotal">
                  ${subtotal}
                </p>
              </div>
            </div>

            <div className="resumen-div">
              <div className="resumen-info-div">
                <p className="texto-resumen">
                  Total:
                </p>

                <p id="total">
                  ${total}
                </p>
              </div>

              <Link to="/carrito-compras/checkout">
                <button id="finalizar-compra">
                  Finalizar Compra
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
}
