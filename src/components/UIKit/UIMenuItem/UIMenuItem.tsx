import { Children } from "react";
import type { MouseEvent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { UISubMenu } from "../UISubMenu/UISubMenu";
import "./UIMenuItem.css";

export type UIMenuItemProps = {
  label: string;
  to?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  icon?: ReactNode;
  children?: ReactNode;
  hasSubmenu?: boolean;
  submenuPlacement?: "right" | "below";
  active?: boolean;
  disabled?: boolean;
  className?: string;
};

const Chevron = (
  <svg className="ui-menu-item__chevron" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export function UIMenuItem({
  label,
  to,
  onClick,
  icon,
  children,
  hasSubmenu,
  submenuPlacement = "right",
  active = false,
  disabled = false,
  className,
}: UIMenuItemProps) {
  const tieneHijos = Children.toArray(children).length > 0;
  const mostrarFlecha = hasSubmenu ?? tieneHijos;

  const clasesItem = [
    "ui-menu-item",
    disabled ? "ui-menu-item--disabled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const claseLink = (activo: boolean) =>
    ["ui-menu-item__link", activo || active ? "ui-menu-item__link--active" : ""]
      .filter(Boolean)
      .join(" ");

  const contenido = (
    <>
      {icon && (
        <span className="ui-menu-item__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="ui-menu-item__label">{label}</span>
      {mostrarFlecha && Chevron}
    </>
  );

  let enlace: ReactNode;
  if (disabled) {
    enlace = (
      <span className={claseLink(false)} aria-disabled="true">
        {contenido}
      </span>
    );
  } else if (to) {
    enlace = (
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => claseLink(isActive)}
        aria-haspopup={tieneHijos ? "true" : undefined}
      >
        {contenido}
      </NavLink>
    );
  } else {
    enlace = (
      <button
        type="button"
        className={claseLink(false)}
        onClick={onClick}
        aria-haspopup={tieneHijos ? "true" : undefined}
      >
        {contenido}
      </button>
    );
  }

  return (
    <li className={clasesItem}>
      {enlace}
      {tieneHijos && !disabled && (
        <UISubMenu label={label} placement={submenuPlacement}>
          {children}
        </UISubMenu>
      )}
    </li>
  );
}