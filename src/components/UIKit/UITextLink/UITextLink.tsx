import type { MouseEvent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./UITextLink.css";

export type UITextLinkProps = {
  children: ReactNode;
  /** Ruta interna (React Router). */
  to?: string;
  /** Enlace externo (se abre en otra pestaña). */
  href?: string;
  /** Acción (si no hay `to` ni `href`, se renderiza un <button> con aspecto de enlace). */
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  variant?: "default" | "strong" | "muted";
  /** Cuándo se subraya. */
  underline?: "hover" | "always" | "none";
  size?: "sm" | "md";
  /** Ícono opcional después del texto (ej. una flecha). */
  iconEnd?: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function UITextLink({
  children,
  to,
  href,
  onClick,
  variant = "default",
  underline = "hover",
  size = "md",
  iconEnd,
  disabled = false,
  className,
}: UITextLinkProps) {
  const clases = [
    "ui-text-link",
    `ui-text-link--${variant}`,
    `ui-text-link--underline-${underline}`,
    `ui-text-link--${size}`,
    disabled ? "ui-text-link--disabled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const contenido = (
    <>
      <span className="ui-text-link__text">{children}</span>
      {iconEnd && (
        <span className="ui-text-link__icon" aria-hidden="true">
          {iconEnd}
        </span>
      )}
    </>
  );

  // Deshabilitado: se muestra, pero no navega ni recibe foco
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