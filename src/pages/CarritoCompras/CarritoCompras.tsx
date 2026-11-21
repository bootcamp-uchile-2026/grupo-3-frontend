import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CardCarrusel } from "../../components/CardCarrusel/CardCarrusel";
import { CartItem } from "../../components/CartItem/CartItem";
import { CouponBox } from "../../components/CouponBox/CouponBox";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { UIProductCard } from "../../components/UIKit/UIProductCard";
import { IconShoppoingCart } from "../../components/UIKit/UIIcons";
import { useShallow } from "zustand/react/shallow";
import {
  selectCantidadArticulos,
  selectDescuentoCarrito,
  selectProductos,
  selectSubtotalCarrito,
  selectTotalCarrito,
  useCarritoStore,
} from "../../store/carritoStore";
import { adaptarProductoOferta, obtenerSugeridos } from "../../services/catalogo";
import type { ProductoOfertaView } from "../../schemas/catalogo";

type EstadoTarjetaOferta = "idle" | "agregando" | "agregado" | "error";

function formatoPrecio(precio: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(precio);
}

function TarjetaOfertaCarrito({ producto }: { producto: ProductoOfertaView }) {
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);
  const [estado, setEstado] = useState<EstadoTarjetaOferta>("idle");

  async function agregarAlCarrito() {
    setEstado("agregando");
    try {
      await agregarProducto({ productoId: producto.id, cantidad: 1 });
      setEstado("agregado");
    } catch (error) {
      console.error("No se pudo agregar el producto al carrito.", error);
      setEstado("error");
    }
  }

  return (
    <div>
      <UIProductCard
        imageSrc={producto.imagenes[0]}
        imageAlt={producto.nombre}
        name={producto.nombre}
        price={formatoPrecio(producto.precio)}
        previousPrice={producto.precioOriginal > producto.precio
          ? formatoPrecio(producto.precioOriginal)
          : undefined}
        rating={producto.calificacionPromedio}
        discountPercentage={producto.precioOriginal > producto.precio
          ? Math.round((producto.precioOriginal - producto.precio) / producto.precioOriginal * 100)
          : undefined}
        productTo={`/producto-individual/${encodeURIComponent(producto.id)}`}
        buttonLabel={estado === "agregando"
          ? "Agregando..."
          : estado === "agregado"
            ? "Agregado"
            : "Agregar al carrito"}
        onAddToCart={agregarAlCarrito}
        loading={estado === "agregando"}
        selected={estado === "agregado"}
      />
      {estado === "agregado" && <p role="status">Producto agregado al carrito.</p>}
      {estado === "error" && (
        <p role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>
      )}
    </div>
  );
}

export function CarritoCompras() {
  const productos = useCarritoStore(useShallow(selectProductos));
  const inicializar = useCarritoStore((state) => state.inicializar);
  const estadoStore = useCarritoStore((state) => state.estado);
  const errorStore = useCarritoStore((state) => state.error);
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto);
  const cambiarCantidad = useCarritoStore((state) => state.cambiarCantidad);
  const aplicarCupon = useCarritoStore((state) => state.aplicarCupon);
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito);
  const cantidadArticulos = useCarritoStore(selectCantidadArticulos);
  const subtotal = useCarritoStore(selectSubtotalCarrito);
  const descuento = useCarritoStore(selectDescuentoCarrito);
  const total = useCarritoStore(selectTotalCarrito);
  const [cupon, setCupon] = useState("");
  const [errorCupon, setErrorCupon] = useState<string | null>(null);
  const [actualizandoProductoId, setActualizandoProductoId] = useState<string | null>(null);
  const [eliminandoProductoId, setEliminandoProductoId] = useState<string | null>(null);
  const [vaciando, setVaciando] = useState(false);
  const [aplicandoCupon, setAplicandoCupon] = useState(false);
  const [errorOperacion, setErrorOperacion] = useState<string | null>(null);
  const [ofertas, setOfertas] = useState<ProductoOfertaView[]>([]);
  const [cargandoOfertas, setCargandoOfertas] = useState(true);
  const [errorOfertas, setErrorOfertas] = useState<string | null>(null);
  const cargando = estadoStore === "idle" || estadoStore === "loading";
  const errorCarrito = errorOperacion ?? errorStore;

  useEffect(() => {
    let activo = true;

    void inicializar().catch((error: unknown) => {
      if (activo) console.error("No se pudo cargar el carrito.", error);
    });

    return () => {
      activo = false;
    };
  }, [inicializar]);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarOfertas() {
      try {
        const response = await obtenerSugeridos({}, controller.signal);
        setOfertas(response.map(adaptarProductoOferta));
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
    setErrorOperacion(null);
    try {
      await eliminarProducto({ productoId: id });
    } catch (error) {
      console.error("No se pudo eliminar el producto del carrito.", error);
      setErrorOperacion(
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
    setErrorOperacion(null);
    try {
      await cambiarCantidad({ productoId: id, cantidad });
    } catch (error) {
      console.error("No se pudo actualizar la cantidad del producto.", error);
      setErrorOperacion(
        error instanceof Error
          ? error.message
          : "No se pudo actualizar la cantidad del producto.",
      );
    } finally {
      setActualizandoProductoId(null);
    }
  }

  async function handleVaciar() {
    setVaciando(true);
    setErrorOperacion(null);
    try {
      await vaciarCarrito();
    } catch (error) {
      console.error("No se pudo vaciar el carrito.", error);
      setErrorOperacion(
        error instanceof Error ? error.message : "No se pudo vaciar el carrito.",
      );
    } finally {
      setVaciando(false);
    }
  };

  const handleAplicarCupon = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorCupon(null);
    setAplicandoCupon(true);
    try {
      await aplicarCupon(cupon.trim().toUpperCase());
    } catch (error) {
      console.error("No se pudo aplicar el cupón.", error);
      setErrorCupon(
        error instanceof Error ? error.message : "No se pudo aplicar el cupón.",
      );
    } finally {
      setAplicandoCupon(false);
    }
  };

  const productosRecomendados = ofertas;
  const layoutClassName = !cargando && productos.length === 0
    ? "cart-page__layout cart-page__layout--empty"
    : "cart-page__layout";
  const accionesDeshabilitadas = cargando
    || actualizandoProductoId !== null
    || eliminandoProductoId !== null
    || vaciando
    || aplicandoCupon;

  return (
    <div className="cart-page">
      <div className="container cart-page__container">
        <div className={layoutClassName}>
          <section className="cart-page__items" aria-labelledby="cart-title">
            <h1 className="cart-page__heading" id="cart-title">
              <IconShoppoingCart
                className="cart-page__heading-icon"
                color="var(--terciario-30-color)"
                aria-hidden="true"
              />
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
                isLoading={cargando || aplicandoCupon}
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
                <TarjetaOfertaCarrito
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </CardCarrusel>
          )}
        </section>
      </div>
    </div>
  );
}