import type { Categoria } from "../../../TDATypes";
import { CardCategoria } from "../../../components/CardCategoria/CardCategoria";

type HomeCategoriesProps = {
    isLoading: boolean,
    errorMessage: string | null,
    categories: Categoria[]
}

function HomeCategories({ isLoading, errorMessage, categories }: HomeCategoriesProps){
    return (
        <>
        <div className="container">
            <div className="categorias-home">
                {isLoading && <p role="status">Cargando categorías...</p>}
                {errorMessage && <p role="alert">{errorMessage}</p>}
                {categories.map((categoria) => (
                    <CardCategoria
                        key={categoria.id}
                        titulo={categoria.nombre}
                        urlImagen={categoria.imagen}
                        urlLink={categoria.ruta}
                    />
                ))}
            </div>
        </div>
        </>
    )
}

export default HomeCategories;