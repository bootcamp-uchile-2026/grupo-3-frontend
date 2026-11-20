import { useId } from "react";
import type { CSSProperties, ReactNode } from "react";
import "./UIMenuGroup.css";

export type UIMenuGroupProps = {
  title: string;
  /** Ícono como elemento (ej. <UIKitIcon />). */
  icon?: ReactNode;
  /** Ícono como archivo .svg importado (toma el color del título). */
  iconSrc?: string;
  /** Normalmente una lista de <UIMenuItem />. */
  children: ReactNode;
  /** Ancho de la lista (los submenús se abren a la derecha de este ancho). */
  listWidth?: number | string;
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

export function UIMenuGroup({
  title,
  icon,
  iconSrc,
  children,
  listWidth,
  headingLevel = 3,
  className,
}: UIMenuGroupProps) {
  const tituloId = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  const estiloLista =
    listWidth !== undefined
      ? ({
          "--ui-menu-group-width":
            typeof listWidth === "number" ? `${listWidth}px` : listWidth,
        } as CSSProperties)
      : undefined;

  // Comillas en url("…"): Vite incrusta los .svg pequeños como texto con espacios.
  const estiloMascara: CSSProperties | undefined = iconSrc
    ? { maskImage: `url("${iconSrc}")`, WebkitMaskImage: `url("${iconSrc}")` }
    : undefined;

  return (
    <section
      className={["ui-menu-group", className ?? ""].filter(Boolean).join(" ")}
      aria-labelledby={tituloId}
    >
      <Heading id={tituloId} className="ui-menu-group__title">
        {(icon || iconSrc) && (
          <span className="ui-menu-group__icon" aria-hidden="true">
            {iconSrc ? <span className="ui-menu-group__mask" style={estiloMascara} /> : icon}
          </span>
        )}
        {title}
      </Heading>

      <ul className="ui-menu-group__list" style={estiloLista}>
        {children}
      </ul>
    </section>
  );
}