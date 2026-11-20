import type { ReactNode } from "react";
import { UIKitIcon } from "../../../components/UIKit/UIIcons/UIKitIcon";
import { UINavItem } from "../../../components/UIKit/UINavItem/UINavItem";
import { UIDropDownPanel } from "../../../components/UIKit/UIDropDownPanel/UIDropDownPanel";
import type { HeaderOption } from "../../../TDATypes";


type HeaderOptionsNavBarProps = {
    options: HeaderOption[];
    /** Panel desplegable por ruta. Ej: { "/tienda": <MegaMenuCategorias /> } */
    dropdowns?: Record<string, ReactNode>;
};

export function HeaderOptionsNavBar({ options, dropdowns }: HeaderOptionsNavBarProps) {
    return (
        <nav className="bottom-bar" aria-label="Categorías principales">
            <ul>
<<<<<<< HEAD
                {options.map((headerOption) => {
                    // El ítem de la barra; "abierto" lo deja resaltado mientras su panel está visible
                    const navItem = (abierto: boolean) => (
                        <UINavItem
                            label={headerOption.name}
                            to={headerOption.route}
                            active={abierto}
                            icon={
                                <UIKitIcon
                                    name={headerOption.icon}
                                    iconColor={headerOption.color}
                                />
                            }
                        />
                    );

                    const panel = headerOption.route
                        ? dropdowns?.[headerOption.route]
                        : undefined;

                    return (
                        <li key={headerOption.name}>
                            {panel ? (
                                <UIDropDownPanel
                                    align="full"
                                    openOn="hover"
                                    ariaLabel={headerOption.name}
                                    panelClassName="mega-menu"
                                    trigger={navItem}
                                >
                                    {panel}
                                </UIDropDownPanel>
                            ) : (
                                navItem(false)
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
=======
                {options.map((headerOption) => (
                    <li key={headerOption.name}>
                        <NavLink to={headerOption.route}> 
                            <UIKitIcon name={headerOption.icon} iconColor={headerOption.color} /> 
                            {headerOption.name} 
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
>>>>>>> develop
}