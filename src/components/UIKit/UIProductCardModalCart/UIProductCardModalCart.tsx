import { IconTrash } from "../UIIcons"
import { UIProductCardModalCartQuantityStepper } from "./UIProductCardModalCartQuantityStepper"

export type UIProductCardModalCartProps = {
    imageSrc: string
    imageAlt: string
    productName: string
    price: string
    priceQuantity: number
    quantity: number
    onRemove: () => void
    onDecrease: () => void
    onIncrease: () => void
    className?: string
}

export function UIProductCardModalCart({
    imageSrc,
    imageAlt,
    productName,
    price,
    priceQuantity,
    quantity,
    onRemove,
    onDecrease,
    onIncrease,
    className = "",
}: UIProductCardModalCartProps) {
    const rootClassName = ["ui-product-card-modal-cart", className].filter(Boolean).join(" ")

    return (
        <article className={rootClassName}>
            <div className="ui-product-card-modal-cart__row">
                <div className="ui-product-card-modal-cart__product">
                    <img
                        className="ui-product-card-modal-cart__image"
                        src={imageSrc}
                        alt={imageAlt}
                    />
                    <div className="ui-product-card-modal-cart__details">
                        <h3 className="ui-product-card-modal-cart__name">{productName}</h3>
                        <p className="ui-product-card-modal-cart__price">
                            <span>{priceQuantity}</span>
                            <span aria-hidden="true">x</span>
                            <span>{price}</span>
                        </p>
                    </div>
                </div>
                <button
                    className="ui-product-card-modal-cart__remove"
                    type="button"
                    aria-label={`Eliminar ${productName} del carrito`}
                    onClick={onRemove}
                >
                    <IconTrash
                        className="ui-product-card-modal-cart__remove-icon"
                        color="var(--primario-90-color)"
                        aria-hidden="true"
                        focusable="false"
                    />
                </button>
            </div>
            <UIProductCardModalCartQuantityStepper
                quantity={quantity}
                onDecrease={onDecrease}
                onIncrease={onIncrease}
            />
        </article>
    )
}
