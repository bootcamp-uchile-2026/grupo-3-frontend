import { Link } from "react-router-dom";
import UIButton from "../UIKit/UIButton/UIButton";
import { IconOutlet } from "../UIKit/UIIcons";

const bannerChuruProducts = new URL(
    "../../assets/Tienda/banner-churu-products.png",
    import.meta.url,
).href;
const bannerKitten = new URL("../../assets/Tienda/banner-kitten.png", import.meta.url).href;
const categoryFoodSnack = new URL(
    "../../assets/Tienda/category-food-snack.jpg",
    import.meta.url,
).href;
const categoryHealth = new URL("../../assets/Tienda/category-health.png", import.meta.url).href;
const categoryLitter = new URL("../../assets/Tienda/category-litter.png", import.meta.url).href;
const categoryOutlet = new URL("../../assets/Tienda/category-outlet.png", import.meta.url).href;
const categoryPharmacy = new URL(
    "../../assets/Tienda/category-pharmacy.png",
    import.meta.url,
).href;
const categoryToys = new URL("../../assets/Tienda/category-toys.png", import.meta.url).href;

type HeroTiendaCategory = {
    label: string;
    href: string;
    image: string;
    contain?: boolean;
};

const categories: HeroTiendaCategory[] = [
    { label: "Alimento y Snack", href: "/categoria/alimento", image: categoryFoodSnack },
    { label: "Arenas y Areneros", href: "/categoria/arenas-y-areneros", image: categoryLitter },
    { label: "Farmacia", href: "/categoria/farmacia", image: categoryPharmacy, contain: true },
    { label: "Salud y bienestar", href: "/categoria/salud-y-bienestar", image: categoryHealth },
    { label: "Juguetes", href: "/categoria/juguetes", image: categoryToys },
    { label: "Outlet", href: "/categoria/ofertas", image: categoryOutlet },
];

export function HeroTienda() {
    function verProductos() {
        document.getElementById("tienda-resultados")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <section className="hero-tienda" aria-label="Promoción y categorías">
            <div className="hero-tienda__banner">
                <div className="hero-tienda__banner-inner">
                    <div className="hero-tienda__promocion">
                        <h2 className="hero-tienda__titulo">
                            Hasta 50 % de descuento en Churus
                        </h2>
                        <UIButton
                            variant="secondary"
                            size="L"
                            iconRight={<IconOutlet color="var(--b-n-blanco-color)" />}
                            onClick={verProductos}
                        >
                            Ver productos
                        </UIButton>
                    </div>
                    <div className="hero-tienda__productos-imagen" aria-hidden="true">
                        <img src={bannerChuruProducts} alt="" />
                    </div>
                    <div className="hero-tienda__gatito-imagen" aria-hidden="true">
                        <img src={bannerKitten} alt="" />
                    </div>
                </div>
            </div>
            <nav className="hero-tienda__categorias" aria-label="Categorías de productos">
                <ul className="hero-tienda__lista-categorias">
                    {categories.map((category) => (
                        <li className="hero-tienda__categoria" key={category.label}>
                            <Link className="hero-tienda__categoria-enlace" to={category.href}>
                                <img
                                    className={`hero-tienda__categoria-imagen${category.contain ? " hero-tienda__categoria-imagen--contain" : ""}`}
                                    src={category.image}
                                    alt=""
                                />
                                <span className="hero-tienda__categoria-etiqueta">
                                    {category.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </section>
    );
}
