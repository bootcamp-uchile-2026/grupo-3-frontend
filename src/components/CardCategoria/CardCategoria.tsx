import { Link } from "react-router-dom";

type CardCategoriaProps = {
    titulo: string;
    urlImagen: string;
    urlLink: string;
};

export function CardCategoria({ titulo, urlImagen, urlLink }: CardCategoriaProps) {
    return (
        <article className="categoria-card-home">
            <Link to={urlLink}>
                <img src={urlImagen} alt={titulo} />
                <h3 className="titulo-center">{titulo}</h3>
            </Link>
        </article>
    )
}