import { UIQualification } from "../../UIKit/UIQualification/UIQualification";
import type { Resena } from "../Resenas/DatosResenasDemo";

type ListaResenasProps = {
    resenas: Resena[];
};

export function ListaResenas({ resenas }: ListaResenasProps) {
    if (resenas.length === 0) {
        return <p className="lista-resenas__vacia">No hay reseñas para este filtro.</p>;
    }

    return (
        <div className="lista-resenas">
            {resenas.map((resena) => (
                <article className="lista-resenas__item" key={resena.id}>
                    <div className="lista-resenas__perfil">
                        <strong className="lista-resenas__nombre">{resena.nombre}</strong>
                        <div className="lista-resenas__avatar" aria-hidden="true">
                            {resena.nombre.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <div className="lista-resenas__contenido">
                        <div className="lista-resenas__autor">
                            <UIQualification value={resena.puntuacion} size="lg" />
                            <time dateTime={resena.fecha}>
                                {new Intl.DateTimeFormat("es-CL", { dateStyle: "long" }).format(new Date(`${resena.fecha}T12:00:00`))}
                            </time>
                        </div>
                        <h3>{resena.titulo}</h3>
                        <p>{resena.comentario}</p>
                    </div>
                </article>
            ))}
        </div>
    );
}
