export type UIProductCardModalCartQuantityStepperProps = {
    quantity: number
    onDecrease: () => void
    onIncrease: () => void
    className?: string
}

export function UIProductCardModalCartQuantityStepper({
    quantity,
    onDecrease,
    onIncrease,
    className = "",
}: UIProductCardModalCartQuantityStepperProps) {
    const rootClassName = [
        "ui-product-card-modal-cart__stepper",
        className,
    ].filter(Boolean).join(" ")

    return (
        <div className={rootClassName} role="group" aria-label="Cantidad del producto">
            <button
                className="ui-product-card-modal-cart__stepper-button ui-product-card-modal-cart__stepper-button--decrease"
                type="button"
                aria-label="Disminuir cantidad"
                onClick={onDecrease}
            >
                <span aria-hidden="true">−</span>
            </button>
            <output
                className="ui-product-card-modal-cart__stepper-value"
                aria-live="polite"
                aria-label={`Cantidad: ${quantity}`}
            >
                {quantity}
            </output>
            <button
                className="ui-product-card-modal-cart__stepper-button ui-product-card-modal-cart__stepper-button--increase"
                type="button"
                aria-label="Aumentar cantidad"
                onClick={onIncrease}
            >
                <span aria-hidden="true">+</span>
            </button>
        </div>
    )
}
