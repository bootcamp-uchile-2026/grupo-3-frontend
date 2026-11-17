import { IconCheck, IconLoading } from "../UIIcons"

export type UIProductCardButtonProps = {
    label: string
    onClick: () => void
    disabled?: boolean
    loading?: boolean
    selected?: boolean
    className?: string
}

export function UIProductCardButton({
    label,
    onClick,
    disabled = false,
    loading = false,
    selected = false,
    className = "",
}: UIProductCardButtonProps) {
    const stateClass = selected ? " ui-product-card-button--selected" : ""
    const loadingClass = loading ? " ui-product-card-button--loading" : ""
    const customClass = className ? ` ${className}` : ""

    return (
        <button
            className={`ui-product-card-button${stateClass}${loadingClass}${customClass}`}
            type="button"
            onClick={onClick}
            disabled={disabled || loading}
            aria-pressed={selected}
            aria-busy={loading}
        >
            {loading ? (
                <IconLoading className="ui-product-card-button__icon" color="currentColor" />
            ) : selected ? (
                <IconCheck className="ui-product-card-button__icon" color="currentColor" />
            ) : null}
            <span>{label}</span>
        </button>
    )
}
