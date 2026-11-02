import { useState } from "react"
import { UIProductPagination } from "../../components/UIKit/UIPagination/UIProductPagination"

type PaginationExampleProps = {
    title: string
    totalPages: number
    initialPage?: number
    disabled?: boolean
}

function PaginationExample({
    title,
    totalPages,
    initialPage = 1,
    disabled = false,
}: PaginationExampleProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)

    return (
        <section className="ui-kit-pagination-example">
            <h2>{title}</h2>
            <UIProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                disabled={disabled}
            />
        </section>
    )
}

export function UIKitComponents() {
    return (
        <main className="container ui-kit-components-page">
            <h1>UI Kit Components</h1>
            <div className="ui-kit-components">
                <PaginationExample title="Paginación básica (5 páginas)" totalPages={5} />
                <PaginationExample title="Paginación (10 páginas)" totalPages={10} initialPage={4} />
                <PaginationExample title="Paginación (20 páginas)" totalPages={20} initialPage={12} />
                <PaginationExample
                    title="Paginación deshabilitada"
                    totalPages={10}
                    initialPage={3}
                    disabled
                />
            </div>
        </main>
    )
}