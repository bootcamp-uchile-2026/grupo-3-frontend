import { NavLink } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { HeaderOptionsNavBar} from "./HeaderDivisions/HeaderOptionsNavBar";
import type { HeaderOption } from "../../TDATypes";
interface HeaderProps {
    logoSrc?: string;
    logoAlt?: string;
    accountIconSrc?: string;
    cartIconSrc?: string;
}

const headerOptions: HeaderOption[] = [
    { route: "/tienda", name: "Categorias", icon: "Category", color: "black" },
    { route: "/servicios-veterinarios/agendar-veterinario-lista-servicios", name: "Servicios Veterinarios", icon: "Stethoscope", color: "black" },
    { route: "/categoria/farmacia", name: "Farmacia", icon: "Hospital", color: "black" },
    { route: "", name: "Contacto", icon: "Telephone", color: "black" }
]

export function Header({
    logoSrc = "/assets/images/logo-petlove.svg",
    logoAlt = "Petlove",
    accountIconSrc = "/assets/images/user.svg",
    cartIconSrc = "/assets/images/cart.svg" }: HeaderProps) {

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
                        <input type="search" name="q" placeholder="Buscar" />
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
            <HeaderOptionsNavBar options={headerOptions} />
        </header>
    )
}