import type { Categoria } from "../../../TDATypes";
import { CardCategoria } from "../../../components/CardCategoria/CardCategoria";

type HomeCategoriesProps = {
    isLoading: boolean,
    errorMessage: string | null,
    categories: Categoria[]
}

/** Rutas oficiales según redirecciones_categorias.md (clave = slug normalizado). */
const RUTAS_CATEGORIAS: Record<string, string> = {
    gato: "/categoria/gato",
    perro: "/categoria/perro",
    aves: "/categoria/aves",
    roedores: "/categoria/roedores",
    farmacia: "/categoria/farmacia",
    alimentos: "/categoria/alimentos",
    accesorios: "/categoria/accesorios",
};

// Variantes comunes en plural para que coincidan con la clave.
const ALIAS_CATEGORIAS: Record<string, string> = {
    gatos: "gato",
    perros: "perro",
    ave: "aves",
    roedor: "roedores",
    alimento: "alimentos",
    accesorio: "accesorios",
};

function normalizar(texto: string): string {
    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim()
        .toLowerCase();
}

function resolverRuta(categoria: Categoria): string {
    for (const candidato of [categoria.nombre, categoria.id]) {
        const slug = normalizar(candidato);
        const clave = ALIAS_CATEGORIAS[slug] ?? slug;
        if (RUTAS_CATEGORIAS[clave]) return RUTAS_CATEGORIAS[clave];
    }
    return categoria.ruta;
}

function HomeCategories({ isLoading, errorMessage, categories }: HomeCategoriesProps){
    return (
        <div className="home__categories-inner">
            {isLoading && <p role="status">Cargando categorías...</p>}
            {errorMessage && <p role="alert">{errorMessage}</p>}
            {categories.map((categoria) => (
                <CardCategoria
                    key={categoria.id}
                    titulo={categoria.nombre}
                    urlImagen={categoria.imagen}
                    urlLink={resolverRuta(categoria)}
                />
            ))}
        </div>
    )
}

export default HomeCategories;