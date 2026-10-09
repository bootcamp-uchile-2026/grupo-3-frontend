import { NavLink } from "react-router-dom";
import {Header} from "../layout/Header";
import {Footer } from "../layout/Footer";
import { CardProducto } from "../components/CardProducto";
import { FiltroProducto } from "./FiltroProducto";
import { Hero } from "../components/Hero";

type Producto = {
    idProducto: string;
    titulo: string;
    urlImagen: string;
    precio: number;
    categoria: string;
    rating?: number;
    badge?: string;
    descuento?: number;
};

type CategoriaProductosProps = {
  productos: Producto[];
};


export default function CategoriaProductos({ productos }: CategoriaProductosProps) {
  return (
    <>
      <Header 
        logoSrc="/assets/images/logo-petlove.svg"
        logoAlt="Petlove"
        accountIconSrc="/assets/icons/user.svg"
        cartIconSrc="/assets/icons/cart.svg"
      />

      <main>
        {/* aca el Hero */}
        <Hero
          imageSrc="https://placehold.co/1920x600"
          title="Categoría"
        />

        {/* aca los Filtros */}
        <section className="container filtro-productos">
          <div className="orden-productos">
            <select name="ordenar-productos" id="ordenar-productos">
              <option value="popularidad">Orden: Popularidad</option>
              <option value="precio-desc">Orden precio: Mayor a Menor</option>
              <option value="precio-asc">Orden precio: Menor a Mayor</option>
            </select>
          </div>

          {/*aca FiltroProducto */}
          <FiltroProducto />

          {/* Lista de productos */}
          <div className="productos-lista">
            {productos.map((producto) => (
              <CardProducto key={producto.idProducto} {...producto} />
            ))}
          </div>

          <div className="ver-mas-categoria">
            <button>Mostrar más</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}