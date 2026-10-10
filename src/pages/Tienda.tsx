import { useState } from "react";
import { CardProducto } from "../components/CardProducto";

type Producto = {
  id: number;
  titulo: string;
  urlImagen: string;
  precio: number;
  categoria: string;
  rating?: number;
  badge?: string;
  descuento?: number;
};

type TiendaProps = {
  productos: Producto[];
};

export default function Tienda({ productos }: TiendaProps) {
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [marca, setMarca] = useState("");
  const [edad, setEdad] = useState(2);
  const [productosVisibles, setProductosVisibles] = useState(productos);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let filtroProducto = productos;

    console.log({ categoria, precio, marca, edad });
    if (categoria) {
    filtroProducto = filtroProducto.filter(
      (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );
  }

  // Filtrar por rango de precio
  if (precio) {
    const [min, max] = precio.split("-").map(Number);
    filtroProducto = filtroProducto.filter(
      (p) => p.precio >= min && p.precio <= max
    );
  }

  // Filtrar por marca (si tu modelo de producto tiene marca)
  if (marca) {
    filtroProducto = filtroProducto.filter(
      (p) => p.badge?.toLowerCase() === marca.toLowerCase()
    );
  }

  // Filtrar por edad (ejemplo: si descuento depende de edad)
  if (edad) {
    filtroProducto = filtroProducto.filter(
      (p) => !p.descuento || p.descuento <= edad
    );
  }

  console.log("Productos filtrados:", filtroProducto);
  setProductosVisibles(filtroProducto);
  };

  const filtrosConfig = [
    {
      label: "Categoría:",
      name: "categoria",
      value: categoria,
      onChange: setCategoria,
      options: [
        { value: "", text: "Todas" },
        { value: "perros", text: "Perros" },
        { value: "gatos", text: "Gatos" },
        { value: "aves", text: "Aves" },
        { value: "peces", text: "Peces" },
        { value: "exoticos", text: "Exoticos" },
      ],
    },
    {
      label: "Precio:",
      name: "precio",
      value: precio,
      onChange: setPrecio,
      options: [
        { value: "", text: "Todos" },
        { value: "0-50", text: "$0 - $50" },
        { value: "51-100", text: "$51 - $100" },
        { value: "101-200", text: "$101 - $200" },
        { value: "201-500", text: "$201 - $500" },
      ],
    },
    {
      label: "Marca:",
      name: "marca",
      value: marca,
      onChange: setMarca,
      options: [
        { value: "", text: "Todas" },
        { value: "marca1", text: "Marca 1" },
        { value: "marca2", text: "Marca 2" },
        { value: "marca3", text: "Marca 3" },
      ],
    },
  ];

  const clearFiltros = () => {
  setCategoria("");
  setPrecio("");
  setMarca("");
  setEdad(2);
  setProductosVisibles(productos); 
};

  return (
    <>
      <main>
        <section className="container filtro-productos">
          {/* Filtros */}
          <div className="filtro">
            <h2>Filtros</h2>
            <div className="filtro-opciones">
              <form id="filtro-form" onSubmit={handleSubmit}>
                {filtrosConfig.map((filtro) => (
                  <div key={filtro.name}>
                    <label htmlFor={filtro.name}>{filtro.label}</label>
                    <select
                      id={filtro.name}
                      value={filtro.value}
                      onChange={(e) => filtro.onChange(e.target.value)}
                    >
                      {filtro.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.text}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}

                <label htmlFor="edad">Edad:</label>
                <input
                  id="edad"
                  type="range"
                  min="0"
                  max="25"
                  value={edad}
                  onChange={(e) => setEdad(Number(e.target.value))}
                />
                <span>{edad} años</span>

                <button type="submit">Aplicar filtros</button>
                 <button type="button" onClick={clearFiltros}>
                    Limpiar filtros
                </button>
              </form>
            </div>
          </div>

          {/* Lista de productos */}
          <div className="productos-lista">
            {productosVisibles.map((producto) => (
              <CardProducto key={producto.id} {...producto} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}