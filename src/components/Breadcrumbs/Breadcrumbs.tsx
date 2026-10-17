import { Link } from "react-router-dom";

export type BreadcrumbItem = {
    label: string;
    to: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
            {items.map((item, index) => (
                <span className="breadcrumbs__item" key={`${item.to}-${item.label}`}>
                    {index > 0 && <span aria-hidden="true">»</span>}
                    {index === items.length - 1
                        ? <span aria-current="page">{item.label}</span>
                        : <Link to={item.to}>{item.label}</Link>}
                </span>
            ))}
        </nav>
    );
}
