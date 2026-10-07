import { CardProductoConfirmacion } from "../../components/CardProductoConfirmacion/CardProductoConfirmacion";

export function ConfirmacionPedido() {
    return (
        <section>
            <div className="container confirmacion-container">
                <div className="info-confirmacion">
                    <div className="confirmacion-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-check">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l5 5l10 -10" />
                        </svg>
                        <h1>¡Recibimos tu pedido!</h1>
                        <p>Muchas gracias por comprar con nosotros.</p>
                    </div>
                    <div className="detalles-entrega">
                        <h2>Detalles de entrega</h2>
                        <div className="content-detalle-entrega">
                            <h3>Entrega para: </h3>
                            <p>Nombre: John Doe</p>
                            <p>Número de teléfono: 123-456-7890</p>
                        </div>
                        <div className="content-detalle-entrega">
                            <h3>Modo de entrega: </h3>
                            <p>Delivery</p>
                            <p>2 a 3 días</p>
                        </div>
                        <div className="content-detalle-entrega">
                            <h3>Dirección de entrega: </h3>
                            <p>123 Main Street</p>
                            <p>Comuna, Ciudad</p>
                        </div>
                    </div>
                    <div className="resumen-pedido">
                        <h2>Resumen del pedido</h2>
                        <CardProductoConfirmacion nombreProducto="Producto 1" cantidad={1} precio={5000} imagenUrl="https://placehold.co/40x40" />
                        <CardProductoConfirmacion nombreProducto="Producto 2" cantidad={2} precio={10000} imagenUrl="https://placehold.co/40x40" />
                        <CardProductoConfirmacion nombreProducto="Producto 3" cantidad={1} precio={7500} imagenUrl="https://placehold.co/40x40" />
                        <CardProductoConfirmacion nombreProducto="Producto 4" cantidad={3} precio={15000} imagenUrl="https://placehold.co/40x40" />
                    </div>
                </div>
                <button className="seguimiento-pedido">Seguimiento del pedido</button>
                <button className="seguir-comprando">Seguir comprando</button>
            </div>
        </section>
    );
}   