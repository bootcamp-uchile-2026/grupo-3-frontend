import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    selectCantidadArticulos,
    useCarritoStore,
} from "../../store/carritoStore";
import { HeaderOptionsNavBar } from "./HeaderDivisions/HeaderOptionsNavBar";
import { MegaMenuCategorias } from "./HeaderDivisions/MenuListCategorias";
import { UILogo } from "../../components/UIKit/UILogo/UILogo";
import { UISearchInput } from "../../components/UIKit/UISearchInput/UISearchInput";
import { UITextLink } from "../../components/UIKit/UITextLink/UITextLink";
import { UIIconButton } from "../../components/UIKit/UIIconButton/UIIconButton";
import type { HeaderOption } from "../../TDATypes";
import userIcon from "../../assets/Icons/user.svg";
import cartIcon from "../../assets/Icons/shopping-cart.svg";
import "./Header.css";

interface HeaderProps {
    /** Si no se pasa, UILogo usa el logo horizontal por defecto. */
    logoSrc?: string;
    logoAlt?: string;
    accountIconSrc?: string;
    cartIconSrc?: string;
}

const headerOptions: HeaderOption[] = [
    { route: "/tienda", name: "Categorías", icon: "Category", color: "brown" },
    { route: "/servicios-veterinarios/agendar-veterinario-lista-servicios", name: "Servicios Veterinarios", icon: "Stethoscope", color: "brown" },
    { route: "/categoria/farmacia", name: "Farmacia", icon: "Hospital", color: "brown" },
    { route: "", name: "Contacto", icon: "Telephone", color: "brown" },
];

const IconoMenu = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

export function Header({
    logoSrc,
    logoAlt = "PetLove",
    accountIconSrc = userIcon,
    cartIconSrc = cartIcon,
}: HeaderProps) {
    // Carrito (store)
    const totalItems = useCarritoStore(selectCantidadArticulos);
    const inicializarCarrito = useCarritoStore((state) => state.inicializar);

    useEffect(() => {
        void inicializarCarrito().catch((error: unknown) => {
            console.error("No se pudo inicializar el carrito del header.", error);
        });
    }, [inicializarCarrito]);

    // Buscador
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();

    const buscar = (termino: string) => {
        navigate(`/buscar?q=${encodeURIComponent(termino)}`);
    };

    return (
        <header className="site-header">
            <div className="top-bar">
                <div className="left">
                    <UIIconButton
                        ariaLabel="Menú"
                        icon={IconoMenu}
                        className="menu-btn"
                    />
                    <UILogo src={logoSrc} alt={logoAlt} />
                </div>

                <div className="center">
                    <UISearchInput
                        value={busqueda}
                        onChange={setBusqueda}
                        onSubmit={buscar}
                        placeholder="¿Qué necesita tu mascota?"
                        label="Buscar productos"
                    />
                </div>

                <div className="right">
                    <UITextLink size="sm" disabled>
                        Iniciar sesión
                    </UITextLink>

                    <UIIconButton
                        ariaLabel="Mi cuenta"
                        iconSrc={accountIconSrc}
                        to="/mi-perfil/perfil-usuario"
                    />

                    <UIIconButton
                        ariaLabel="Carrito"
                        iconSrc={cartIconSrc}
                        to="/carrito-compras"
                        badge={totalItems}
                    />
                </div>
            </div>

            <div className="nav-con-menu">
                <HeaderOptionsNavBar
                    options={headerOptions}
                    dropdowns={{ "/tienda": <MegaMenuCategorias /> }}
                />
            </div>
        </header>
    );
}