type CardPetLoveProps = {
    urlImagen: string;
}

export function CardPetLove({ urlImagen }: CardPetLoveProps) {
    return (
        <article className="petlove-card">
            <img src={urlImagen} alt="PetLove" />
        </article>
    )
}