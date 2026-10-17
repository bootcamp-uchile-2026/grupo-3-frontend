import { Link } from "react-router-dom";

interface OrderSummaryProps {
  subtotal: number;
  descuento: number;
  total: number;
}

function formatoPrecio(precio: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(precio);
}

export function OrderSummary({ subtotal, descuento, total }: OrderSummaryProps) {
  return (
    <section className="order-summary" aria-labelledby="order-summary-title">
      <h2 className="order-summary__title" id="order-summary-title">
        <span aria-hidden="true">▤</span>
        Resumen del pedido
      </h2>
      <dl className="order-summary__totals">
        <div className="order-summary__row">
          <dt>Subtotal:</dt>
          <dd>{formatoPrecio(subtotal)}</dd>
        </div>
        {descuento > 0 && (
          <div className="order-summary__row order-summary__row--discount">
            <dt>Descuento:</dt>
            <dd>−{formatoPrecio(descuento)}</dd>
          </div>
        )}
        <div className="order-summary__row order-summary__row--total">
          <dt>Total:</dt>
          <dd>{formatoPrecio(total)}</dd>
        </div>
      </dl>
      <Link className="order-summary__checkout" to="/carrito-compras/checkout">
        Finalizar compra
      </Link>
    </section>
  );
}
