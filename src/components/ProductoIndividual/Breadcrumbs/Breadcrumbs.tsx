import { Link } from "react-router-dom";

type BreadcrumbsProps = {
    especie: string;
    categoria: string;
    subcategoria: string;
};

export function Breadcrumbs({ especie, categoria, subcategoria }: BreadcrumbsProps) {
    return (
        <nav className="producto-breadcrumbs" aria-label="Ruta de navegación">
            <Link to="/">Inicio</Link>
            <span aria-hidden="true">»</span>
            <Link to="/tienda">{especie}</Link>
            <span aria-hidden="true">»</span>
            <Link to="/tienda">{categoria}</Link>
            <span aria-hidden="true">»</span>
            <Link to="/tienda">{subcategoria}</Link>
        </nav>
    );
}
