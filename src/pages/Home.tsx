import { CardCategoria } from "../components/CardCategoria";
import { CardProducto } from "../components/CardProducto";
import { Hero } from "../components/Hero";
import {Link} from "react-router-dom";

export function Home() {

     const categorias = [
    { titulo: "Categoría 1", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
    { titulo: "Categoría 2", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
    { titulo: "Categoría 3", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
    { titulo: "Categoría 4", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
    { titulo: "Categoría 5", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
    { titulo: "Categoría 6", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
    { titulo: "Categoría 7", urlImagen: "https://placehold.co/250x250", urlLink: "/categoria/categoria-productos.html" },
  ];

  const ofertas = [
    { titulo: "Producto 1", urlImagen: "https://placehold.co/400x400", precio: 50, categoria: "Categoría 1" },
    { titulo: "Producto 2", urlImagen: "https://placehold.co/400x400", precio: 75, categoria: "Categoría 2" },
    { titulo: "Producto 3", urlImagen: "https://placehold.co/400x400", precio: 100, categoria: "Categoría 3" },
    { titulo: "Producto 4", urlImagen: "https://placehold.co/400x400", precio: 125, categoria: "Categoría 4" },
  ];

    return (
    <>
      {/* Hero.tsx */}
      <Hero
        imageSrc="https://placehold.co/1920x600"
        title="Cómprale lo mejor en un solo lugar"
        buttons={[
          { text: "Ver productos", to: "/tienda" },
          { text: "Nuestra clínica", to: "/clinica" },
        ]}
      />

      {/* Categorías */}
      <section>
        <div className="container categorias-home">
          {categorias.map((cat, i) => (
            <CardCategoria key={i} {...cat} />
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section>
        <div className="container">
          <h2 className="titulo-seccion">Ofertas</h2>
          <div className="productos-ofertas">
            {ofertas.map((prod, i) => (
              <CardProducto key={i} {...prod} />
            ))}
          </div>
          <div className="ver-mas">
            <button>Mostrar más</button>
          </div>
        </div>
      </section>

      {/* Perfil mascota */}
      <section>
        <div className="container">
          <h2 className="titulo-seccion">Perfil personalizado de la mascota</h2>
        </div>
        <div className="banner">
          <img src="https://placehold.co/1920x800" alt="Banner" />
          <div className="banner-content">
            <Link to="/mi-perfil">
              <button>Registrar tu mascota</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}