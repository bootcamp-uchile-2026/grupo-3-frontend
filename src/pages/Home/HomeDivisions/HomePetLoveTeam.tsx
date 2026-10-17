import { CardPetLove } from "../../../components/CardPetLove/CardPetLove";

type HomePetloveTeamProps = {
    title: string
    urlImages: string[]
}

function HomePetloveTeam({ urlImages, title }:HomePetloveTeamProps){
    return (
        <>
        <div className="container">
            <h2 className="titulo-seccion titulo-center">{title}</h2>
            <div className="petlove-cards">
                {urlImages.map((url) => (<CardPetLove urlImagen={url} />))}
            </div>
        </div>
        </>
    )
}

export default HomePetloveTeam;