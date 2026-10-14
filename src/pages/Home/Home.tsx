import { useEffect, useState } from "react";

import { CardCategoria } from "../../components/CardCategoria/CardCategoria"
import { CardPetLove } from "../../components/CardPetLove/CardPetLove"
import { CardProducto } from "../../components/CardProducto/CardProducto"

type Categoria = {
    id: string;
    nombre: string;
    imagen: string;
    ruta: string;
};

function esCategoria(value: unknown): value is Categoria {
    return typeof value === "object" && value !== null
        && "id" in value && typeof value.id === "string"
        && "nombre" in value && typeof value.nombre === "string"
        && "imagen" in value && typeof value.imagen === "string"
        && "ruta" in value && typeof value.ruta === "string";
}

type ProductoOferta = {
    id: string;
    nombre: string;
    precio: number;
    precioOriginal: number;
    imagenes: string[];
    categoria: string;
};

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
                <div className="container">
                    <div className="categorias-home">
                        {cargandoCategorias && <p role="status">Cargando categorías...</p>}
                        {errorCategorias && <p role="alert">{errorCategorias}</p>}
                        {categorias.map((categoria) => (
                            <CardCategoria
                                key={categoria.id}
                                titulo={categoria.nombre}
                                urlImagen={categoria.imagen}
                                urlLink={categoria.ruta}
                            />
                        ))}
                    </div>
                </div>
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
                <div className="container">
                    <h2 className="titulo-seccion">Ofertas</h2>
                    <div className="productos-ofertas">
                        {cargandoOfertas && <p role="status">Cargando ofertas...</p>}
                        {errorOfertas && <p role="alert">{errorOfertas}</p>}
                        {!cargandoOfertas && !errorOfertas && productosOferta.length === 0 && (
                            <p>No hay ofertas disponibles.</p>
                        )}
                        {productosOferta.slice(0, cantidadOfertasVisibles).map((producto) => (
                            <CardProducto
                                key={producto.id}
                                id={producto.id}
                                titulo={producto.nombre}
                                urlImagen={producto.imagenes[0]}
                                precio={producto.precio}
                                precioOriginal={producto.precioOriginal}
                                categoria={producto.categoria}
                            />
                        ))}
                    </div>
                    {productosOferta.length > cantidadOfertasVisibles && (
                        <div className="ver-mas">
                            <button onClick={() => setCantidadOfertasVisibles((cantidadActual) => cantidadActual + 4)}>
                                Mostrar más
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <section>
                <div className="container">
                    <h2 className="titulo-seccion titulo-center">¡Conoce a la familia PetLove!</h2>
                    <div className="petlove-cards">
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                        <CardPetLove urlImagen="https://placehold.co/400x400" />
                    </div>
                </div>
            </section>
        </>
    )
}