import { useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { FichaTecnica } from "../FichaTecnica/FichaTecnica";

type TabsProductoProps = {
    descripcion: string;
    modoDeUso?: string;
    fichaTecnica?: string;
    fichaTecnicaDetalle?: Record<string, string>;
};

type Tab = "ficha" | "descripcion" | "uso";

const tabs: { id: Tab; label: string }[] = [
    { id: "ficha", label: "Ficha técnica" },
    { id: "descripcion", label: "Descripción" },
    { id: "uso", label: "Modo de uso" },
];

export function TabsProducto({ descripcion, modoDeUso, fichaTecnica, fichaTecnicaDetalle }: TabsProductoProps) {
    const [tabActiva, setTabActiva] = useState<Tab>("ficha");
    const panelId = `producto-panel-${tabActiva}`;

    function manejarTeclado(event: ReactKeyboardEvent<HTMLButtonElement>) {
        const indiceActual = tabs.findIndex((tab) => tab.id === tabActiva);
        let indiceSiguiente = indiceActual;

        if (event.key === "ArrowRight") indiceSiguiente = (indiceActual + 1) % tabs.length;
        else if (event.key === "ArrowLeft") indiceSiguiente = (indiceActual - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") indiceSiguiente = 0;
        else if (event.key === "End") indiceSiguiente = tabs.length - 1;
        else return;

        event.preventDefault();
        const siguienteTab = tabs[indiceSiguiente].id;
        setTabActiva(siguienteTab);
        document.getElementById(`producto-tab-${siguienteTab}`)?.focus();
    }

    return (
        <div className="tabs-producto">
            <div className="tabs-producto__botones" role="tablist" aria-label="Información del producto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        id={`producto-tab-${tab.id}`}
                        type="button"
                        role="tab"
                        aria-selected={tabActiva === tab.id}
                        aria-controls={`producto-panel-${tab.id}`}
                        tabIndex={tabActiva === tab.id ? 0 : -1}
                        className={`tabs-producto__boton${tabActiva === tab.id ? " is-active" : ""}`}
                        onClick={() => setTabActiva(tab.id)}
                        onKeyDown={manejarTeclado}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div
                className="tabs-producto__panel"
                id={panelId}
                role="tabpanel"
                aria-labelledby={`producto-tab-${tabActiva}`}
                tabIndex={0}
            >
                {tabActiva === "ficha" && <FichaTecnica detalle={fichaTecnicaDetalle} texto={fichaTecnica} />}
                {tabActiva === "descripcion" && <p>{descripcion}</p>}
                {tabActiva === "uso" && <p>{modoDeUso || "No hay instrucciones de uso disponibles para este producto."}</p>}
            </div>
        </div>
    );
}
