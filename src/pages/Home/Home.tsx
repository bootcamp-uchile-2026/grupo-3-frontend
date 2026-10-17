import { useEffect, useState } from "react";
import type { Categoria, ProductoOferta } from "../../TDATypes";
import HomeCategories from "./HomeDivisions/HomeCategories";
import HomeOffers from "./HomeDivisions/HomeOffers";
import HomePetloveTeam from "./HomeDivisions/HomePetLoveTeam";

const urlPetLoveTeamImages = [
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
    "https://placehold.co/400x400",
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
        <>
            <section>
                <HomeCategories isLoading={cargandoCategorias} errorMessage={errorCategorias} categories={categorias}/>
            </section>
            <section id="hero">
                <div className="slider">
                    <div className="slide">
                        <img src="https://placehold.co/1920x600" alt="Slide 1" />
                        <button className="btn-slide">Registra tu Mascota</button>
                    </div>
                </div>
            </section>
            <section>
                <HomeOffers isLoading={cargandoOfertas} errorMessage={errorOfertas} offers={productosOferta} visibleOffersAmount={cantidadOfertasVisibles} setVisibleOffersAmount={setCantidadOfertasVisibles}/>
            </section>
            <section>
                <HomePetloveTeam title={"¡Conoce a la familia PetLove!"} urlImages={urlPetLoveTeamImages}/>
            </section>
        </>
    )
}