import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import "./UIIconButton.css";

export type UIIconButtonProps = {
  ariaLabel: string;
  icon?: ReactNode;
  iconSrc?: string;
  to?: string;
  href?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  badge?: number;
  badgeMax?: number;
  variant?: "ghost" | "filled" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  className?: string;
};

export function UIIconButton({
  ariaLabel,
  icon,
  iconSrc,
  to,
  href,
  onClick,
  badge,
  badgeMax = 99,
  variant = "ghost",
  size = "md",
  disabled = false,
  type = "button",
  title,
  className,
}: UIIconButtonProps) {
  const clases = [
    "ui-icon-btn",
    `ui-icon-btn--${variant}`,
    `ui-icon-btn--${size}`,
    disabled ? "ui-icon-btn--disabled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const tieneBadge = typeof badge === "number" && badge > 0;
  const textoBadge = tieneBadge && badge > badgeMax ? `${badgeMax}+` : String(badge);
  // El lector de pantalla escucha "Carrito, 3" en vez de solo "Carrito".
  const etiqueta = tieneBadge ? `${ariaLabel}, ${badge}` : ariaLabel;

  // Comillas en url("…"): Vite incrusta los .svg pequeños como texto con espacios.
  const estiloMascara: CSSProperties | undefined = iconSrc
    ? { maskImage: `url("${iconSrc}")`, WebkitMaskImage: `url("${iconSrc}")` }
    : undefined;

  const contenido = (
    <>
      <span className="ui-icon-btn__icon" aria-hidden="true">
        {iconSrc ? <span className="ui-icon-btn__mask" style={estiloMascara} /> : icon}
      </span>
      {tieneBadge && (
        <span className="ui-icon-btn__badge" aria-hidden="true">
          {textoBadge}
        </span>
      )}
    </>
  );

  // Para Enlaces interno
  if (to && !disabled) {
    return (
      <NavLink to={to} className={clases} aria-label={etiqueta} title={title} onClick={onClick}>
        {contenido}
      </NavLink>
    );
  }

  // Para Enlaces externo
  if (href && !disabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clases}
        aria-label={etiqueta}
        title={title}
        onClick={onClick}
      >
        {contenido}
      </a>
    );
  }

  // Botón (o enlace deshabilitado)
  return (
    <button
      type={type}
      className={clases}
      aria-label={etiqueta}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {contenido}
    </button>
  );
}