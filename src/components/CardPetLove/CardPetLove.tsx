type CardPetLoveProps = {
    urlImagen: string;
    alt: string;
}

export function CardPetLove({ urlImagen, alt }: CardPetLoveProps) {
    return (
        <article className="petlove-card">
            <img src={urlImagen} alt={alt} />
        </article>
    )
}