import { NavLink } from "react-router-dom";
import logoHorizontal from "../../../assets/brand/logoV1.png";
import logoCompacto from "../../../assets/brand/logo-mobile.png";
import logoConMascotas from "../../../assets/brand/logo-petlove-mascotas.png";
import logoCasa from "../../../assets/brand/logoV3.png";
import "./UILogo.css";

const LOGOS = {
  horizontal: logoHorizontal,
  compact: logoCompacto,
  "con-mascotas": logoConMascotas,
  casa: logoCasa,
} as const;

export type UILogoVariant = keyof typeof LOGOS;

export type UILogoProps = {
  variant?: UILogoVariant;
  size?: "sm" | "md" | "lg";
  responsive?: boolean;
  breakpoint?: number;
  to?: string | null;
  src?: string;
  alt?: string;
  className?: string;
};

export function UILogo({
  variant = "horizontal",
  size = "md",
  responsive = false,
  breakpoint = 768,
  to = "/",
  src,
  alt = "PetLove",
  className,
}: UILogoProps) {
  const usarResponsive = responsive && variant === "horizontal" && !src;

  const clases = [
    "ui-logo",
    `ui-logo--${variant}`,
    `ui-logo--${size}`,
    usarResponsive ? "ui-logo--responsive" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const imagen = usarResponsive ? (
    <picture className="ui-logo__picture">
      <source media={`(max-width: ${breakpoint}px)`} srcSet={LOGOS.compact} />
      <img className="ui-logo__img" src={LOGOS.horizontal} alt={alt} />
    </picture>
  ) : (
    <img className="ui-logo__img" src={src ?? LOGOS[variant]} alt={alt} />
  );

  if (to === null) {
    return <span className={clases}>{imagen}</span>;
  }

  return (
    <NavLink to={to} className={clases} aria-label={`${alt}, ir al inicio`}>
      {imagen}
    </NavLink>
  );
}