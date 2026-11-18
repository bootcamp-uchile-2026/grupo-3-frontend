import { Link } from "react-router-dom";
import { UIKitIcon } from "../../../components/UIKit/UIIcons/UIKitIcon";

const heroAnimals = new URL("../../../assets/Home/hero-animals.png", import.meta.url).href;

function HomeHero() {
    return (
        <section className="home-hero" aria-labelledby="home-hero-title">
            <div className="home-hero__content">
                <h1 className="home-hero__title" id="home-hero-title">
                    Conozcamos<br />a tu mascota
                </h1>
                <p className="home-hero__description">
                    Crea su perfil y acompáñala en cada etapa
                </p>
                <Link className="home-hero__cta" to="/mi-perfil/perfil-mascota">
                    <span>Registrar a mi mascota</span>
                    <UIKitIcon name="Paw" size={20} aria-hidden="true" />
                </Link>
            </div>
            <img className="home-hero__image" src={heroAnimals} alt="Perros, gatos y otras mascotas" />
        </section>
    );
}

export default HomeHero;
