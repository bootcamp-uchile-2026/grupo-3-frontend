import { NavLink } from "react-router-dom";
import logoHorizontal from "../../../assets/brand/logoV1.png"
import logoConMascotas from "../../../assets/brand/logo-petlove-mascotas.png";
import "./UILogo.css";

const LOGOS = {
  horizontal: logoHorizontal,
  "con-mascotas": logoConMascotas,
} as const;

export type UILogoProps = {
  variant?: keyof typeof LOGOS;
  size?: "sm" | "md" | "lg";
  /** Ruta al hacer clic. `null` = el logo no es un enlace. */
  to?: string | null;
  /** Reemplaza la imagen de la variante (ej. otra versión del logo). */
  src?: string;
  alt?: string;
  className?: string;
};

export function UILogo({
  variant = "horizontal",
  size = "md",
  to = "/",
  src,
  alt = "PetLove",
  className,
}: UILogoProps) {
  const clases = ["ui-logo", `ui-logo--${size}`, `ui-logo--${variant}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  const imagen = <img className="ui-logo__img" src={src ?? LOGOS[variant]} alt={alt} />;

  if (to === null) {
    return <span className={clases}>{imagen}</span>;
  }

  return (
    <NavLink to={to} className={clases} aria-label={`${alt}, ir al inicio`}>
      {imagen}
    </NavLink>
  );
}