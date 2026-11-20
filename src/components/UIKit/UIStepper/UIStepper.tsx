import { Fragment } from "react";
import "./UIStepper.css";

export type UIStepperProps = {
  /** Nombre de cada paso, en orden. */
  steps: string[];
  /** Paso actual, empezando en 0. */
  current: number;
  /** Esquema de color: verde (agendamiento) o naranjo (compra). */
  color?: "green" | "orange";
  size?: "sm" | "md";
  /**
   * Si se pasa, los pasos ya completados se pueden presionar para volver a ellos.
   * Recibe el índice del paso (empezando en 0).
   */
  onStepClick?: (index: number) => void;
  /** Nombre accesible del proceso (ej. "Pasos del agendamiento"). */
  ariaLabel?: string;
  className?: string;
};

export function UIStepper({
  steps,
  current,
  color = "green",
  size = "md",
  onStepClick,
  ariaLabel = "Progreso",
  className,
}: UIStepperProps) {
  const actual = Math.min(Math.max(current, 0), steps.length - 1);

  const clases = ["ui-stepper", `ui-stepper--${color}`, `ui-stepper--${size}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={clases} aria-label={ariaLabel}>
      <ol className="ui-stepper__list">
        {steps.map((label, index) => {
          const estado =
            index === actual ? "current" : index < actual ? "completed" : "upcoming";
          const clicable = Boolean(onStepClick) && estado === "completed";

          const contenido = (
            <>
              <span className="ui-stepper__circle" aria-hidden="true">
                {index + 1}
              </span>
              <span className="ui-stepper__label">{label}</span>
              <span className="ui-stepper__sr">
                {estado === "current"
                  ? " (paso actual)"
                  : estado === "completed"
                    ? " (completado)"
                    : ""}
                {`, paso ${index + 1} de ${steps.length}`}
              </span>
            </>
          );

          return (
            <Fragment key={label}>
              {index > 0 && (
                <li
                  className={`ui-stepper__connector ${index <= actual ? "ui-stepper__connector--done" : ""}`}
                  aria-hidden="true"
                />
              )}
              <li
                className={`ui-stepper__step ui-stepper__step--${estado}`}
                aria-current={estado === "current" ? "step" : undefined}
              >
                {clicable ? (
                  <button
                    type="button"
                    className="ui-stepper__btn"
                    onClick={() => onStepClick?.(index)}
                  >
                    {contenido}
                  </button>
                ) : (
                  <span className="ui-stepper__btn">{contenido}</span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}