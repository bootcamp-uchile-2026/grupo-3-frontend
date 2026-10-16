import { NavLink } from "react-router-dom";
import { UIKitIcon } from "../../../components/UIKit/UIIcons/UIKitIcon";
import type { HeaderOption } from "../../../TDATypes";

type HeaderOptionsNavBarProps = {
    options: HeaderOption[]
}

function HeaderOptionsNavBar({ options }: HeaderOptionsNavBarProps) {
    return (
        <>
            <nav className="bottom-bar" aria-label="Categorías principales">
                <ul>
                    {options.map((headerOption) => (
                        <li>
                            <NavLink to={headerOption.route}> <UIKitIcon name={headerOption.icon} iconColor={headerOption.color} /> {headerOption.name} </NavLink>
                        </li>
                    ))}
                    {/*<li><NavLink to="/servicios-veterinarios/agendar-veterinario-lista-servicios">🩺 Servicios veterinarios</NavLink></li>
                    <li><NavLink to="/categoria/farmacia">💊 Farmacia</NavLink></li>
                    <li><NavLink to="/categoria/gatos">🐱 Gato</NavLink></li>
                    <li><NavLink to="/categoria/perros">🐶 Perro</NavLink></li>
                    <li><NavLink to="/categoria/exoticos">🦎 Exóticos</NavLink></li>
                    <li><NavLink to="/categoria/ofertas">🏷️ Outlet</NavLink></li>
                    <li><span aria-disabled="true">📞 Contacto</span></li>*/}
                </ul>
            </nav>
        </>
    )
}

export default HeaderOptionsNavBar;