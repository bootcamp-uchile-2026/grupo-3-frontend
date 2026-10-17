export type VistaTienda = "grid" | "list";
export type OrdenTiendaValor = "catalogo" | "precio-asc" | "precio-desc" | "nombre";

function esOrdenTiendaValor(valor: string): valor is OrdenTiendaValor {
    return ["catalogo", "precio-asc", "precio-desc", "nombre"].includes(valor);
}

type OrdenTiendaProps = {
    vista: VistaTienda;
    orden: OrdenTiendaValor;
    onCambiarVista: (vista: VistaTienda) => void;
    onCambiarOrden: (orden: OrdenTiendaValor) => void;
};

export function OrdenTienda({ vista, orden, onCambiarVista, onCambiarOrden }: OrdenTiendaProps) {
    return (
        <div className="orden-productos">
            <div className="orden-productos-botones" role="group" aria-label="Presentación de productos">
                <button
                    type="button"
                    className={vista === "grid" ? "is-active" : ""}
                    aria-label="Ver productos en grilla"
                    aria-pressed={vista === "grid"}
                    onClick={() => onCambiarVista("grid")}
                >
                    <span aria-hidden="true">▦</span>
                </button>
                <button
                    type="button"
                    className={vista === "list" ? "is-active" : ""}
                    aria-label="Ver productos en lista"
                    aria-pressed={vista === "list"}
                    onClick={() => onCambiarVista("list")}
                >
                    <span aria-hidden="true">☷</span>
                </button>
            </div>
            <label className="orden-productos__selector">
                <span>Ordenar:</span>
                <select
                    value={orden}
                    onChange={(event) => {
                        const valor = event.currentTarget.value;
                        if (esOrdenTiendaValor(valor)) onCambiarOrden(valor);
                    }}
                >
                    <option value="catalogo">Orden del catálogo</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="nombre">Nombre: A-Z</option>
                </select>
            </label>
        </div>
    );
}
