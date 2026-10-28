import { NavLink } from "react-router-dom";
import { UIKitIcon } from "../../../components/UIKit/UIIcons/UIKitIcon";
import type { HeaderOption } from "../../../TDATypes";

type HeaderOptionsNavBarProps = {
    options: HeaderOption[]
}

export function HeaderOptionsNavBar({ options }: HeaderOptionsNavBarProps) {
    return (
        <>
            <nav className="bottom-bar" aria-label="Categorías principales">
                <ul>
                    {options.map((headerOption) => (
                        <li>
                            <NavLink to={headerOption.route}> <UIKitIcon name={headerOption.icon} iconColor={headerOption.color} /> {headerOption.name} </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}