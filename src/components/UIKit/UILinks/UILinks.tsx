import type { MouseEvent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./UILinks.css";

export type UILinkProps = {
  children: ReactNode;
  /** Ruta interna (React Router). */
  to?: string;
  /** Enlace externo: se abre en otra pestaña. */
  href?: string;
  /** Acción; sin `to` ni `href` se renderiza un <button> con aspecto de enlace. */
  onClick?: (event: MouseEvent<HTMLElement>) => void;

  /** Esquema de color: café (marca) o azul (enlace estándar). */
  color?: "brown" | "blue";
  size?: "sm" | "md";
  weight?: "regular" | "bold";
  /** Subrayado permanente. */
  underline?: boolean;
  /** Flecha ↗ después del texto. `true` = flecha por defecto; también acepta un ícono propio. */
  icon?: boolean | ReactNode;

  disabled?: boolean;
  /** Solo para documentación: muestra un estado de forma fija (como en Figma). */
  forceState?: "hover" | "active" | "focus";
  className?: string;
};

const FlechaExterna = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export function UILink({
  children,
  to,
  href,
  onClick,
  color = "brown",
  size = "sm",
  weight = "regular",
  underline = true,
  icon = true,
  disabled = false,
  forceState,
  className,
}: UILinkProps) {
  const clases = [
    "ui-link",
    `ui-link--${color}`,
    `ui-link--${size}`,
    `ui-link--${weight}`,
    underline ? "ui-link--underline" : "",
    forceState ? `ui-link--is-${forceState}` : "",
    disabled ? "ui-link--disabled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconoFinal = icon === true ? FlechaExterna : icon || null;

  const contenido = (
    <>
      <span className="ui-link__text">{children}</span>
      {iconoFinal && (
        <span className="ui-link__icon" aria-hidden="true">
          {iconoFinal}
        </span>
      )}
      {href && !disabled && <span className="ui-link__sr">(se abre en otra pestaña)</span>}
    </>
  );

  // Deshabilitado: visible pero sin navegación ni foco
  if (disabled) {
    return (
      <span className={clases} aria-disabled="true">
        {contenido}
      </span>
    );
  }

  if (to) {
    return (
      <NavLink to={to} className={clases} onClick={onClick}>
        {contenido}
      </NavLink>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={clases} onClick={onClick}>
        {contenido}
      </a>
    );
  }

  return (
    <button type="button" className={clases} onClick={onClick}>
      {contenido}
    </button>
  );
}