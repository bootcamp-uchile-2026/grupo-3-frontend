import { CardProducto } from "../components/CardProducto/CardProducto";
import { FiltroTienda } from "../components/FiltroTienda/FiltroTienda";
import { HeroTienda } from "../components/HeroTienda/HeroTienda";
import { OrdenTienda } from "../components/OrdenTienda/OrdenTienda";

export function Tienda() {

    return (
        <>
            <section>
                <HeroTienda />
            </section>
            <section>
                <div className="container filtro-productos">
                    <OrdenTienda />
                    <FiltroTienda />
                    <div className="productos-lista">
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                        <CardProducto
                            titulo="Producto 1"
                            urlImagen="https://placehold.co/400x400"
                            precio={50}
                            categoria="Categoría 1"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
