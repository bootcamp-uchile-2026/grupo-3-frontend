type HeroTiendaProps = {
    titulo: string;
};

export function HeroTienda({ titulo }: HeroTiendaProps) {
    return (
        <div className="hero-tienda">
            <img src="https://placehold.co/1920x600" alt="" />
            <h1 className="titulo-seccion">{titulo}</h1>
        </div>
    )
}