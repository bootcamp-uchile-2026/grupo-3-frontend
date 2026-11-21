
type UIOptionProps = {
  texto: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

export default function UIOption({
  texto,
  selected = false,
  onClick,
  disabled = false,
}: UIOptionProps) {
  return (
    <button
      type="button"
      className={`ui-option ${selected ? "ui-option--selected" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {texto}
    </button>
  );
}
