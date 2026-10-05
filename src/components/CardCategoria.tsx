type CardCategoriaProps = {
    titulo: string;
    urlImagen: string;
    urlLink: string;
};

export function CardCategoria({ titulo, urlImagen, urlLink }: CardCategoriaProps) {
    return (
        <article className="categoria-card-home">
            <a href={urlLink
        
            }>
                <img src={urlImagen
            
                } alt={titulo} />
                <h3>{titulo}</h3>
            </a>
        </article>
    )
}