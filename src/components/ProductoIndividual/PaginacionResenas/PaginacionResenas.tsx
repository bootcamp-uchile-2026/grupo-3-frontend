type PaginacionResenasProps = {
    paginaActual: number;
    totalPaginas: number;
    onCambiarPagina: (pagina: number) => void;
};

export function PaginacionResenas({ paginaActual, totalPaginas, onCambiarPagina }: PaginacionResenasProps) {
    if (totalPaginas <= 1) return null;

    return (
        <nav className="paginacion-resenas" aria-label="Paginación de reseñas">
            <button type="button" aria-label="Primera página" disabled={paginaActual === 1} onClick={() => onCambiarPagina(1)}>
                «
            </button>
            <button type="button" aria-label="Página anterior" disabled={paginaActual === 1} onClick={() => onCambiarPagina(paginaActual - 1)}>
                ‹
            </button>
            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((pagina) => (
                <button
                    key={pagina}
                    type="button"
                    aria-label={`Página ${pagina}`}
                    aria-current={paginaActual === pagina ? "page" : undefined}
                    className={paginaActual === pagina ? "is-active" : ""}
                    onClick={() => onCambiarPagina(pagina)}
                >
                    {pagina}
                </button>
            ))}
            <button
                type="button"
                aria-label="Página siguiente"
                disabled={paginaActual === totalPaginas}
                onClick={() => onCambiarPagina(paginaActual + 1)}
            >
                ›
            </button>
            <button
                type="button"
                aria-label="Última página"
                disabled={paginaActual === totalPaginas}
                onClick={() => onCambiarPagina(totalPaginas)}
            >
                »
            </button>
        </nav>
    );
}
