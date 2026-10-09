import { useState } from "react";
import { CardProducto } from "./CardProducto";

interface Producto {
  titulo: string;
  urlImagen: string;
  precio: number;
  categoria: string;
}

interface CarruselProps {
  productos: Producto[];
}

function Carrusel({ productos }: CarruselProps) {
  const [index, setIndex] = useState(0);

  const prevSlide = () => setIndex((prev) => (prev === 0 ? productos.length - 1 : prev - 1));
  const nextSlide = () => setIndex((prev) => (prev === productos.length - 1 ? 0 : prev + 1));

  return (
    <div className="carrusel">
      <button className="slide-left" onClick={prevSlide}>◀</button>
      <div className="slider-productos">
        <CardProducto {...productos[index]} />
      </div>
      <button className="slide-right" onClick={nextSlide}>▶</button>
    </div>
  );
}

export default Carrusel;