import { useState } from "react";
import type { ProductoOferta } from "../../../TDATypes";
import type { Dispatch, SetStateAction } from "react";
import { UIProductCard } from "../../../components/UIKit/UIProductCard";
import { useCarritoStore } from "../../../store/carritoStore";

type HomeOffersProps = {
    isLoading: boolean;
    errorMessage: string | null;
    offers: ProductoOferta[];
    visibleOffersAmount: number;
    setVisibleOffersAmount: Dispatch<SetStateAction<number>>;
};

type CartStatus = "idle" | "loading" | "added" | "error";

type HomeOfferCardProps = {
    product: ProductoOferta;
    discountPercentage: number;
};

function formatPrice(price: number): string {
    return new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    }).format(price);
}

function HomeOfferCard({ product, discountPercentage }: HomeOfferCardProps) {
    const agregarProducto = useCarritoStore((state) => state.agregarProducto);
    const [cartStatus, setCartStatus] = useState<CartStatus>("idle");

    async function addToCart() {
        setCartStatus("loading");
        try {
            await agregarProducto({ productoId: product.id, cantidad: 1 });
            setCartStatus("added");
        } catch (error) {
            console.error("No se pudo agregar el producto al carrito.", error);
            setCartStatus("error");
        }
    }

    return (
        <div>
            <UIProductCard
                imageSrc={product.imagenes[0]}
                imageAlt={product.nombre}
                name={product.nombre}
                price={formatPrice(product.precio)}
                rating={product.calificacionPromedio}
                productTo={`/producto-individual/${encodeURIComponent(product.id)}`}
                discountPercentage={discountPercentage > 0 ? discountPercentage : undefined}
                buttonLabel={cartStatus === "loading"
                    ? "Agregando..."
                    : cartStatus === "added"
                        ? "Agregado"
                        : "Agregar al carrito"}
                loading={cartStatus === "loading"}
                selected={cartStatus === "added"}
                onAddToCart={addToCart}
            />
            {cartStatus === "added" && (
                <p role="status">Producto agregado al carrito.</p>
            )}
            {cartStatus === "error" && (
                <p role="alert">No se pudo agregar el producto. Inténtalo nuevamente.</p>
            )}
        </div>
    );
}

function HomeOffers({
    isLoading,
    errorMessage,
    offers,
    visibleOffersAmount,
    setVisibleOffersAmount,
}: HomeOffersProps) {
    return (
        <div className="home__offers-inner">
            <h2 className="home__section-title">Ofertas</h2>
            <div className="home__offers-grid">
                {isLoading && <p role="status">Cargando ofertas...</p>}
                {errorMessage && <p role="alert">{errorMessage}</p>}
                {!isLoading && !errorMessage && offers.length === 0 && (
                    <p>No hay ofertas disponibles.</p>
                )}
                {offers.slice(0, visibleOffersAmount).map((producto) => {
                    const porcentajeDescuento = producto.precioOriginal > producto.precio
                        ? Math.round((producto.precioOriginal - producto.precio) / producto.precioOriginal * 100)
                        : 0;

                    return (
                        <HomeOfferCard
                            key={producto.id}
                            product={producto}
                            discountPercentage={porcentajeDescuento}
                        />
                    );
                })}
            </div>
            {offers.length > visibleOffersAmount && (
                <div className="home__offers-more">
                    <button
                        type="button"
                        onClick={() => setVisibleOffersAmount((cantidadActual) => cantidadActual + 4)}
                    >
                        Ver más
                    </button>
                </div>
            )}
        </div>
    );
}

export default HomeOffers;