import { IconPercent } from "../UIIcons"

export type UIProductCardDiscountProps = {
    percentage: number
}

export function UIProductCardDiscount({ percentage }: UIProductCardDiscountProps) {
    return (
        <span
            className="ui-product-card-discount"
            role="img"
            aria-label={`${percentage}% de descuento`}
        >
            <span aria-hidden="true">{percentage}</span>
            <IconPercent
                className="ui-product-card-discount__icon"
                color="var(--b-n-blanco-color)"
                aria-hidden="true"
            />
        </span>
    )
}
