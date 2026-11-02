import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
} from "../UIIcons"

export type UIKitPaginationProps = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    visiblePages?: number
    disabled?: boolean
    className?: string
}

export function UIProductPagination({
    currentPage,
    totalPages,
    onPageChange,
    visiblePages = 5,
    disabled = false,
    className = "",
}: UIKitPaginationProps) {
    const pageCount = Number.isFinite(totalPages) ? Math.max(0, Math.floor(totalPages)) : 0
    const pageWindowSize = Number.isFinite(visiblePages)
        ? Math.max(1, Math.floor(visiblePages))
        : 5
    const activePage = pageCount > 0
        ? Math.min(Math.max(1, Math.floor(currentPage)), pageCount)
        : 0
    const firstVisiblePage = Math.min(
        Math.max(1, activePage - Math.floor(pageWindowSize / 2)),
        Math.max(1, pageCount - pageWindowSize + 1),
    )
    const pages = Array.from(
        { length: Math.min(pageCount, pageWindowSize) },
        (_, index) => firstVisiblePage + index,
    )
    const isFirstPage = activePage <= 1
    const isLastPage = activePage >= pageCount
    const rootClassName = ["ui-product-pagination", className].filter(Boolean).join(" ")

    return (
        <nav className={rootClassName} aria-label="Paginación">
            <button
                type="button"
                className="ui-product-pagination__navigation"
                aria-label="Primera página"
                disabled={disabled || isFirstPage || pageCount === 0}
                onClick={() => onPageChange(1)}
            >
                <IconChevronsLeft color="currentColor" size={24} aria-hidden="true" />
            </button>
            <button
                type="button"
                className="ui-product-pagination__navigation"
                aria-label="Página anterior"
                disabled={disabled || isFirstPage || pageCount === 0}
                onClick={() => onPageChange(activePage - 1)}
            >
                <IconChevronLeft color="currentColor" size={24} aria-hidden="true" />
            </button>

            <div className="ui-product-pagination__pages">
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className="ui-product-pagination__page"
                        aria-label={`Página ${page}`}
                        aria-current={activePage === page ? "page" : undefined}
                        disabled={disabled}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="ui-product-pagination__navigation"
                aria-label="Página siguiente"
                disabled={disabled || isLastPage || pageCount === 0}
                onClick={() => onPageChange(activePage + 1)}
            >
                <IconChevronRight color="currentColor" size={24} aria-hidden="true" />
            </button>
            <button
                type="button"
                className="ui-product-pagination__navigation"
                aria-label="Última página"
                disabled={disabled || isLastPage || pageCount === 0}
                onClick={() => onPageChange(pageCount)}
            >
                <IconChevronsRight color="currentColor" size={24} aria-hidden="true" />
            </button>
        </nav>
    )
}