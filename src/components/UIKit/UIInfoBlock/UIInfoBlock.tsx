import { useId } from "react";
import type { ReactNode } from "react";
import "./UIInfoBlock.css";

export type UIInfoBlockProps = {
  title: string;
  /** Líneas de información (dirección, horarios, teléfono…). */
  lines?: ReactNode[];
  /** Contenido libre, en vez de (o además de) `lines`. */
  children?: ReactNode;
  /** Ícono opcional junto al título. */
  icon?: ReactNode;
  /** Usa <address> cuando el bloque es información de contacto. */
  asAddress?: boolean;
  headingLevel?: 2 | 3 | 4;
  className?: string;
};

export function UIInfoBlock({
  title,
  lines = [],
  children,
  icon,
  asAddress = false,
  headingLevel = 3,
  className,
}: UIInfoBlockProps) {
  const tituloId = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  const Contenedor = asAddress ? "address" : "div";

  return (
    <section
      className={["ui-info-block", className ?? ""].filter(Boolean).join(" ")}
      aria-labelledby={tituloId}
    >
      <Heading id={tituloId} className="ui-info-block__title">
        {icon && (
          <span className="ui-info-block__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        {title}
      </Heading>

      <Contenedor className="ui-info-block__body">
        {lines.map((linea, i) => (
          <p key={i} className="ui-info-block__line">
            {linea}
          </p>
        ))}
        {children}
      </Contenedor>
    </section>
  );
}