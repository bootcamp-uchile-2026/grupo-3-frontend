import { useMemo, useState } from "react";
import type { FiltroResenas } from "../Resenas/DatosResenasDemo";
import { ListaResenas } from "../ListaResenas/ListaResenas";
import { PaginacionResenas } from "../PaginacionResenas/PaginacionResenas";
import { resenasDemostracion } from "../Resenas/DatosResenasDemo";
import { ResumenResenas } from "../ResumenResenas/ResumenResenas";

const resenasPorPagina = 3;

export function ResenasProducto() {
    const [filtro, setFiltro] = useState<FiltroResenas>("todas");
    const [pagina, setPagina] = useState(1);
    const [mensajeResena, setMensajeResena] = useState("");

    const resenasFiltradas = useMemo(() => {
        switch (filtro) {
            case "recientes":
                return [...resenasDemostracion]
                    .sort((a, b) => b.fecha.localeCompare(a.fecha))
                    .slice(0, 3);
            case "positivas":
                return resenasDemostracion.filter((resena) => resena.puntuacion >= 4);
            case "criticas":
                return resenasDemostracion.filter((resena) => resena.puntuacion <= 2);
            default:
                return resenasDemostracion;
        }
    }, [filtro]);
    const totalPaginas = Math.ceil(resenasFiltradas.length / resenasPorPagina);
    const resenasVisibles = resenasFiltradas.slice(
        (pagina - 1) * resenasPorPagina,
        pagina * resenasPorPagina
    );

    function cambiarFiltro(nuevoFiltro: FiltroResenas) {
        setFiltro(nuevoFiltro);
        setPagina(1);
    }

    return (
        <section className="resenas-producto" aria-labelledby="titulo-resenas">
            <ResumenResenas
                resenas={resenasDemostracion}
                filtro={filtro}
                onCambiarFiltro={cambiarFiltro}
                onEscribirResena={() => setMensajeResena("El envío de reseñas todavía no está disponible.")}
            />
            {mensajeResena && <p className="resenas-producto__mensaje" role="status">{mensajeResena}</p>}
            <ListaResenas resenas={resenasVisibles} />
            <PaginacionResenas
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onCambiarPagina={setPagina}
            />
        </section>
    );
}
