import { UIProductCardButton } from "./UIProductCardButton"
import { UIProductCardDiscount } from "./UIProductCardDiscount"
import { UIProductCardRating } from "./UIProductCardRating"

export type UIProductCardProps = {
    imageSrc: string
    imageAlt: string
    name: string
    price: string
    rating: number
    buttonLabel: string
    onAddToCart: () => void
    discountPercentage?: number
    selected?: boolean
    className?: string
}

export function UIProductCard({
    imageSrc,
    imageAlt,
    name,
    price,
    rating,
    buttonLabel,
    onAddToCart,
    discountPercentage,
    selected = false,
    className = "",
}: UIProductCardProps) {
    const customClass = className ? ` ${className}` : ""

    return (
        <article className={`ui-product-card${customClass}`}>
            <div className="ui-product-card__content">
                <div className="ui-product-card__visual">
                    <img className="ui-product-card__image" src={imageSrc} alt={imageAlt} />
                    {discountPercentage !== undefined && (
                        <UIProductCardDiscount percentage={discountPercentage} />
                    )}
                </div>
                <UIProductCardRating rating={rating} />
                <h3 className="ui-product-card__title">{name}</h3>
                <p className="ui-product-card__price">{price}</p>
            </div>
            <UIProductCardButton
                label={buttonLabel}
                onClick={onAddToCart}
                selected={selected}
            />
        </article>
    )
}
