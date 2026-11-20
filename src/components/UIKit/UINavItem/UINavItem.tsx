import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./UINavItem.css";

export type UINavItemProps = {
  label: string;
  /** Ruta interna. Si está vacía, el ítem se muestra deshabilitado. */
  to?: string;
  /** Ícono como elemento (ej. <UIKitIcon />). */
  icon?: ReactNode;
  /** Ícono como archivo .svg importado (toma el color del texto). */
  iconSrc?: string;
  /** Fuerza el estado activo (ej. mientras un menú desplegable está abierto). */
  active?: boolean;
  /** Activo solo si la ruta coincide exactamente (no en sub-rutas). */
  end?: boolean;
  size?: "md" | "lg";
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
};

export function UINavItem({
  label,
  to,
  icon,
  iconSrc,
  active = false,
  end = false,
  size = "lg",
  onClick,
  className,
}: UINavItemProps) {
  const clasesBase = ["ui-nav-item", `ui-nav-item--${size}`, className ?? ""];

  const estiloMascara: CSSProperties | undefined = iconSrc
    ? { maskImage: `url("${iconSrc}")`, WebkitMaskImage: `url("${iconSrc}")` }
    : undefined;

  const contenido = (
    <>
      {(icon || iconSrc) && (
        <span className="ui-nav-item__icon" aria-hidden="true">
          {iconSrc ? <span className="ui-nav-item__mask" style={estiloMascara} /> : icon}
        </span>
      )}
      <span className="ui-nav-item__label">{label}</span>
    </>
  );

  // Sin ruta: NavLink con to="" quedaría siempre "activo", así que se muestra deshabilitado
  if (!to) {
    return (
      <span
        className={[...clasesBase, "ui-nav-item--disabled"].filter(Boolean).join(" ")}
        aria-disabled="true"
      >
        {contenido}
      </span>
    );
  }

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [...clasesBase, isActive || active ? "ui-nav-item--active" : ""]
          .filter(Boolean)
          .join(" ")
      }
    >
      {contenido}
    </NavLink>
  );
}