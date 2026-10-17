import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CardProductoConfirmacion } from "../../components/CardProductoConfirmacion/CardProductoConfirmacion";
import { obtenerPedido, type PedidoCreado } from "../../services/pedidos";

const formatoCLP = (monto: number): string =>
    `$${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(monto)}`;

function formatoFecha(fecha: string): string {
    const fechaPedido = new Date(fecha);
    return Number.isNaN(fechaPedido.getTime())
        ? fecha
        : new Intl.DateTimeFormat("es-CL", {
            dateStyle: "long",
            timeStyle: "short",
        }).format(fechaPedido);
}

export function ConfirmacionPedido() {
    const { id } = useParams();
    const [pedido, setPedido] = useState<PedidoCreado | null>(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const pedidoId = id;

        const controller = new AbortController();
        let activo = true;

        async function cargarPedido() {
            try {
                const pedidoApi = await obtenerPedido(pedidoId, controller.signal);
                if (activo) {
                    setPedido(pedidoApi);
                }
            } catch (cause) {
                if (activo && !controller.signal.aborted) {
                    console.error("No se pudo consultar el pedido para la confirmación.", cause);
                    setError(cause instanceof Error ? cause.message : "No se pudo consultar el pedido.");
                }
            } finally {
                if (activo && !controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        void cargarPedido();
        return () => {
            activo = false;
            controller.abort();
        };
    }, [id]);

    if (!id) {
        return (
            <section className="container confirmacion-container">
                <div className="info-confirmacion" role="alert">
                    <h1>No se pudo cargar la confirmación</h1>
                    <p>Falta el identificador del pedido.</p>
                    <Link to="/carrito-compras">Volver al carrito</Link>
                </div>
            </section>
        );
    }

    if (cargando) {
        return <p className="container confirmacion-estado" role="status">Cargando pedido...</p>;
    }

    if (error || !pedido) {
        return (
            <section className="container confirmacion-container">
                <div className="info-confirmacion" role="alert">
                    <h1>No se pudo cargar la confirmación</h1>
                    <p>{error ?? "No se encontró el pedido solicitado."}</p>
                    <Link to="/carrito-compras">Volver al carrito</Link>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container confirmacion-container">
                <div className="info-confirmacion">
                    <div className="confirmacion-header">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                        <h1>¡Recibimos tu pedido!</h1>
                        <p>Muchas gracias por comprar con nosotros.</p>
                        <p>Número de pedido: <strong>{pedido.id}</strong></p>
                        <p>Estado: {pedido.estadoPedido}</p>
                        <p>Fecha: {formatoFecha(pedido.fechaCreacion)}</p>
                    </div>

                    <div className="detalles-entrega">
                        <h2>Detalles de entrega</h2>
                        <div className="content-detalle-entrega">
                            <h3>Entrega para:</h3>
                            <p>{pedido.nombreCliente}</p>
                            {pedido.correoElectronico && <p>{pedido.correoElectronico}</p>}
                            {pedido.telefono && <p>Teléfono: {pedido.telefono}</p>}
                        </div>
                        <div className="content-detalle-entrega">
                            <h3>Modo de entrega:</h3>
                            <p>{pedido.modoEntrega}</p>
                            {pedido.tiempoEstimadoEntrega && <p>{pedido.tiempoEstimadoEntrega}</p>}
                        </div>
                        {(pedido.direccionEntrega || pedido.sucursalRetiro) && (
                            <div className="content-detalle-entrega">
                                <h3>{pedido.direccionEntrega ? "Dirección de entrega:" : "Sucursal de retiro:"}</h3>
                                <p>{pedido.direccionEntrega ?? pedido.sucursalRetiro}</p>
                            </div>
                        )}
                    </div>

                    <div className="resumen-pedido">
                        <h2>Resumen del pedido</h2>
                        {pedido.items.map((item) => (
                            <CardProductoConfirmacion
                                key={item.productoId}
                                productoId={item.productoId}
                                nombreProducto={item.nombre}
                                cantidad={item.cantidad}
                                precio={item.subtotal}
                                imagenUrl={item.imagen}
                            />
                        ))}
                        <div className="resumen-totales-confirmacion">
                            <p>Subtotal: {formatoCLP(pedido.subtotal)}</p>
                            <p>Envío: {formatoCLP(pedido.costoEnvio)}</p>
                            <p>Descuento: {formatoCLP(pedido.descuento)}</p>
                            <strong>Total: {formatoCLP(pedido.total)}</strong>
                        </div>
                    </div>
                </div>
                <Link className="seguir-comprando" to="/tienda">Seguir comprando</Link>
            </div>
        </section>
    );
}
