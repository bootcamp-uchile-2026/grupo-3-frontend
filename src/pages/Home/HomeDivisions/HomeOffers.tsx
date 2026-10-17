import type { ProductoOferta } from "../../../TDATypes";
import type { Dispatch, SetStateAction } from 'react';
import { CardProducto } from "../../../components/CardProducto/CardProducto";

type HomeOffersProps = {
    isLoading: boolean,
    errorMessage: string | null,
    offers: ProductoOferta[],
    visibleOffersAmount: number,
    setVisibleOffersAmount: Dispatch<SetStateAction<number>>;
};

function HomeOffers( { isLoading, errorMessage, offers, visibleOffersAmount, setVisibleOffersAmount  }:HomeOffersProps) {
    return (
        <>
            <div className="container">
                <h2 className="titulo-seccion">Ofertas</h2>
                <div className="productos-ofertas">
                    {isLoading && <p role="status">Cargando ofertas...</p>}
                    {errorMessage && <p role="alert">{errorMessage}</p>}
                    {!isLoading && !errorMessage && offers.length === 0 && (
                        <p>No hay ofertas disponibles.</p>
                    )}
                    {offers.slice(0, visibleOffersAmount).map((producto) => (
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
                {offers.length > visibleOffersAmount && (
                    <div className="ver-mas">
                        <button onClick={() => setVisibleOffersAmount((cantidadActual) => cantidadActual + 4)}>
                            Mostrar más
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default HomeOffers;