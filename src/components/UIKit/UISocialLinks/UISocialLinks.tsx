import type { CSSProperties, ReactNode } from "react";
import { UIIconButton } from "../UIIconButton/UIIconButton";
import "./UISocialLinks.css";

export type UISocialLink = {
  /** Nombre de la red (se usa como texto accesible). */
  name: string;
  /** Ícono como archivo .svg importado. */
  iconSrc?: string;
  /** Ícono como elemento. */
  icon?: ReactNode;
  /** URL del perfil. Si falta, el ícono se muestra deshabilitado. */
  href?: string;
};

export type UISocialLinksProps = {
  links: UISocialLink[];
  /** Color de los íconos. */
  color?: string;
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "filled" | "outline";
  ariaLabel?: string;
  className?: string;
};

export function UISocialLinks({
  links,
  color,
  size = "sm",
  variant = "ghost",
  ariaLabel = "Redes sociales",
  className,
}: UISocialLinksProps) {
  const estilo = color
    ? ({ "--ui-social-color": color } as CSSProperties)
    : undefined;

  return (
    <ul
      className={["ui-social-links", className ?? ""].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      style={estilo}
    >
      {links.map((link) => (
        <li key={link.name} className="ui-social-links__item">
          <UIIconButton
            ariaLabel={link.href ? link.name : `${link.name} (próximamente)`}
            iconSrc={link.iconSrc}
            icon={link.icon}
            href={link.href}
            disabled={!link.href}
            size={size}
            variant={variant}
            className="ui-social-links__btn"
          />
        </li>
      ))}
    </ul>
  );
}