
import { useId } from "react";
import type { ChangeEvent } from "react";
import "./UICheckbox.css";

export type UICheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
};

export function UICheckbox({
  label,
  checked,
  onChange,
  disabled = false,
  error = false,
  id,
  name,
}: UICheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      htmlFor={checkboxId}
      className={[
        "ui-checkbox",
        disabled ? "ui-checkbox--disabled" : "",
        error ? "ui-checkbox--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={checkboxId}
        name={name}
        type="checkbox"
        className="ui-checkbox__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={error || undefined}
      />

      <span className="ui-checkbox__box" aria-hidden="true">
        <svg
          className="ui-checkbox__check"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8L6.5 11.5L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="ui-checkbox__label">{label}</span>
    </label>
  );
}
