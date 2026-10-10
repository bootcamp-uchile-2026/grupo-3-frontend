import "./css/ProductoIndividual.css";
import Tabs from "../components/CardTabs";
import Carrusel from "../components/CardCarrusel";

function ProductoIndividual() {
  return (
    <main>
      <section>
        <div className="container producto-individual">
          <img src="https://placehold.co/200x200" alt="Comedero Elevado" />
          <div className="info-producto-individual">
            <span className="breadcrumbs">
              <button>Home</button>
              <span> -> </span>
              <button>Gatos</button>
              <span> -> </span>
              <button>Accesorios</button>
            </span>
            <h1 className="nombre-producto-individual">Comedero Elevado 450 ml</h1>
            <p className="precio-normal-producto-individual">
              Normal <span className="precio">$4.610</span>
            </p>
            <p className="precio-oferta-producto-individual">
              Oferta Web <span className="precio">$3.690</span>
            </p>
            <p className="descripcion-corta-producto-individual">
              Comedero Elevado estilo gatitos, dale un toque de estilo y ternura a la alimentación de tu mascota...
            </p>
            <div className="botones-producto-individual">
              <button className="agregar-carrito">Agregar al carrito</button>
              <button className="comprar-ahora">Comprar ahora</button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab dinámico */}
      <section>
        <div className="container">
          <Tabs
            tabs={[
              {
                label: "Descripción",
                content: (
                  <p>
                    El comedero elevado estilo gatitos es una opción práctica y encantadora para la alimentación diaria...
                  </p>
                ),
              },
              {
                label: "Formas de entrega",
                content: (
                  <p>
                    Entregas disponibles: despacho a domicilio, retiro en tienda y envíos express.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* Carrusel de productos */}
      <section>
        <div className="container">
          <h2 className="titulo-seccion">Productos Destacados</h2>
          <Carrusel
            productos={[
              { titulo: "Producto 1", urlImagen: "https://placehold.co/200x200", precio: 5000, categoria: "Categoría 1" },
              { titulo: "Producto 2", urlImagen: "https://placehold.co/200x200", precio: 7500, categoria: "Categoría 2" },
              { titulo: "Producto 3", urlImagen: "https://placehold.co/200x200", precio: 10500, categoria: "Categoría 3" },
              { titulo: "Producto 4", urlImagen: "https://placehold.co/200x200", precio: 12000, categoria: "Categoría 4" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}

export default ProductoIndividual;