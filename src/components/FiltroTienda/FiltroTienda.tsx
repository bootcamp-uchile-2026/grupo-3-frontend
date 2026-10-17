import { subcategoriasMascota } from './subcategoriasMascota';

export type FiltroClave =
  | 'mascota'
  | 'tipoProducto'
  | 'edad'
  | 'tipoComida'
  | 'sabor'
  | 'formato'
  | 'material'
  | 'marca';

export type SeleccionesFiltro = Record<FiltroClave, string[]>;

type OpcionFiltro = { valor: string; etiqueta: string };

type GrupoFiltro = {
  clave: FiltroClave;
  titulo: string;
  opciones: OpcionFiltro[];
};

type FiltroTiendaProps = {
  selecciones: SeleccionesFiltro;
  onSelectionChange: (clave: FiltroClave, valor: string, seleccionado: boolean) => void;
  onClear: () => void;
};

const gruposFiltro: GrupoFiltro[] = [
  {
    clave: 'mascota',
    titulo: 'Tipo de mascota',
    opciones: [
      { valor: 'Gato', etiqueta: 'Gato' },
      { valor: 'Perro', etiqueta: 'Perro' },
      { valor: 'Periquito', etiqueta: 'Periquito' },
      { valor: 'Canario', etiqueta: 'Canario' },
      { valor: 'Loro', etiqueta: 'Loro' },
      { valor: 'Ninfa', etiqueta: 'Ninfa' },
      { valor: 'Agapornis', etiqueta: 'Agapornis' },
      { valor: 'Tortuga', etiqueta: 'Tortuga' },
      { valor: 'Gecko', etiqueta: 'Gecko' },
      { valor: 'Serpiente', etiqueta: 'Serpiente' },
      { valor: 'Dragón barbudo', etiqueta: 'Dragón barbudo' },
      { valor: 'Iguana', etiqueta: 'Iguana' },
      { valor: 'Hámster', etiqueta: 'Hámster' },
      { valor: 'Cobaya (Cuy)', etiqueta: 'Cobaya (Cuy)' },
      { valor: 'Rata', etiqueta: 'Rata' },
      { valor: 'Ratón', etiqueta: 'Ratón' },
      { valor: 'Chinchilla', etiqueta: 'Chinchilla' },
      { valor: 'Conejo', etiqueta: 'Conejo' },
      { valor: 'Hurón', etiqueta: 'Hurón' },
    ],
  },
  {
    clave: 'tipoProducto',
    titulo: 'Tipo de producto',
    opciones: [
      { valor: 'Alimento', etiqueta: 'Alimento' },
      { valor: 'Accesorio', etiqueta: 'Accesorio' },
      { valor: 'Salud', etiqueta: 'Salud' },
      { valor: 'Farmacia', etiqueta: 'Farmacia' },
    ],
  },
  {
    clave: 'edad',
    titulo: 'Edad de la mascota',
    opciones: [
      { valor: 'Adulto', etiqueta: 'Adulto' },
      { valor: 'Senior', etiqueta: 'Senior' },
      { valor: 'En crecimiento', etiqueta: 'En crecimiento' },
    ],
  },
  {
    clave: 'tipoComida',
    titulo: 'Tipo de comida',
    opciones: [
      { valor: 'Húmedo', etiqueta: 'Húmedo' },
      { valor: 'Semihúmedo', etiqueta: 'Semihúmedo' },
      { valor: 'Seco', etiqueta: 'Seco' },
    ],
  },
  {
    clave: 'sabor',
    titulo: 'Sabor de comida',
    opciones: [
      { valor: 'Pollo', etiqueta: 'Pollo' },
      { valor: 'Pescado', etiqueta: 'Pescado' },
      { valor: 'Cerdo', etiqueta: 'Cerdo' },
      { valor: 'Pato', etiqueta: 'Pato' },
      { valor: 'Cordero', etiqueta: 'Cordero' },
    ],
  },
  {
    clave: 'formato',
    titulo: 'Formato de comida',
    opciones: [
      { valor: 'Lata', etiqueta: 'Lata' },
      { valor: 'Saco grande (10kg)', etiqueta: 'Saco grande (10kg)' },
      { valor: 'Saco mediano (5-10kg)', etiqueta: 'Saco mediano (5-10kg)' },
      { valor: 'Saco pequeño (5kg)', etiqueta: 'Saco pequeño (5kg)' },
    ],
  },
  {
    clave: 'material',
    titulo: 'Material',
    opciones: [
      { valor: 'Acero', etiqueta: 'Acero' },
      { valor: 'Cerámica', etiqueta: 'Cerámica' },
      { valor: 'Plástico', etiqueta: 'Plástico' },
      { valor: 'Silicona', etiqueta: 'Silicona' },
    ],
  },
  {
    clave: 'marca',
    titulo: 'Marca',
    opciones: [
      { valor: 'Acana', etiqueta: 'Acana' },
      { valor: 'Royal Canin', etiqueta: 'Royal Canin' },
      { valor: 'Pro plan', etiqueta: 'Pro plan' },
      { valor: 'Taste of the wild', etiqueta: 'Taste of the wild' },
      { valor: 'Brit', etiqueta: 'Brit' },
    ],
  },
];

const especiesDirectas = ['Gato', 'Perro', 'Conejo', 'Hurón'];
function renderizarOpcion(
  grupo: GrupoFiltro,
  opcion: OpcionFiltro,
  selecciones: SeleccionesFiltro,
  onSelectionChange: FiltroTiendaProps['onSelectionChange'],
) {
  return (
    <label key={opcion.valor}>
      <input
        type="checkbox"
        name={grupo.clave}
        value={opcion.valor}
        checked={selecciones[grupo.clave].includes(opcion.valor)}
        onChange={(event) =>
          onSelectionChange(grupo.clave, opcion.valor, event.target.checked)}
      />{' '}
      {opcion.etiqueta}
    </label>
  );
}

export function FiltroTienda({
  selecciones,
  onSelectionChange,
  onClear,
}: FiltroTiendaProps) {
  const grupoMascota = gruposFiltro[0];

  return (
    <div className="filtro">
      <h2>Filtros</h2>
      <div className="filtro-opciones">
        <form id="filtro-form">
          {gruposFiltro.map((grupo) => (
            <details className="filtro-grupo" key={grupo.clave}>
              <summary>{grupo.titulo}</summary>
              {grupo.clave === 'mascota' ? (
                <div className="filtro-opciones-grupo">
                  {grupo.opciones
                    .filter((opcion) => especiesDirectas.includes(opcion.valor))
                    .map((opcion) =>
                      renderizarOpcion(grupo, opcion, selecciones, onSelectionChange))}
                  {subcategoriasMascota.map((subcategoria) => (
                    <details className="filtro-subgrupo" key={subcategoria.titulo}>
                      <summary>{subcategoria.titulo}</summary>
                      <div className="filtro-opciones-grupo">
                        {subcategoria.opciones.map((especie) =>
                          renderizarOpcion(
                            grupoMascota,
                            { valor: especie, etiqueta: especie },
                            selecciones,
                            onSelectionChange,
                          ))}
                      </div>
                    </details>
                  ))}
                </div>
              ) : (
                <div className="filtro-opciones-grupo">
                  {grupo.opciones.map((opcion) =>
                    renderizarOpcion(grupo, opcion, selecciones, onSelectionChange))}
                </div>
              )}
            </details>
          ))}
          <button type="button" onClick={onClear}>
            Resetear filtros
          </button>
        </form>
      </div>
    </div>
  );
}
