import { useId } from "react";
import type { ChangeEvent, FocusEvent, HTMLInputTypeAttribute } from "react";
import "./UIInput.css";

export type UIInputProps = {
  /** Texto dentro del campo cuando está vacío (ej. "Nombre"). */
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;

  type?: HTMLInputTypeAttribute;
  /** Muestra el asterisco rojo y marca el campo como obligatorio. */
  required?: boolean;
  /** Estado de validación: borde rojo (error) o verde con ✓ (success). */
  status?: "default" | "error" | "success";
  /** Mensaje bajo el campo. En error se anuncia a lectores de pantalla. */
  message?: string;
  size?: "sm" | "md";
  disabled?: boolean;

  id?: string;
  name?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal" | "search" | "url";
  maxLength?: number;

  /** Solo para documentación: muestra un estado de forma fija (como en Figma). */
  forceState?: "hover" | "focus";
  className?: string;
};

export function UIInput({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required = false,
  status = "default",
  message,
  size = "md",
  disabled = false,
  id,
  name,
  autoComplete,
  inputMode,
  maxLength,
  forceState,
  className,
}: UIInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-mensaje`;

  const clases = [
    "ui-input",
    `ui-input--${size}`,
    status !== "default" ? `ui-input--${status}` : "",
    disabled ? "ui-input--disabled" : "",
    forceState ? `ui-input--is-${forceState}` : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={clases}>
      <div className="ui-input__field">
        <input
          id={inputId}
          name={name}
          type={type}
          className="ui-input__control"
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          /* placeholder " " permite saber con CSS si el campo está vacío */
          placeholder=" "
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={status === "error" || undefined}
          aria-describedby={message ? messageId : undefined}
        />

        <label htmlFor={inputId} className="ui-input__label">
          {label}
          {required && (
            <span className="ui-input__required" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {status === "success" && (
          <svg className="ui-input__status-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        )}
      </div>

      {message && (
        <p
          id={messageId}
          className="ui-input__message"
          role={status === "error" ? "alert" : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}