
import { useId } from "react";
import type { ChangeEvent } from "react";

type UIRadioProps = {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  onChange?: (value: string) => void;
};

export default function UIRadio({
  name,
  value,
  label,
  checked = false,
  disabled = false,
  error = false,
  onChange,
}: UIRadioProps) {
  const id = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange?.(value);
    }
  };

  return (
    <label
      htmlFor={id}
      className={`ui-radio ${error ? "ui-radio--error" : ""}`}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        aria-invalid={error || undefined}
        onChange={handleChange}
        className="ui-radio__input"
      />

      <span className="ui-radio__circle" aria-hidden="true" />

      <span className="ui-radio__label">{label}</span>
    </label>
  );
}
