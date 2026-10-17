import type { FiltroResenas, Resena } from "../Resenas/DatosResenasDemo";

type ResumenResenasProps = {
    resenas: Resena[];
    filtro: FiltroResenas;
    onCambiarFiltro: (filtro: FiltroResenas) => void;
    onEscribirResena: () => void;
};

const filtros: { valor: FiltroResenas; etiqueta: string }[] = [
    { valor: "todas", etiqueta: "Todas" },
    { valor: "recientes", etiqueta: "Recientes" },
    { valor: "positivas", etiqueta: "Positivas" },
    { valor: "criticas", etiqueta: "Críticas" },
];

function Estrellas({ puntuacion }: { puntuacion: number }) {
    return (
        <span className="resumen-resenas__estrellas" aria-label={`${puntuacion} de 5 estrellas`}>
            {"★".repeat(puntuacion)}{"☆".repeat(5 - puntuacion)}
        </span>
    );
}

export function ResumenResenas({ resenas, filtro, onCambiarFiltro, onEscribirResena }: ResumenResenasProps) {
    const total = resenas.length;
    const promedio = total
        ? resenas.reduce((suma, resena) => suma + resena.puntuacion, 0) / total
        : 0;

    return (
        <section className="resumen-resenas" aria-labelledby="titulo-resenas">
            <h2 id="titulo-resenas">Reseñas de clientes</h2>
            <p className="resumen-resenas__aviso">
                Datos de demostración: estas reseñas no son opiniones reales ni verificadas de este producto.
            </p>
            <div className="resumen-resenas__filtros" aria-label="Filtrar reseñas">
                {filtros.map((opcion) => (
                    <button
                        key={opcion.valor}
                        type="button"
                        className={filtro === opcion.valor ? "is-active" : ""}
                        aria-pressed={filtro === opcion.valor}
                        onClick={() => onCambiarFiltro(opcion.valor)}
                    >
                        {opcion.etiqueta}
                    </button>
                ))}
            </div>
            <div className="resumen-resenas__puntuaciones">
                <div className="resumen-resenas__promedio">
                    <strong>{total ? promedio.toFixed(1).replace(".", ",") : "—"}</strong>
                    <Estrellas puntuacion={Math.round(promedio)} />
                    <span>{total} reseñas de demostración</span>
                </div>
                <div className="resumen-resenas__distribucion" aria-label="Distribución de puntuaciones de demostración">
                    {[5, 4, 3, 2, 1].map((puntuacion) => {
                        const cantidad = resenas.filter((resena) => resena.puntuacion === puntuacion).length;
                        const porcentaje = total ? (cantidad / total) * 100 : 0;
                        return (
                            <div className="resumen-resenas__fila" key={puntuacion}>
                                <span>{puntuacion} ★</span>
                                <span className="resumen-resenas__barra" aria-hidden="true">
                                    <span style={{ width: `${porcentaje}%` }} />
                                </span>
                                <span>{cantidad}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <button className="resumen-resenas__escribir" type="button" onClick={onEscribirResena}>
                Escribe una reseña
            </button>
        </section>
    );
}
