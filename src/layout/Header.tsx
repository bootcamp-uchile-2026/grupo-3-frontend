export function Header() {
    return (
        <header className="site-header">
                <div className="top-bar">
                    <div className="left">
                        <button className="menu-btn" aria-label="Menú">☰</button>
                        <a href="/index.html" className="logo">
                            <img src="/logo-petlove.svg" alt="Petlove" />
                        </a>
                    </div>

                    <div className="center">
                        <form className="search-form" action="/buscar" method="GET" role="search">
                            <span className="search-icon">⌕</span>
                            <input type="search" name="q" placeholder="Buscar"/>
                        </form>
                    </div>

                    <div className="right">
                        <a href="#" className="login-link">Iniciar sesión / registrar</a>
                        <a href="/mi-perfil/perfil-usuario.html" aria-label="Mi cuenta">👤</a>
                        <a href="/carrito-compras.html" aria-label="Carrito">🛒</a>
                    </div>
                </div>


                <nav className="bottom-bar" aria-label="Categorías principales">
                    <ul>
                        <li><a href="#">☰ Categorías</a></li>
                        <li><a href="/servicios-veterinarios/agendar-veterinario-lista-servicios.html">🩺 Servicios
                            veterinarios</a></li>
                        <li><a href="/categoria/categoria-productos.html">💊 Farmacia</a></li>
                        <li><a href="/categoria/categoria-productos.html">🐱 Gato</a></li>
                        <li><a href="/categoria/categoria-productos.html">🐶 Perro</a></li>
                        <li><a href="/categoria/categoria-productos.html">🏷️ Outlet</a></li>
                        <li><a href="#">📞 Contacto</a></li>
                    </ul>
                </nav>
            </header>
    )
}