import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Categoria, ProductoOferta } from "../../TDATypes";
import { UIKitIcon } from "../../components/UIKit/UIIcons/UIKitIcon";
import HomeCategories from "./HomeDivisions/HomeCategories";
import HomeOffers from "./HomeDivisions/HomeOffers";
import HomePetloveTeam from "./HomeDivisions/HomePetLoveTeam";

const heroAnimals = new URL("../../assets/Home/hero-animals.png", import.meta.url).href;
const petBird = new URL("../../assets/Home/pet-bird.jpg", import.meta.url).href;
const petCat = new URL("../../assets/Home/pet-cat.png", import.meta.url).href;
const petDog = new URL("../../assets/Home/pet-dog.jpg", import.meta.url).href;
const petFerret = new URL("../../assets/Home/pet-ferret.png", import.meta.url).href;

const petLoveTeamImages = [
    { url: petCat, alt: "Gato de la familia PetLove" },
    { url: petBird, alt: "Ave de la familia PetLove" },
    { url: petFerret, alt: "Hurón de la familia PetLove" },
    { url: petDog, alt: "Perro de la familia PetLove" },
]

function esCategoria(value: unknown): value is Categoria {
    return typeof value === "object" && value !== null
        && "id" in value && typeof value.id === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "imagen" in value && typeof value.imagen === "string"
        && "ruta" in value && typeof value.ruta === "string";
}


function esProductoOferta(value: unknown): value is ProductoOferta {
    return typeof value === "object" && value !== null
        && "id" in value && typeof value.id === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "precio" in value && typeof value.precio === "number"
        && "precioOriginal" in value && typeof value.precioOriginal === "number"
        && "imagenes" in value && Array.isArray(value.imagenes)
        && value.imagenes.length > 0 && value.imagenes.every((imagen) => typeof imagen === "string")
        && "categoria" in value && typeof value.categoria === "string";
}

export function Home() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [cargandoCategorias, setCargandoCategorias] = useState(true);
    const [errorCategorias, setErrorCategorias] = useState<string | null>(null);
    const [productosOferta, setProductosOferta] = useState<ProductoOferta[]>([]);
    const [cargandoOfertas, setCargandoOfertas] = useState(true);
    const [errorOfertas, setErrorOfertas] = useState<string | null>(null);
    const [cantidadOfertasVisibles, setCantidadOfertasVisibles] = useState(4);

    useEffect(() => {
        const controller = new AbortController();

        async function cargarCategorias() {
            try {
                const response = await fetch(
                    "http://18.226.214.170:3000/api/v1/catalogo/categorias",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Error al cargar categorías: ${response.status}`);
                }

                const data: unknown = await response.json();
                if (!Array.isArray(data) || !data.every(esCategoria)) {
                    throw new Error("La respuesta de categorías tiene un formato inválido.");
                }

                setCategorias(data);
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("No se pudieron cargar las categorías.", error);
                    setErrorCategorias("No se pudieron cargar las categorías.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargandoCategorias(false);
                }
            }
        }

        void cargarCategorias();

        return () => controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        async function cargarOfertas() {
            try {
                const response = await fetch(
                    "http://18.226.214.170:3000/api/v1/catalogo/productos/ofertas",
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Error al cargar ofertas: ${response.status}`);
                }

                const data: unknown = await response.json();
                if (!Array.isArray(data) || !data.every(esProductoOferta)) {
                    throw new Error("La respuesta de ofertas tiene un formato inválido.");
                }

                setProductosOferta(data);
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("No se pudieron cargar las ofertas.", error);
                    setErrorOfertas("No se pudieron cargar las ofertas.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargandoOfertas(false);
                }
            }
        }

        void cargarOfertas();

        return () => controller.abort();
    }, []);

    return (
        <div className="home">
            <section className="home__hero" aria-labelledby="home-hero-title">
                <div className="home__hero-content">
                    <h1 className="home__hero-title" id="home-hero-title">
                        Conozcamos<br />a tu mascota
                    </h1>
                    <p className="home__hero-description">
                        Crea su perfil y acompáñala en cada etapa
                    </p>
                    <Link className="home__hero-cta" to="/mi-perfil/perfil-mascota">
                        <span>Registrar a mi mascota</span>
                        <UIKitIcon name="Paw" size={20} aria-hidden="true" />
                    </Link>
                </div>
                <img className="home__hero-image" src={heroAnimals} alt="Perros, gatos y otras mascotas" />
            </section>
            <section className="home__categories" aria-label="Categorías destacadas">
                <HomeCategories isLoading={cargandoCategorias} errorMessage={errorCategorias} categories={categorias} />
            </section>
            <section className="home__offers">
                <HomeOffers
                    isLoading={cargandoOfertas}
                    errorMessage={errorOfertas}
                    offers={productosOferta}
                    visibleOffersAmount={cantidadOfertasVisibles}
                    setVisibleOffersAmount={setCantidadOfertasVisibles}
                />
            </section>
            <section className="home__family">
                <HomePetloveTeam title="¡Conoce a la familia PetLove!" images={petLoveTeamImages} />
            </section>
        </div>
    )
}