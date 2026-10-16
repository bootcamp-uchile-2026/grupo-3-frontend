import { NavLink } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { UIKitCategoryIcon } from "../../components/UIKit/UIIcons/UIKitCategoryIcon";
import { UIKitIcon } from "../../components/UIKit/UIIcons/UIKitIcon";

interface HeaderProps {
  logoSrc?: string;
  logoAlt?: string;
  accountIconSrc?: string;
  cartIconSrc?: string;
}

const headerOptions = [
    {route: "/tienda", name: "Categorias", icon: "categories", color: "#ffffff"}
]

export function Header({ 
        logoSrc="/assets/images/logo-petlove.svg",
         logoAlt="Petlove",
        accountIconSrc="/assets/images/user.svg",
        cartIconSrc="/assets/images/cart.svg" }: HeaderProps) {
    
    const { state } = useCarrito();
    const totalItems = state.productos.reduce((acc, p) => acc + p.cantidad, 0);
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
                        <span className="login-link" aria-disabled="true">Iniciar sesión / registrar</span>
                        <NavLink to="/mi-perfil/perfil-usuario" aria-label="Mi cuenta">
                            👤<img src={accountIconSrc} alt="Mi cuenta" />
                        </NavLink>
                        <NavLink to="/carrito-compras" aria-label="Carrito">
                            🛒<img src={cartIconSrc} alt="Carrito" />
                            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                        </NavLink>
                    </div>
                </div>


                <nav className="bottom-bar" aria-label="Categorías principales">
                    <ul>
                        {headerOptions.map((headerOption) => (
                            <li>
                                <NavLink to={headerOption.route}> <UIKitIcon name={headerOption.icon} iconColor={headerOption.color}/> {headerOption.name} </NavLink>
                            </li>
                        ))}
                        <li><NavLink to="/servicios-veterinarios/agendar-veterinario-lista-servicios">🩺 Servicios veterinarios</NavLink></li>
                        <li><NavLink to="/categoria/farmacia">💊 Farmacia</NavLink></li>
                        <li><NavLink to="/categoria/gatos">🐱 Gato</NavLink></li>
                        <li><NavLink to="/categoria/perros">🐶 Perro</NavLink></li>
                        <li><NavLink to="/categoria/exoticos">🦎 Exóticos</NavLink></li>
                        <li><NavLink to="/categoria/ofertas">🏷️ Outlet</NavLink></li>
                        <li><span aria-disabled="true">📞 Contacto</span></li>
                    </ul>
                </nav>
            </header>
    )
}