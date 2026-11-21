import type { ReactNode } from "react";
import "./UISubMenu.css";

export type UISubMenuProps = {
  /** Normalmente una lista de <UIMenuItem />. */
  children: ReactNode;
  /** Nombre de la opción padre (para lectores de pantalla). */
  label?: string;
  /** Fuerza el submenú abierto. Si no se pasa, se abre con hover/foco del UIMenuItem padre. */
  open?: boolean;
  /** "right": flotante a la derecha. "below": se despliega hacia abajo (acordeón). */
  placement?: "right" | "below";
  className?: string;
};

export function UISubMenu({
  children,
  label,
  open,
  placement = "right",
  className,
}: UISubMenuProps) {
  const clases = [
    "ui-submenu",
    `ui-submenu--${placement}`,
    open ? "ui-submenu--open" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={clases}
      role="group"
      aria-label={label ? `Opciones de ${label}` : undefined}
    >
      <ul className="ui-submenu__list">{children}</ul>
    </div>
  );
}