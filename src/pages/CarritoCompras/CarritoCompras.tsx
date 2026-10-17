import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CardCarrusel } from "../../components/CardCarrusel/CardCarrusel";
import { CardProducto } from "../../components/CardProducto/CardProducto";
import { CartItem } from "../../components/CartItem/CartItem";
import { CouponBox } from "../../components/CouponBox/CouponBox";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { useCarrito } from "../../context/CarritoContext";
import {
  actualizarCantidadProducto,
  eliminarProductoDelCarrito,
  obtenerCarrito,
} from "../../services/carrito";

type ProductoOferta = {
  id: string;
  nombre: string;
  precio: number;
  precioOriginal: number;
  imagenes: string[];
  categoria: string;
};

function esProductoOferta(value: unknown): value is ProductoOferta {
  return typeof value === "object" && value !== null
    && "id" in value && typeof value.id === "string"
    && "nombre" in value && typeof value.nombre === "string"
    && "precio" in value && typeof value.precio === "number"
    && "precioOriginal" in value && typeof value.precioOriginal === "number"
    && "imagenes" in value && Array.isArray(value.imagenes)
    && value.imagenes.length > 0
    && value.imagenes.every((imagen) => typeof imagen === "string")
    && "categoria" in value && typeof value.categoria === "string";
}

export function CarritoCompras() {
  const { state, dispatch } = useCarrito();
  const productos = state.productos;
  const [cupon, setCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState("");
  const [errorCupon, setErrorCupon] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [actualizandoProductoId, setActualizandoProductoId] = useState<string | null>(null);
  const [eliminandoProductoId, setEliminandoProductoId] = useState<string | null>(null);
  const [errorCarrito, setErrorCarrito] = useState<string | null>(null);
  const [ofertas, setOfertas] = useState<ProductoOferta[]>([]);
  const [cargandoOfertas, setCargandoOfertas] = useState(true);
  const [errorOfertas, setErrorOfertas] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    async function cargarCarrito() {
      try {
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

  useEffect(() => {
    const controller = new AbortController();

    async function cargarOfertas() {
      try {
        const response = await fetch(
          "http://18.226.214.170:3000/api/v1/catalogo/productos/ofertas",
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`No se pudieron cargar las recomendaciones (${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("La respuesta de recomendaciones tiene un formato inválido.");
        }

        const ofertasValidas = data.filter(esProductoOferta);
        const invalidas = data.length - ofertasValidas.length;
        setOfertas(ofertasValidas);
        if (invalidas > 0) {
          setErrorOfertas(`${invalidas} recomendación(es) tienen datos incompletos y no se muestran.`);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("No se pudieron cargar las recomendaciones del carrito.", error);
          setErrorOfertas(
            error instanceof Error
              ? error.message
              : "No se pudieron cargar las recomendaciones.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargandoOfertas(false);
        }
      }
    }

    void cargarOfertas();
    return () => controller.abort();
  }, []);

  async function handleEliminar(id: string) {
    if (cargando || actualizandoProductoId !== null || eliminandoProductoId !== null) return;

    setEliminandoProductoId(id);
    setErrorCarrito(null);
    try {
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

  const subtotal = productos.reduce(
    (acc, producto) => acc + producto.precioUnitario * producto.cantidad,
    0,
  );

  let descuento = state.resumenApi?.descuentoCupon ?? 0;
  let total = state.resumenApi?.total ?? subtotal;
  switch (cuponAplicado) {
    case "CUPONCLIENTENUEVO":
      descuento = Math.min(subtotal, 10);
      total = subtotal - descuento;
      break;
    case "CYBERWEEK":
      descuento = subtotal * 0.2;
      total = subtotal - descuento;
      break;
    case "ENVIOGRATIS":
      descuento = 0;
      total = subtotal;
      break;
    case "BLACKFRIDAY":
      if (subtotal > 100) {
        descuento = subtotal * 0.15;
        total = subtotal - descuento;
      }
      break;
  }

  const handleAplicarCupon = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorCupon(null);

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
        setErrorCupon("Cupón no válido.");
    }
  };

  const productosRecomendados = ofertas.filter(
    (oferta) => !productos.some((producto) => producto.productoId === oferta.id),
  );
  const cantidadArticulos = state.resumenApi?.totalArticulos
    ?? productos.reduce((totalItems, producto) => totalItems + producto.cantidad, 0);
  const accionesDeshabilitadas = cargando
    || actualizandoProductoId !== null
    || eliminandoProductoId !== null;

  return (
    <div className="cart-page">
      <div className="container cart-page__container">
        <div className="cart-page__layout">
          <section className="cart-page__items" aria-labelledby="cart-title">
            <h1 className="cart-page__heading" id="cart-title">
              <span aria-hidden="true">🛒</span>
              Carrito de compras ({cantidadArticulos} artículos)
            </h1>

            {cargando && <p className="cart-page__notice" role="status">Cargando carrito...</p>}
            {errorCarrito && <p className="cart-page__error" role="alert">{errorCarrito}</p>}

            {!cargando && productos.length === 0 ? (
              <div className="cart-page__empty">
                <h2>Tu carrito está vacío</h2>
                <p>Explora el catálogo y encuentra algo para tu mascota.</p>
                <Link to="/tienda" className="cart-page__catalog-link">Volver al catálogo</Link>
              </div>
            ) : (
              <>
                <div className="cart-page__product-list">
                  {productos.map((producto) => (
                    <CartItem
                      key={producto.productoId}
                      producto={producto}
                      eliminando={eliminandoProductoId === producto.productoId}
                      actualizando={actualizandoProductoId === producto.productoId}
                      accionesDeshabilitadas={accionesDeshabilitadas}
                      onEliminar={() => handleEliminar(producto.productoId)}
                      onDisminuir={() => handleCantidad(producto.productoId, -1)}
                      onAumentar={() => handleCantidad(producto.productoId, 1)}
                    />
                  ))}
                </div>
                {productos.length > 0 && (
                  <button
                    className="cart-page__clear"
                    type="button"
                    disabled={accionesDeshabilitadas}
                    onClick={handleVaciar}
                  >
                    Vaciar carrito
                  </button>
                )}
              </>
            )}
          </section>

          {productos.length > 0 && (
            <aside className="cart-page__sidebar" aria-label="Cupón y resumen del pedido">
              <CouponBox
                value={cupon}
                isLoading={cargando}
                error={errorCupon}
                onChange={setCupon}
                onApply={handleAplicarCupon}
              />
              <OrderSummary
                subtotal={subtotal}
                descuento={descuento}
                total={total}
              />
            </aside>
          )}
        </div>

        <section className="cart-page__recommendations" aria-labelledby="cart-recommendations-title">
          <h2 id="cart-recommendations-title">¿Te faltó algo?</h2>
          {cargandoOfertas && <p role="status">Cargando recomendaciones...</p>}
          {errorOfertas && <p className="cart-page__error" role="alert">{errorOfertas}</p>}
          {!cargandoOfertas && !errorOfertas && productosRecomendados.length === 0 && (
            <p>No hay recomendaciones disponibles.</p>
          )}
          {productosRecomendados.length > 0 && (
            <CardCarrusel>
              {productosRecomendados.map((producto) => (
                <CardProducto
                  key={producto.id}
                  id={producto.id}
                  titulo={producto.nombre}
                  urlImagen={producto.imagenes[0]}
                  precio={producto.precio}
                  precioOriginal={producto.precioOriginal}
                  categoria={producto.categoria}
                />
              ))}
            </CardCarrusel>
          )}
        </section>
      </div>
    </div>
  );
}
