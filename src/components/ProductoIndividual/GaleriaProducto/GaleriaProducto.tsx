import { useState } from "react";

type GaleriaProductoProps = {
    nombre: string;
    imagenes: string[];
};

const imagenPlaceholder = "https://placehold.co/600x600?text=Sin+imagen";

export function GaleriaProducto({ nombre, imagenes }: GaleriaProductoProps) {
    const imagenesDisponibles = imagenes.filter(Boolean);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(imagenesDisponibles[0] ?? "");
    const imagenActual = imagenesDisponibles.includes(imagenSeleccionada)
        ? imagenSeleccionada
        : imagenesDisponibles[0];

    return (
        <div className="galeria-producto">
            <div className="galeria-producto__principal">
                <img
                    src={imagenActual || imagenPlaceholder}
                    alt={imagenActual ? nombre : `Imagen no disponible para ${nombre}`}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = imagenPlaceholder;
                    }}
                />
            </div>
            {imagenesDisponibles.length > 1 && (
                <div className="galeria-producto__miniaturas" aria-label="Imágenes del producto">
                    {imagenesDisponibles.map((imagen, index) => (
                        <button
                            key={`${imagen}-${index}`}
                            type="button"
                            className={`galeria-producto__miniatura${imagen === imagenActual ? " is-selected" : ""}`}
                            aria-label={`Ver imagen ${index + 1} de ${imagenesDisponibles.length}`}
                            aria-pressed={imagen === imagenActual}
                            onClick={() => setImagenSeleccionada(imagen)}
                        >
                            <img src={imagen} alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
