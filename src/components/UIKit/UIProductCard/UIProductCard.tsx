import { useState } from "react"
import { Link } from "react-router-dom"
import type { ReactEventHandler } from "react"
import { UIProductCardButton } from "./UIProductCardButton"
import { UIProductCardDiscount } from "./UIProductCardDiscount"
import { UIProductCardRating } from "./UIProductCardRating"

export type UIProductCardProps = {
    imageSrc: string
    imageAlt: string
    name: string
    price: string
    previousPrice?: string
    rating?: number
    showUnrated?: boolean
    buttonLabel: string
    onAddToCart: () => void
    onImageError?: ReactEventHandler<HTMLImageElement>
    discountPercentage?: number
    productTo?: string
    loading?: boolean
    selected?: boolean
    buttonDisabled?: boolean
    className?: string
}

export function UIProductCard({
    imageSrc,
    imageAlt,
    name,
    price,
    previousPrice,
    rating,
    showUnrated = false,
    buttonLabel,
    onAddToCart,
    onImageError,
    discountPercentage,
    productTo,
    loading = false,
    selected = false,
    buttonDisabled = false,
    className = "",
}: UIProductCardProps) {
    const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null)
    const imageError = failedImageSrc === imageSrc
    const customClass = className ? ` ${className}` : ""

    const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
        setFailedImageSrc(imageSrc)
        onImageError?.(event)
    }

    const content = (
        <div className="ui-product-card__content">
            <div className="ui-product-card__visual">
                <img
                    className="ui-product-card__image"
                    src={imageSrc}
                    alt={imageAlt}
                    hidden={imageError}
                    onError={handleImageError}
                />
                {imageError && (
                    <span className="ui-product-card__image-fallback" role="status">
                        Imagen no disponible
                    </span>
                )}
                {discountPercentage !== undefined && (
                    <UIProductCardDiscount percentage={discountPercentage} />
                )}
            </div>
            {(rating !== undefined || showUnrated) && <UIProductCardRating rating={rating} />}
            <h3 className="ui-product-card__title">{name}</h3>
            <div className="ui-product-card__prices">
                {previousPrice && (
                    <del className="ui-product-card__previous-price">{previousPrice}</del>
                )}
                <p className="ui-product-card__price">{price}</p>
            </div>
        </div>
    )

    return (
        <article className={`ui-product-card${customClass}`}>
            {productTo
                ? <Link className="ui-product-card__link" to={productTo}>{content}</Link>
                : content}
            <UIProductCardButton
                label={buttonLabel}
                onClick={onAddToCart}
                disabled={buttonDisabled}
                loading={loading}
                selected={selected}
            />
        </article>
    )
}
