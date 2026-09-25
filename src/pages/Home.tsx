export function Home() {
    return (
        <>
            <section id="hero">
                <div className="slider">
                    <div className="slide">
                        <img src="https://placehold.co/1920x600" alt="Slide 1" />
                    </div>
                </div>
                <div id="hero-content">
                    <h1 id="hero-title">Cómprale lo mejor en un solo lugar</h1>
                    <div>
                        <a href="tienda.html"><button>Ver productos</button></a>
                        <a href="#"><button>Nuestra clínica</button></a>
                    </div>
                </div>
            </section>
            <section>
                <div className="container categorias-home">
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 1</h3>
                        </a>
                    </article>
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 2</h3>
                        </a>
                    </article>
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 3</h3>
                        </a>
                    </article>
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 4</h3>
                        </a>
                    </article>
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 5</h3>
                        </a>
                    </article>
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 6</h3>
                        </a>
                    </article>
                    <article className="categoria-card-home">
                        <a href="/categoria/categoria-productos.html">
                            <img src="https://placehold.co/250x250" alt="Imagen 1" />
                            <h3>Categoría 7</h3>
                        </a>
                    </article>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="titulo-seccion">Ofertas</h2>
                    <div className="productos-ofertas">
                        <article className="producto-card">
                            <a href="/categoria/productos/producto-individual.html">
                                <img src="https://placehold.co/400x400" alt="Producto 1" />
                                <div className="producto-card-content">
                                    <div className="producto-info">
                                        <h3>Producto 1</h3>
                                        <p>Categoría 1</p>
                                    </div>
                                    <div className="producto-precio">
                                        <p>Precio:<br />$50</p>
                                    </div>
                                </div>
                            </a>
                            <div className="producto-card-actions">
                                <button>Agregar al carrito</button>
                            </div>
                        </article>
                        <article className="producto-card">
                            <a href="/categoria/productos/producto-individual.html">
                                <img src="https://placehold.co/400x400" alt="Producto 1" />
                                <div className="producto-card-content">
                                    <div className="producto-info">
                                        <h3>Producto 1</h3>
                                        <p>Categoría 1</p>
                                    </div>
                                    <div className="producto-precio">
                                        <p>Precio:<br />$50</p>
                                    </div>
                                </div>
                            </a>
                            <div className="producto-card-actions">
                                <button>Agregar al carrito</button>
                            </div>
                        </article>
                        <article className="producto-card">
                            <a href="/categoria/productos/producto-individual.html">
                                <img src="https://placehold.co/400x400" alt="Producto 1" />
                                <div className="producto-card-content">
                                    <div className="producto-info">
                                        <h3>Producto 1</h3>
                                        <p>Categoría 1</p>
                                    </div>
                                    <div className="producto-precio">
                                        <p>Precio:<br />$50</p>
                                    </div>
                                </div>
                            </a>
                            <div className="producto-card-actions">
                                <button>Agregar al carrito</button>
                            </div>
                        </article>
                        <article className="producto-card">
                            <a href="/categoria/productos/producto-individual.html">
                                <img src="https://placehold.co/400x400" alt="Producto 1" />
                                <div className="producto-card-content">
                                    <div className="producto-info">
                                        <h3>Producto 1</h3>
                                        <p>Categoría 1</p>
                                    </div>
                                    <div className="producto-precio">
                                        <p>Precio:<br />$50</p>
                                    </div>
                                </div>
                            </a>
                            <div className="producto-card-actions">
                                <button>Agregar al carrito</button>
                            </div>
                        </article>
                    </div>
                    <div className="ver-mas">
                        <button>Mostrar más</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="titulo-seccion">Perfil personalizado de la mascota</h2>
                </div>
                <div className="banner">
                    <img src="https://placehold.co/1920x800" alt="Banner" />
                    <div className="banner-content">
                        <a href="#"><button>Registrar tu mascota</button></a>
                    </div>
                </div>
            </section>

        </>
    )
}