import { useState } from "react";
import "./UIQualification.css";

export type UIQualificationProps = {
  /** Calificación actual. En "stars" se redondea; en "badge" admite decimales (ej. 4.5). */
  value: number;
  max?: number;
  /**
   * "stars": fila de estrellas llenas y vacías.
   * "badge": etiqueta compacta «★ n/5» (reviews).
   */
  variant?: "stars" | "badge";
  /** stars: 12 / 18 / 24 px por estrella. badge: sm y md (lg se muestra como md). */
  size?: "sm" | "md" | "lg";
  /** Solo "stars": si se pasa, las estrellas se pueden seleccionar. */
  onChange?: (value: number) => void;
  /** Solo "badge": muestra la estrella antes del número. */
  showIcon?: boolean;
  disabled?: boolean;
  /** Texto accesible. Por defecto: "Calificación: 3 de 5". */
  ariaLabel?: string;
  className?: string;
};

const ESTRELLA =
  "M12 2.5l2.94 5.96 6.58.96-4.76 4.64 1.12 6.55L12 17.52l-5.88 3.09 1.12-6.55L2.48 9.42l6.58-.96L12 2.5z";

const formato = new Intl.NumberFormat("es-CL", { maximumFractionDigits: 1 });

function Estrella({ llena, className }: { llena: boolean; className: string }) {
  return (
    <svg
      className={[className, llena ? `${className}--filled` : ""].filter(Boolean).join(" ")}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={ESTRELLA} />
    </svg>
  );
}

export function UIQualification({
  value,
  max = 5,
  variant = "stars",
  size = "md",
  onChange,
  showIcon = true,
  disabled = false,
  ariaLabel,
  className,
}: UIQualificationProps) {
  const [hover, setHover] = useState<number | null>(null);

  const limitado = Math.min(max, Math.max(0, value));

  /* ================= Variante badge: «★ n/5» ================= */
  if (variant === "badge") {
    const tamano = size === "sm" ? "sm" : "md";
    const clases = [
      "ui-qualification",
      "ui-qualification--badge",
      `ui-qualification--badge-${tamano}`,
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span
        className={clases}
        role="img"
        aria-label={ariaLabel ?? `Calificación: ${formato.format(limitado)} de ${max}`}
      >
        {showIcon && <Estrella llena className="ui-qualification__badge-icon" />}
        <span className="ui-qualification__badge-value" aria-hidden="true">
          {formato.format(limitado)}/{max}
        </span>
      </span>
    );
  }

  /* ================= Variante stars ================= */
  const actual = Math.round(limitado);
  const interactivo = Boolean(onChange) && !disabled;
  const mostrado = interactivo && hover !== null ? hover : actual;
  const etiqueta = ariaLabel ?? `Calificación: ${actual} de ${max}`;
  const posiciones = Array.from({ length: max }, (_, i) => i + 1);

  const clases = [
    "ui-qualification",
    "ui-qualification--stars",
    `ui-qualification--${size}`,
    interactivo ? "ui-qualification--interactive" : "",
    disabled ? "ui-qualification--disabled" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // Solo lectura: una imagen con texto accesible
  if (!onChange) {
    return (
      <span className={clases} role="img" aria-label={etiqueta}>
        {posiciones.map((n) => (
          <Estrella key={n} llena={n <= actual} className="ui-qualification__star" />
        ))}
      </span>
    );
  }

  // Interactivo: un botón por estrella
  return (
    <span className={clases} role="group" aria-label={etiqueta} onMouseLeave={() => setHover(null)}>
      {posiciones.map((n) => (
        <button
          key={n}
          type="button"
          className="ui-qualification__btn"
          aria-label={`${n} de ${max} estrellas`}
          aria-pressed={n === actual}
          disabled={disabled}
          onMouseEnter={() => interactivo && setHover(n)}
          onFocus={() => interactivo && setHover(n)}
          onBlur={() => setHover(null)}
          onClick={() => onChange(n === actual ? 0 : n)}
        >
          <Estrella llena={n <= mostrado} className="ui-qualification__star" />
        </button>
      ))}
    </span>
  );
}