import { useEffect, useState } from "react";
import type { Categoria, ProductoOferta } from "../../TDATypes";
import HomeCategories from "./HomeDivisions/HomeCategories";
import HomeHero from "./HomeDivisions/HomeHero";
import HomeOffers from "./HomeDivisions/HomeOffers";
import HomePetloveTeam from "./HomeDivisions/HomePetLoveTeam";
import {
    adaptarProductoOferta,
    obtenerCategorias,
    obtenerOfertas,
} from "../../services/catalogo";

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
                const data = await obtenerCategorias(controller.signal);
                setCategorias(data);
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("No se pudieron cargar las categorías.", error);
                    setErrorCategorias(
                        error instanceof Error ? error.message : "No se pudieron cargar las categorías.",
                    );
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
                const data = await obtenerOfertas({}, controller.signal);
                setProductosOferta(data.map(adaptarProductoOferta));
            } catch (error) {
                if (!controller.signal.aborted) {
                    console.error("No se pudieron cargar las ofertas.", error);
                    setErrorOfertas(
                        error instanceof Error ? error.message : "No se pudieron cargar las ofertas.",
                    );
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
            <HomeHero />
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