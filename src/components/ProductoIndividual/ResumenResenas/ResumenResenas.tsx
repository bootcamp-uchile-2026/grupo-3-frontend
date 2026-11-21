import ilustracionConejo from "../../../assets/ProductoIndividual/resenas-conejo.png";
import ilustracionGato from "../../../assets/ProductoIndividual/resenas-gato.png";
import ilustracionHuron from "../../../assets/ProductoIndividual/resenas-huron.png";
import UIButton from "../../UIKit/UIButton/UIButton";
import { UIQualification } from "../../UIKit/UIQualification/UIQualification";
import type { FiltroResenas, Resena } from "../Resenas/DatosResenasDemo";

type ResumenResenasProps = {
    resenas: Resena[];
    filtro: FiltroResenas;
    onCambiarFiltro: (filtro: FiltroResenas) => void;
    onEscribirResena: () => void;
};

const filtros: { valor: FiltroResenas; etiqueta: string }[] = [
    { valor: "todas", etiqueta: "Todos" },
    { valor: "recientes", etiqueta: "Recientes" },
    { valor: "positivas", etiqueta: "Positivas" },
    { valor: "criticas", etiqueta: "Críticas" },
    { valor: "cinco-estrellas", etiqueta: "5 ★" },
];

export function ResumenResenas({ resenas, filtro, onCambiarFiltro, onEscribirResena }: ResumenResenasProps) {
    const total = resenas.length;
    const promedio = total
        ? resenas.reduce((suma, resena) => suma + resena.puntuacion, 0) / total
        : 0;

    return (
        <section className="resumen-resenas" aria-labelledby="titulo-resenas">
            <img
                className="resumen-resenas__ilustracion-gato"
                src={ilustracionGato}
                alt=""
                width={340}
                height={151}
                loading="lazy"
                decoding="async"
            />
            <h2 id="titulo-resenas">Reseñas de clientes</h2>
            <p className="resumen-resenas__aviso">
                Datos de demostración: estas reseñas no son opiniones reales ni verificadas de este producto.
            </p>
            <div className="resumen-resenas__detalle">
                <div className="resumen-resenas__ilustraciones-laterales" aria-hidden="true">
                    <img
                        className="resumen-resenas__ilustracion-conejo"
                        src={ilustracionConejo}
                        alt=""
                        width={219}
                        height={171}
                        loading="lazy"
                        decoding="async"
                    />
                    <img
                        className="resumen-resenas__ilustracion-huron"
                        src={ilustracionHuron}
                        alt=""
                        width={245}
                        height={193}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="resumen-resenas__filtros" aria-label="Filtrar reseñas">
                    {filtros.map((opcion) => (
                        <UIButton
                            key={opcion.valor}
                            variant="tertiary"
                            size="M"
                            aria-pressed={filtro === opcion.valor}
                            onClick={() => onCambiarFiltro(opcion.valor)}
                        >
                            {opcion.etiqueta}
                        </UIButton>
                    ))}
                </div>
                <div className="resumen-resenas__puntuaciones">
                    <div className="resumen-resenas__promedio">
                        <strong>{total ? promedio.toFixed(1).replace(".", ",") : "—"}</strong>
                        <UIQualification value={promedio} size="lg" />
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
                                    <span className="resumen-resenas__cantidad">{Math.round(porcentaje)}% ({cantidad})</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <p className="resumen-resenas__total">Basado en {total} reseñas de demostración</p>
                <UIButton className="resumen-resenas__escribir" variant="secondary" onClick={onEscribirResena}>
                    Escribe una reseña
                </UIButton>
            </div>
        </section>
    );
}
