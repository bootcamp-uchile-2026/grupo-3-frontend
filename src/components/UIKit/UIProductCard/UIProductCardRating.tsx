import { IconStar, IconStarFill } from "../UIIcons"

export type UIProductCardRatingProps = {
    rating: number
}

export function UIProductCardRating({ rating }: UIProductCardRatingProps) {
    const filledStars = Math.min(5, Math.max(0, Math.round(rating)))

    return (
        <span
            className="ui-product-card-rating"
            role="img"
            aria-label={`Calificación: ${filledStars} de 5`}
        >
            {Array.from({ length: 5 }, (_, index) => {
                const StarIcon = index < filledStars ? IconStarFill : IconStar

                return (
                    <StarIcon
                        key={index}
                        className="ui-product-card-rating__star"
                        color="var(--secundario-70-color)"
                        aria-hidden="true"
                    />
                )
            })}
        </span>
    )
}
