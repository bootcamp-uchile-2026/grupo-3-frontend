import type { FormEvent } from 'react';

type CampoFiltro = 'categoria' | 'precio' | 'marca';

type FiltroTiendaProps = {
  categoria: string;
  precio: string;
  marca: string;
  edad: number;
  onCategoriaChange: (value: string) => void;
  onPrecioChange: (value: string) => void;
  onMarcaChange: (value: string) => void;
  onEdadChange: (value: number) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClear: () => void;
};

const filtrosSelect: Array<{
  label: string;
  name: CampoFiltro;
  options: Array<{ value: string; text: string }>;
}> = [
  {
    label: 'Categoría:',
    name: 'categoria',
    options: [
      { value: '', text: 'Todas' },
      { value: 'perros', text: 'Perros' },
      { value: 'gatos', text: 'Gatos' },
      { value: 'aves', text: 'Aves' },
      { value: 'peces', text: 'Peces' },
      { value: 'exoticos', text: 'Exóticos' },
    ],
  },
  {
    label: 'Precio:',
    name: 'precio',
    options: [
      { value: '', text: 'Todos' },
      { value: '0-50', text: '$0 - $50' },
      { value: '51-100', text: '$51 - $100' },
      { value: '101-200', text: '$101 - $200' },
      { value: '201-500', text: '$201 - $500' },
    ],
  },
  {
    label: 'Marca:',
    name: 'marca',
    options: [
      { value: '', text: 'Todas' },
      { value: 'marca1', text: 'Marca 1' },
      { value: 'marca2', text: 'Marca 2' },
      { value: 'marca3', text: 'Marca 3' },
    ],
  },
];

export function FiltroTienda({
  categoria,
  precio,
  marca,
  edad,
  onCategoriaChange,
  onPrecioChange,
  onMarcaChange,
  onEdadChange,
  onSubmit,
  onClear,
}: FiltroTiendaProps) {
  const valores = { categoria, precio, marca };
  const cambios = {
    categoria: onCategoriaChange,
    precio: onPrecioChange,
    marca: onMarcaChange,
  };

  return (
    <div className="filtro">
      <h2>Filtros</h2>
      <div className="filtro-opciones">
        <form id="filtro-form" onSubmit={onSubmit}>
          {filtrosSelect.map((filtro) => (
            <div key={filtro.name}>
              <label htmlFor={filtro.name}>{filtro.label}</label>
              <select
                id={filtro.name}
                value={valores[filtro.name]}
                onChange={(event) => cambios[filtro.name](event.target.value)}
              >
                {filtro.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
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
            onChange={(event) => onEdadChange(Number(event.target.value))}
          />
          <span>{edad} años</span>

          <button type="submit">Aplicar filtros</button>
          <button type="button" onClick={onClear}>
            Limpiar filtros
          </button>
        </form>
      </div>
    </div>
  );
}
