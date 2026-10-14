import { useState } from "react";

type FiltroOption = {
  label: string;
  name: string;
  options: { value: string; text: string }[];
};

const filtrosConfig: FiltroOption[] = [
  {
    label: "Categoría:",
    name: "categoria",
    options: [
      { value: "", text: "Todas" },
      { value: "perros", text: "Perros" },
      { value: "gatos", text: "Gatos" },
      { value: "aves", text: "Aves" },
      { value: "peces", text: "Peces" },
    ],
  },
  {
    label: "Precio:",
    name: "precio",
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
    options: [
      { value: "", text: "Todas" },
      { value: "marca1", text: "Marca 1" },
      { value: "marca2", text: "Marca 2" },
      { value: "marca3", text: "Marca 3" },
    ],
  },
];

export function FiltroProducto() {
  const [edad, setEdad] = useState(2);

  return (
    <div className="filtro">
      <h2>Filtros</h2>
      <div className="filtro-opciones">
        <form id="filtro-form" method="get">
          {filtrosConfig.map((filtro) => (
            <div key={filtro.name}>
              <label htmlFor={filtro.name}>{filtro.label}</label>
              <select id={filtro.name} name={filtro.name}>
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
            name="edad"
            type="range"
            min="0"
            max="25"
            value={edad}
            onChange={(e) => setEdad(Number(e.target.value))}
          />
          <span>{edad} años</span>

          <button type="submit">Aplicar filtros</button>
        </form>
      </div>
    </div>
  );
}