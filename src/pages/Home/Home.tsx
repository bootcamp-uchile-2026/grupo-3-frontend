import { useEffect, useState } from "react";
import { z } from "zod";
import type { Categoria, ProductoOferta } from "../../TDATypes";
import HomeCategories from "./HomeDivisions/HomeCategories";
import HomeHero from "./HomeDivisions/HomeHero";
import HomeOffers from "./HomeDivisions/HomeOffers";
import HomePetloveTeam from "./HomeDivisions/HomePetLoveTeam";

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

const categoriasSchema = z.array(
    z.object({
        id: z.string(),
        nombre: z.string(),
        imagen: z.string(),
        ruta: z.string(),
    }).catchall(z.unknown()),
);

const productosOfertaSchema = z.array(
    z.object({
        id: z.string(),
        nombre: z.string(),
        precio: z.number(),
        precioOriginal: z.number(),
        imagenes: z.array(z.string()).min(1),
        categoria: z.string(),
        calificacionPromedio: z.number().min(0).max(5).optional(),
    }).catchall(z.unknown()),
);

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
                const resultado = categoriasSchema.safeParse(data);
                if (!resultado.success) {
                    throw new Error("La respuesta de categorías tiene un formato inválido.");
                }

                setCategorias(resultado.data);
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
                const resultado = productosOfertaSchema.safeParse(data);
                if (!resultado.success) {
                    throw new Error("La respuesta de ofertas tiene un formato inválido.");
                }

                setProductosOferta(resultado.data);
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