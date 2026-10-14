import { useState } from "react";
import { Link } from "react-router";
import { agregarProductoAlCarrito } from "../../services/carrito";

type CardProductoProps = {
    id?: string;
    titulo: string;
    urlImagen: string;
    precio: number;
    precioOriginal?: number;
    categoria: string;

}

export function CardProducto({ id, titulo, urlImagen, precio, precioOriginal, categoria }: CardProductoProps) {
    const [estadoCarrito, setEstadoCarrito] = useState<"idle" | "agregando" | "agregado" | "error">("idle");

    async function manejarAgregarAlCarrito() {
        if (!id) return;

        setEstadoCarrito("agregando");
        try {
            await agregarProductoAlCarrito(id, 1);
            setEstadoCarrito("agregado");
        } catch (error) {
            console.error("No se pudo agregar el producto al carrito.", error);
            setEstadoCarrito("error");
        }
    }

    return (
        <article className="producto-card">
            <Link to={id ? `/producto-individual/${encodeURIComponent(id)}` : "/producto-individual"}>
                <img src={urlImagen} alt={titulo} />
                <div className="producto-card-content">
                    <div className="producto-info">
                        <h3>{titulo}</h3>
                        <p>{categoria}</p>
                    </div>
                    <div className="producto-precio">
                        {precioOriginal !== undefined && precioOriginal > precio && (
                            <p className="producto-precio-original">Precio original:<br />${precioOriginal.toFixed(2)}</p>
                        )}
                        <p>Precio:<br />${precio.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
            <div className="producto-card-actions">
                <button
                    type="button"
                    disabled={!id || estadoCarrito === "agregando"}
                    onClick={manejarAgregarAlCarrito}
                >
                    {estadoCarrito === "agregando"
                        ? "Agregando..."
                        : estadoCarrito === "agregado"
                            ? "Agregado"
                            : "Agregar al carrito"}
                </button>
                {estadoCarrito === "agregado" && <p role="status">Producto agregado al carrito.</p>}
                {estadoCarrito === "error" && <p role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>}
            </div>
        </article>
    )
}