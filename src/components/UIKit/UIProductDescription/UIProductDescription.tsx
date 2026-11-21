import { useId, useState, type ReactNode } from "react"
import { IconChevronDown, IconChevronUp, IconDocument, IconList } from "../UIIcons"

export interface UIProductDescriptionProps {
    type?: ProductDescriptionType
    title?: string
    icon?: ReactNode
    children: ReactNode
    defaultOpen?: boolean
    className?: string
}

export type ProductDescriptionType = "technical" | "usage"

const sectionDefaults: Record<ProductDescriptionType, { title: string; icon: ReactNode }> = {
    technical: {
        title: "Ficha técnica",
        icon: <IconDocument color="var(--primario-90-color)" />,
    },
    usage: {
        title: "Modo de uso",
        icon: <IconList color="var(--primario-90-color)" />,
    },
}

export function UIProductDescription({
    type = "technical",
    title,
    icon,
    children,
    defaultOpen = false,
    className = "",
}: UIProductDescriptionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const contentId = useId()
    const section = sectionDefaults[type]

    return (
        <section
            className={`ui-product-description${isOpen ? " is-open" : ""}${className ? ` ${className}` : ""}`}
        >
            <button
                className="ui-product-description__header"
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setIsOpen((open) => !open)}
            >
                <span className="ui-product-description__icon">{icon ?? section.icon}</span>
                <span className="ui-product-description__title">{title ?? section.title}</span>
                <span className="ui-product-description__indicator" aria-hidden="true">
                    {isOpen ? (
                        <IconChevronUp color="var(--terciario-30-color)" />
                    ) : (
                        <IconChevronDown color="var(--terciario-30-color)" />
                    )}
                </span>
            </button>
            <div
                className="ui-product-description__panel"
                id={contentId}
                aria-hidden={!isOpen}
                inert={!isOpen}
            >
                <div className="ui-product-description__content">{children}</div>
            </div>
        </section>
    )
}