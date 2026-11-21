import type { ReactNode } from "react";
import "./UIBadge.css";

export type UIBadgeProps = {
  /** Número a mostrar (ej. productos en el carrito). */
  count?: number;
  /** A partir de este valor se muestra "99+". */
  max?: number;
  /** Mostrar el badge aunque count sea 0. */
  showZero?: boolean;
  /** Texto en vez de número (ej. "Oferta", "Nuevo"). */
  children?: ReactNode;
  /** Solo un punto, sin texto (ej. "hay novedades"). */
  dot?: boolean;
  variant?: "accent" | "brown" | "soft" | "success" | "neutral";
  size?: "sm" | "md";
  /** Texto para lectores de pantalla. Si no se pasa, el badge es decorativo. */
  ariaLabel?: string;
  className?: string;
};

export function UIBadge({
  count,
  max = 99,
  showZero = false,
  children,
  dot = false,
  variant = "accent",
  size = "sm",
  ariaLabel,
  className,
}: UIBadgeProps) {
  const esNumero = typeof count === "number";

  // Sin nada que mostrar → no se renderiza
  if (!dot && !children && (!esNumero || (count === 0 && !showZero))) {
    return null;
  }

  const contenido = dot
    ? null
    : children ?? (esNumero && count > max ? `${max}+` : count);

  const clases = [
    "ui-badge",
    `ui-badge--${variant}`,
    `ui-badge--${size}`,
    dot ? "ui-badge--dot" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={clases}
      {...(ariaLabel
        ? { role: "status", "aria-label": ariaLabel }
        : { "aria-hidden": true })}
    >
      {contenido}
    </span>
  );
}
