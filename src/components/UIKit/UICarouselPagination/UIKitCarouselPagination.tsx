export interface UIKitCarouselPaginationProps {
    totalSlides: number
    currentSlide: number
    onSlideChange: (slide: number) => void
    size?: "sm" | "md"
    clickable?: boolean
    disabled?: boolean
    className?: string
}

export function UIKitCarouselPagination({
    totalSlides,
    currentSlide,
    onSlideChange,
    size = "md",
    clickable = true,
    disabled = false,
    className = "",
}: UIKitCarouselPaginationProps) {
    const slideCount = Number.isFinite(totalSlides) ? Math.max(0, Math.floor(totalSlides)) : 0

    if (slideCount === 0) {
        return null
    }

    const requestedSlide = Number.isFinite(currentSlide) ? Math.floor(currentSlide) : 0
    const activeSlide = Math.min(Math.max(0, requestedSlide), slideCount - 1)
    const isInteractive = clickable
    const rootClassName = [
        "ui-kit-carousel-pagination",
        `ui-kit-carousel-pagination--${size}`,
        className,
    ].filter(Boolean).join(" ")

    return (
        <nav
            className={rootClassName}
            aria-label="Paginación del carrusel"
            data-disabled={disabled || undefined}
        >
            {Array.from({ length: slideCount }, (_, slide) => {
                const isActive = activeSlide === slide
                const label = `Diapositiva ${slide + 1}`

                return isInteractive ? (
                    <button
                        key={slide}
                        type="button"
                        className="ui-kit-carousel-pagination__dot"
                        aria-label={label}
                        aria-current={isActive ? "true" : undefined}
                        disabled={disabled}
                        onClick={() => onSlideChange(slide)}
                    />
                ) : (
                    <span
                        key={slide}
                        className="ui-kit-carousel-pagination__dot"
                        aria-label={label}
                        aria-current={isActive ? "true" : undefined}
                    />
                )
            })}
        </nav>
    )
}
