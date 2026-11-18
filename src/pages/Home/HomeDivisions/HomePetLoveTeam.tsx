import { CardPetLove } from "../../../components/CardPetLove/CardPetLove";

type HomePetloveTeamProps = {
    title: string
    images: { url: string; alt: string }[]
}

function HomePetloveTeam({ images, title }: HomePetloveTeamProps){
    return (
        <div className="home__family-inner">
            <h2 className="home__section-title">{title}</h2>
            <div className="home__family-grid">
                {images.map(({ url, alt }) => (
                    <CardPetLove key={url} urlImagen={url} alt={alt} />
                ))}
            </div>
        </div>
    )
}

export default HomePetloveTeam;