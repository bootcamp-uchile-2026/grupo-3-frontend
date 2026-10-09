import { CardCategoria } from "../../components/CardCategoria/CardCategoria"
import { CardPetLove } from "../../components/CardPetLove/CardPetLove"
import { CardProducto } from "../../components/CardProducto/CardProducto"

export function Home() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="categorias-home">
                    <CardCategoria
                        titulo="Categoría 1"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    <CardCategoria
                        titulo="Categoría 2"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    <CardCategoria
                        titulo="Categoría 3"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    <CardCategoria
                        titulo="Categoría 4"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    <CardCategoria
                        titulo="Categoría 5"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    <CardCategoria
                        titulo="Categoría 6"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    <CardCategoria
                        titulo="Categoría 7"
                        urlImagen="https://placehold.co/250x250"
                        urlLink="/categoria/categoria-productos.html"
                    />
                    </div>
                </div>
            </section>
            <section id="hero">
                <div className="slider">
                    <div className="slide">
                        <img src="https://placehold.co/1920x600" alt="Slide 1" />
                        <button className="btn-slide">Registra tu Mascota</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="titulo-seccion">Ofertas</h2>
                    <div className="productos-ofertas">
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                        <CardProducto
                            titulo="Producto 2"
                            urlImagen="https://placehold.co/400x400"
                            precio={75}
                            categoria="Categoría 2"
                        />
                        <CardProducto
                            titulo="Producto 3"
                            urlImagen="https://placehold.co/400x400"
                            precio={100}
                            categoria="Categoría 3"
                        />
                        <CardProducto
                            titulo="Producto 4"
                            urlImagen="https://placehold.co/400x400"
                            precio={125}
                            categoria="Categoría 4"
                        />
                    </div>
                    <div className="ver-mas">
                        <button>Mostrar más</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="titulo-seccion titulo-center">¡Conoce a la familia PetLove!</h2>
                    <div className="petlove-cards">
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                    </div>
                </div>
            </section>
        </>
    )
}