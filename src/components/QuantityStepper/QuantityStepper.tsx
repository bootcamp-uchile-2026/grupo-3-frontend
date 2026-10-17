interface QuantityStepperProps {
  value: number;
  disabled?: boolean;
  decrementDisabled?: boolean;
  onDecrement: () => void;
  onIncrement: () => void;
}

export function QuantityStepper({
  value,
  disabled = false,
  decrementDisabled = false,
  onDecrement,
  onIncrement,
}: QuantityStepperProps) {
  return (
    <div className="quantity-stepper" aria-label={`Cantidad: ${value}`}>
      <button
        className="quantity-stepper__button"
        type="button"
        aria-label="Disminuir cantidad"
        disabled={disabled || decrementDisabled || value <= 1}
        onClick={onDecrement}
      >
        −
      </button>
      <span className="quantity-stepper__value" aria-live="polite">{value}</span>
      <button
        className="quantity-stepper__button"
        type="button"
        aria-label="Aumentar cantidad"
        disabled={disabled}
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
}
