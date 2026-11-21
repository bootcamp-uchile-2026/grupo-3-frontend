
import { useId } from "react";
import type { ChangeEvent } from "react";

export type UIToggleProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  id?: string;
  name?: string;
};

export function UIToggle({
  label,
  checked,
  onChange,
  disabled = false,
  error = false,
  id,
  name,
}: UIToggleProps) {
  const generatedId = useId();
  const toggleId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label
      htmlFor={toggleId}
      className={[
        "ui-toggle",
        disabled ? "ui-toggle--disabled" : "",
        error ? "ui-toggle--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={toggleId}
        name={name}
        type="checkbox"
        role="switch"
        className="ui-toggle__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-label={label || "Interruptor"}
      />

      <span className="ui-toggle__track" aria-hidden="true">
        <span className="ui-toggle__thumb" />
      </span>

      {label && <span className="ui-toggle__label">{label}</span>}
    </label>
  );
}
