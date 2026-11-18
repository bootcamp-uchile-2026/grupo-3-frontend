import { UIDropdown, type DropdownOption } from "../UIKit/UIDropdown/UIDropdown";
import { IconApps, IconAppsList } from "../UIKit/UIIcons";

export type VistaTienda = "grid" | "list";
export type OrdenTiendaValor = "catalogo" | "precio-asc" | "precio-desc" | "nombre";

function esOrdenTiendaValor(valor: string): valor is OrdenTiendaValor {
    return ["catalogo", "precio-asc", "precio-desc", "nombre"].includes(valor);
}

const opcionesOrden: DropdownOption[] = [
    { value: "catalogo", label: "Relevancia" },
    { value: "precio-asc", label: "Precio: menor a mayor" },
    { value: "precio-desc", label: "Precio: mayor a menor" },
    { value: "nombre", label: "Nombre" },
];

type OrdenTiendaProps = {
    vista: VistaTienda;
    orden: OrdenTiendaValor;
    onCambiarVista: (vista: VistaTienda) => void;
    onCambiarOrden: (orden: OrdenTiendaValor) => void;
};

export function OrdenTienda({ vista, orden, onCambiarVista, onCambiarOrden }: OrdenTiendaProps) {
    return (
        <div className="orden-productos">
            <div className="orden-productos__botones" role="group" aria-label="Presentación de productos">
                <button
                    type="button"
                    className="orden-productos__boton"
                    aria-label="Ver productos en grilla"
                    aria-pressed={vista === "grid"}
                    onClick={() => onCambiarVista("grid")}
                >
                    <IconApps color="var(--primario-90-color)" />
                </button>
                <button
                    type="button"
                    className="orden-productos__boton"
                    aria-label="Ver productos en lista"
                    aria-pressed={vista === "list"}
                    onClick={() => onCambiarVista("list")}
                >
                    <IconAppsList color="var(--primario-90-color)" />
                </button>
            </div>
            <div className="orden-productos__selector" role="group" aria-label="Ordenar productos">
                <div className="orden-productos__desplegable">
                    <UIDropdown
                        options={opcionesOrden}
                        value={orden}
                        iconLeft={<span className="orden-productos__prefijo">Orden:</span>}
                        onChange={(valor) => {
                            if (esOrdenTiendaValor(valor)) onCambiarOrden(valor);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
