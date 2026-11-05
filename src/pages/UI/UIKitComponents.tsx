import { useState } from "react"
import {
    UIProductPagination,
    UIKitCarouselPagination,
} from "../../components/UIKit"

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

type CarouselPaginationExampleProps = {
    title: string
    size?: "sm" | "md"
    initialSlide?: number
    clickable?: boolean
    disabled?: boolean
}

function CarouselPaginationExample({
    title,
    size = "md",
    initialSlide = 0,
    clickable = true,
    disabled = false,
}: CarouselPaginationExampleProps) {
    const [currentSlide, setCurrentSlide] = useState(initialSlide)

    return (
        <section className="ui-kit-pagination-example">
            <h2>{title}</h2>
            <UIKitCarouselPagination
                totalSlides={5}
                currentSlide={currentSlide}
                onSlideChange={setCurrentSlide}
                size={size}
                clickable={clickable}
                disabled={disabled}
            />
            <p>Diapositiva activa: {currentSlide + 1}</p>
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
                <CarouselPaginationExample title="Carrusel — tamaño md (5 diapositivas)" />
                <CarouselPaginationExample
                    title="Carrusel — tamaño sm (5 diapositivas)"
                    size="sm"
                    initialSlide={2}
                />
                <CarouselPaginationExample
                    title="Carrusel — última diapositiva activa"
                    initialSlide={4}
                />
                <CarouselPaginationExample
                    title="Carrusel — no interactivo"
                    initialSlide={1}
                    clickable={false}
                />
                <CarouselPaginationExample
                    title="Carrusel — deshabilitado"
                    initialSlide={3}
                    disabled
                />
            </div>
        </main>
    )
}