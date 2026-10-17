import { Link } from "react-router-dom";
import type { ItemCarritoApi } from "../../services/carrito";
import { QuantityStepper } from "../QuantityStepper/QuantityStepper";

interface CartItemProps {
  producto: ItemCarritoApi;
  eliminando: boolean;
  actualizando: boolean;
  accionesDeshabilitadas: boolean;
  onEliminar: () => void;
  onDisminuir: () => void;
  onAumentar: () => void;
}

function formatoPrecio(precio: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(precio);
}

export function CartItem({
  producto,
  eliminando,
  actualizando,
  accionesDeshabilitadas,
  onEliminar,
  onDisminuir,
  onAumentar,
}: CartItemProps) {
  return (
    <article className="cart-item">
      <Link
        className="cart-item__image-link"
        to={`/producto-individual/${encodeURIComponent(producto.productoId)}`}
        aria-label={`Ver ${producto.nombre}`}
      >
        {producto.imagen
          ? <img className="cart-item__image" src={producto.imagen} alt="" />
          : <span className="cart-item__image-placeholder" aria-hidden="true" />}
      </Link>
      <div className="cart-item__details">
        <Link
          className="cart-item__name"
          to={`/producto-individual/${encodeURIComponent(producto.productoId)}`}
        >
          {producto.nombre}
        </Link>
        {producto.marca && <span className="cart-item__brand">{producto.marca}</span>}
        <button
          className="cart-item__remove"
          type="button"
          aria-label={`Eliminar ${producto.nombre} del carrito`}
          disabled={accionesDeshabilitadas}
          onClick={onEliminar}
        >
          <span aria-hidden="true">▤</span>
          {eliminando ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
      <div className="cart-item__purchase">
        <div className="cart-item__prices">
          {producto.precioOriginal > producto.precioUnitario && (
            <span className="cart-item__original-price">{formatoPrecio(producto.precioOriginal)}</span>
          )}
          <span className="cart-item__current-price">{formatoPrecio(producto.precioUnitario)}</span>
        </div>
        <QuantityStepper
          value={producto.cantidad}
          disabled={accionesDeshabilitadas}
          decrementDisabled={producto.cantidad <= 1}
          onDecrement={onDisminuir}
          onIncrement={onAumentar}
        />
        {actualizando && <span className="cart-item__status" role="status">Actualizando...</span>}
      </div>
    </article>
  );
}
