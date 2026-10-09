import { NavLink } from "react-router-dom";

interface HeaderProps {
  logoSrc: string;
  logoAlt: string;
  accountIconSrc: string;
  cartIconSrc: string;
}

export function Header({ logoSrc, logoAlt, accountIconSrc, cartIconSrc }: HeaderProps) {
    return (
        <header className="site-header">
                <div className="top-bar">
                    <div className="left">
                        <button className="menu-btn" aria-label="Menú">☰</button>
                        <NavLink to="/" className="logo">
                            <img src={logoSrc} alt={logoAlt} />
                        </NavLink>
                    </div>

                    <div className="center">
                        <form className="search-form" action="/buscar" method="GET" role="search">
                            <span className="search-icon">⌕</span>
                            <input type="search" name="q" placeholder="Buscar"/>
                        </form>
                    </div>

                    <div className="right">
                        <NavLink to="/login" className="login-link">Iniciar sesión / registrar</NavLink>
                        <NavLink to="/mi-perfil/perfil-usuario" aria-label="Mi cuenta">
                            👤<img src={accountIconSrc} alt="Mi cuenta" />
                        </NavLink>
                        <NavLink to="/carrito-compras" aria-label="Carrito">
                            🛒<img src={cartIconSrc} alt="Carrito" />
                        </NavLink>
                    </div>
                </div>


                <nav className="bottom-bar" aria-label="Categorías principales">
                    <ul>
                        <li><NavLink to="/categorias">☰ Categorías</NavLink></li>
                        <li><NavLink to="/servicios-veterinarios/agendar-veterinario-lista-servicios">🩺 Servicios veterinarios</NavLink></li>
                        <li><NavLink to="/categoria/categoria-productos">💊 Farmacia</NavLink></li>
                        <li><NavLink to="/categoria/gato">🐱 Gato</NavLink></li>
                        <li><NavLink to="/categoria/perro">🐶 Perro</NavLink></li>
                        <li><NavLink to="/categoria/outlet">🏷️ Outlet</NavLink></li>
                        <li><NavLink to="#">📞 Contacto</NavLink></li>
                    </ul>
                </nav>
            </header>
    )
}