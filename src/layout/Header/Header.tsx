import { NavLink } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { HeaderOptionsNavBar} from "./HeaderDivisions/HeaderOptionsNavBar";
import type { HeaderOption } from "../../TDATypes";
import "./Header.css"

interface HeaderProps {
    logoSrc?: string;
    logoAlt?: string;
    accountIconSrc?: string;
    cartIconSrc?: string;
}

const headerOptions: HeaderOption[] = [
    { route: "/tienda", name: "Categorias", icon: "Category", color: "brown" },
    { route: "/servicios-veterinarios/agendar-veterinario-lista-servicios", name: "Servicios Veterinarios", icon: "Stethoscope", color: "brown" },
    { route: "/categoria/farmacia", name: "Farmacia", icon: "Hospital", color: "brown" },
    { route: "", name: "Contacto", icon: "Telephone", color: "brown" }
]

export function Header({
    logoSrc = "/assets/images/logo-petlove.svg",
    logoAlt = "Petlove",
    accountIconSrc = "/src/assets/Icons/user.svg",
    cartIconSrc = "/src/assets/Icons/shopping-cart.svg" }: HeaderProps) {

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
                        <input className="search-input" type="search" name="q" placeholder="Que Necesita tu mascota?" />
                    </form>
                </div>

                <div className="right">
                    <span className="login-link" aria-disabled="true">Iniciar sesión</span>
                    <NavLink to="/mi-perfil/perfil-usuario" aria-label="Mi cuenta">
                    <img src={accountIconSrc} />
                    </NavLink>
                    <NavLink to="/carrito-compras" aria-label="Carrito">
                    <img src={cartIconSrc} />
                        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                    </NavLink>
                </div>
            </div>
            <HeaderOptionsNavBar options={headerOptions} />
        </header>
    )
}