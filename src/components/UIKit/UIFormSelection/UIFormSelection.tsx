
import { useId } from "react";
import "./UIFormSelection.css";

// Tipos de selección disponibles
export type FormSelectionType = "shipping" | "payment" | "vet";

// Tamaños definidos en Figma
export type FormSelectionSize = "S" | "M";

// Opciones del componente
export type FormSelectionOption = {
  value: string;
  label: string;
  price?: string;
  time?: string;
  subtitle?: string;
};

// Propiedades del componente
export type UIFormSelectionProps = {
  type: FormSelectionType;
  options: FormSelectionOption[];
  value: string;
  onChange: (value: string) => void;
  title?: string;
  name?: string;
  disabled?: boolean;
  size?: FormSelectionSize;
};

export function UIFormSelection({
  type,
  options,
  value,
  onChange,
  title,
  name,
  disabled = false,
  size = "S",
}: UIFormSelectionProps) {
  const generatedId = useId();
  const groupName = name ?? generatedId;

  const defaultTitles = {
    shipping: "¿Recibes o retiras tu pedido?",
    payment: "¿Cómo vas a pagar?",
    vet: "Selecciona un veterinario",
  };

  const heading = title ?? defaultTitles[type];

  return (
    <fieldset
      className={[
        "ui-form-selection",
        `ui-form-selection--${type}`,
        `ui-form-selection--${size.toLowerCase()}`,
      ].join(" ")}
      disabled={disabled}
    >
      {type !== "vet" && (
        <legend className="ui-form-selection__title">
          <span aria-hidden="true">
            {type === "shipping" ? "♧ " : "▭ "}
          </span>
          {heading}
        </legend>
      )}

      <div className="ui-form-selection__options">
        {options.map((option) => {
          const isSelected = value === option.value;

          return (
            <label
              key={option.value}
              className={[
                "ui-form-selection__option",
                isSelected
                  ? "ui-form-selection__option--selected"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {type === "vet" && option.time && (
                <span className="ui-form-selection__time">
                  {option.time}
                </span>
              )}

              {type === "vet" && (
                <span
                  className="ui-form-selection__avatar"
                  aria-hidden="true"
                />
              )}

              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="ui-form-selection__input"
              />

              <span
                className="ui-form-selection__radio"
                aria-hidden="true"
              />

              <span className="ui-form-selection__content">
                <span className="ui-form-selection__label">
                  {option.label}
                </span>

                {option.subtitle && (
                  <span className="ui-form-selection__subtitle">
                    {option.subtitle}
                  </span>
                )}
              </span>

              {option.price && (
                <span className="ui-form-selection__price">
                  {option.price}
                </span>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
