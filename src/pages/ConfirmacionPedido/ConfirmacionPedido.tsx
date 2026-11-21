import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import huronConfirmacion from "../../assets/ConfirmacionPedido/huron-confirmacion.png";
import UIButton from "../../components/UIKit/UIButton/UIButton";
import { IconApprove, IconDocument, IconLocation, IconTruck } from "../../components/UIKit/UIIcons";
import { CardProductoConfirmacion } from "../../components/CardProductoConfirmacion/CardProductoConfirmacion";
import { obtenerPedido, obtenerSeguimientoPedido } from "../../services/pedidos";
import type { PedidoCreado, SeguimientoPedido } from "../../schemas/pedidos";
import { usePedidosStore } from "../../store/pedidosStore";

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
    const pedidoCreado = usePedidosStore((state) => state.pedido?.id === id ? state.pedido : null);
    const [detalle, setDetalle] = useState<{ id: string; pedido: PedidoCreado | null; error: string | null }>();
    const estadoRef = useRef<HTMLDListElement>(null);
    const [tracking, setTracking] = useState<{ id: string; seguimiento: SeguimientoPedido | null }>();

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();

        void obtenerPedido(id, controller.signal).then(
            (pedido) => {
                if (!controller.signal.aborted) setDetalle({ id, pedido, error: null });
            },
            (cause: unknown) => {
                if (controller.signal.aborted) return;
                const error = cause instanceof Error ? cause.message : "No se pudo consultar el pedido.";
                setDetalle({ id, pedido: null, error });
            },
        );

        void obtenerSeguimientoPedido(id, controller.signal).then(
            (seguimiento) => {
                if (!controller.signal.aborted) setTracking({ id, seguimiento });
            },
            () => {
                if (!controller.signal.aborted) setTracking({ id, seguimiento: null });
            },
        );

        return () => controller.abort();
    }, [id]);

    const detalleActual = detalle?.id === id ? detalle : undefined;
    const trackingActual = tracking?.id === id ? tracking : undefined;
    const pedido = detalleActual?.pedido ?? pedidoCreado;
    const error = detalleActual?.error;
    const cargando = !detalleActual && !pedido;
    const estadoPedido = trackingActual?.seguimiento?.estadoActual ?? pedido?.estadoPedido;

    if (id && cargando) {
        return <p className="confirmacion-pedido__contenedor" role="status">Cargando pedido...</p>;
    }

    if (!id || !pedido) {
        return (
            <section className="confirmacion-pedido confirmacion-pedido__contenedor">
                <div className="confirmacion-pedido__tarjeta" role="alert">
                    <h1 className="confirmacion-pedido__titulo">No se pudo cargar la confirmación</h1>
                    <p>{id ? error ?? "No se encontró el pedido solicitado." : "Falta el identificador del pedido."}</p>
                    <Link className="ui-button ui-button--primary confirmacion-pedido__accion" to="/carrito-compras">
                        Volver al carrito
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="confirmacion-pedido confirmacion-pedido__contenedor" aria-labelledby="confirmacion-titulo">
            <div className="confirmacion-pedido__tarjeta">
                <header className="confirmacion-pedido__cabecera">
                    <IconApprove className="confirmacion-pedido__aprobacion" color="currentColor" aria-hidden="true" />
                    <h1 id="confirmacion-titulo" className="confirmacion-pedido__titulo">¡Recibimos tu pedido!</h1>
                    <p className="confirmacion-pedido__mensaje">Muchas gracias por comprar con nosotros.</p>
                    <img className="confirmacion-pedido__ilustracion" src={huronConfirmacion} alt="" decoding="async" />
                    <dl className="confirmacion-pedido__estado" ref={estadoRef} tabIndex={-1} aria-label="Estado del pedido">
                        <div><dt>Número de pedido:</dt><dd><strong>{pedido.id}</strong></dd></div>
                        <div><dt>Estado:</dt><dd>{estadoPedido}</dd></div>
                        <div><dt>Fecha:</dt><dd>{formatoFecha(pedido.fechaCreacion)}</dd></div>
                    </dl>
                    {trackingActual?.seguimiento === null && (
                        <p role="status">El seguimiento del pedido no está disponible por ahora.</p>
                    )}
                </header>

                <section className="confirmacion-pedido__entrega" aria-labelledby="confirmacion-entrega">
                    <h2 id="confirmacion-entrega" className="confirmacion-pedido__subtitulo">
                        <IconLocation color="currentColor" aria-hidden="true" /> Detalles de entrega
                    </h2>
                    <div className="confirmacion-pedido__detalles">
                        <div className="confirmacion-pedido__detalle confirmacion-pedido__detalle--destinatario">
                            <h3>Entrega para:</h3>
                            <p>{pedido.nombreCliente}</p>
                            {pedido.correoElectronico && <p>{pedido.correoElectronico}</p>}
                            {pedido.telefono && <p>Teléfono: {pedido.telefono}</p>}
                        </div>
                        <div className="confirmacion-pedido__detalle confirmacion-pedido__detalle--modalidad">
                            <h3>Modo de entrega:</h3>
                            <p>{pedido.modoEntrega}</p>
                            {pedido.tiempoEstimadoEntrega && <p>{pedido.tiempoEstimadoEntrega}</p>}
                        </div>
                        {(pedido.direccionEntrega || pedido.sucursalRetiro) && (
                            <div className="confirmacion-pedido__detalle confirmacion-pedido__detalle--direccion">
                                <h3>{pedido.direccionEntrega ? "Dirección de entrega:" : "Sucursal de retiro:"}</h3>
                                <p>{pedido.direccionEntrega || pedido.sucursalRetiro}</p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="confirmacion-pedido__resumen" aria-labelledby="confirmacion-resumen">
                    <h2 id="confirmacion-resumen" className="confirmacion-pedido__subtitulo">
                        <IconDocument color="currentColor" aria-hidden="true" /> Resumen del pedido
                    </h2>
                    <div className="confirmacion-pedido__productos">
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
                    </div>
                    <dl className="confirmacion-pedido__totales">
                        <div><dt>Subtotal:</dt><dd>{formatoCLP(pedido.subtotal)}</dd></div>
                        <div><dt>Envío:</dt><dd>{formatoCLP(pedido.costoEnvio)}</dd></div>
                        {pedido.descuento > 0 && (
                            <div><dt>Descuento:</dt><dd>−{formatoCLP(pedido.descuento)}</dd></div>
                        )}
                        <div className="confirmacion-pedido__total"><dt>Total:</dt><dd>{formatoCLP(pedido.total)}</dd></div>
                    </dl>
                </section>
            </div>

            <div className="confirmacion-pedido__acciones">
                <UIButton
                    variant="tertiary"
                    className="confirmacion-pedido__accion"
                    iconLeft={<IconTruck color="currentColor" />}
                    onClick={() => estadoRef.current?.focus()}
                >
                    Seguimiento del pedido
                </UIButton>
                <Link className="ui-button ui-button--primary confirmacion-pedido__accion" to="/tienda">
                    Seguir comprando
                </Link>
            </div>
        </section>
    );
}
