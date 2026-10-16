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
                    <div className="lista-resenas__avatar" aria-hidden="true">
                        {resena.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="lista-resenas__contenido">
                        <div className="lista-resenas__autor">
                            <strong>{resena.nombre}</strong>
                            <span className="lista-resenas__estrellas" aria-label={`${resena.puntuacion} de 5 estrellas`}>
                                {"★".repeat(resena.puntuacion)}{"☆".repeat(5 - resena.puntuacion)}
                            </span>
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
