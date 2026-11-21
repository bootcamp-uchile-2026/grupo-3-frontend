import { useId } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import "./UISearchInput.css";


export type UISearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** Texto para lectores de pantalla (no se muestra). */
  label?: string;
  disabled?: boolean;
  /** Muestra el botón × para borrar cuando hay texto. */
  clearable?: boolean;
  size?: "md" | "lg";
  id?: string;
  name?: string;
  className?: string;
};

export function UISearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar",
  label = "Buscar",
  disabled = false,
  clearable = true,
  size = "lg",
  id,
  name = "q",
  className,
}: UISearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const mostrarLimpiar = clearable && value.length > 0 && !disabled;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const termino = value.trim();
    if (termino) onSubmit?.(termino);
  };

  // Escape borra el texto, como en los buscadores nativos.
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && value) {
      event.preventDefault();
      onChange("");
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={[
        "ui-search",
        `ui-search--${size}`,
        disabled ? "ui-search--disabled" : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={inputId} className="ui-search__label">
        {label}
      </label>

      <button
        type="submit"
        className="ui-search__submit"
        aria-label="Buscar"
        disabled={disabled}
      >
        <svg className="ui-search__icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>

      <input
        id={inputId}
        name={name}
        type="search"
        className="ui-search__input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        enterKeyHint="search"
      />

      {mostrarLimpiar && (
        <button
          type="button"
          className="ui-search__clear"
          aria-label="Borrar búsqueda"
          onClick={() => onChange("")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      )}
    </form>
  );
}
