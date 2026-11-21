import { Link } from "react-router-dom";
import { IconChevronsRight } from "../UIKit/UIIcons";

export type BreadcrumbItem = {
    label: string;
    to: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    variant?: "default" | "product-detail";
};

export function Breadcrumbs({ items, variant = "default" }: BreadcrumbsProps) {
    const isProductDetail = variant === "product-detail";

    const separator = isProductDetail
        ? <IconChevronsRight className="breadcrumbs__separator" color="currentColor" aria-hidden="true" />
        : <span aria-hidden="true">»</span>;
    return (
        <nav className={isProductDetail ? "breadcrumbs breadcrumbs--product-detail" : "breadcrumbs"} aria-label="Ruta de navegación">
            {items.map((item, index) => (
                <span className="breadcrumbs__item" key={`${item.to}-${item.label}`}>
                    {index > 0 && separator}
                    {index === items.length - 1
                        ? <span aria-current="page">{item.label}</span>
                        : <Link to={item.to}>{item.label}</Link>}
                </span>
            ))}
        </nav>
    );
}
