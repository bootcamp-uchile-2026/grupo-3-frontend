import { NavLink } from "react-router-dom";
import gatoIcon from "../../../assets/Icons/cat.svg";
import perroIcon from "../../../assets/Icons/dog.svg";
import exoticosIcon from "../../../assets/Icons/paw.svg";
import flechaIcon from "../../../assets/Icons/chevron-right.svg";

type ItemMenu = { label: string; sub?: boolean };
type GrupoMenu = { titulo: string; icon: string; items: ItemMenu[] };

const GRUPOS: GrupoMenu[] = [
  {
    titulo: "Gato",
    icon: gatoIcon,
    items: [
      { label: "Alimentos y Snack", sub: true },
      { label: "Higiene y Cuidado", sub: true },
      { label: "Accesorios", sub: true },
      { label: "Farmacia", sub: true },
      { label: "Arenas y Areneros" },
      { label: "Outlet" },
    ],
  },
  {
    titulo: "Perro",
    icon: perroIcon,
    items: [
      { label: "Alimentos y Snack", sub: true },
      { label: "Salud y Bienestar", sub: true },
      { label: "Accesorios", sub: true },
      { label: "Farmacia", sub: true },
      { label: "Outlet" },
    ],
  },
  {
    titulo: "Exóticos",
    icon: exoticosIcon,
    items: [
      { label: "Aves", sub: true },
      { label: "Reptiles", sub: true },
      { label: "Roedores", sub: true },
      { label: "Conejos", sub: true },
      { label: "Hurones", sub: true },
    ],
  },
];

const slug = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

const mascara = (src: string) => ({
  maskImage: `url("${src}")`,
  WebkitMaskImage: `url("${src}")`,
});

export function MegaMenuCategorias() {
 return (
    <div className="mega-menu" aria-label="Categorías">
      <div className="mega-menu-grid">
        {GRUPOS.map((grupo) => (
          <section key={grupo.titulo} className="mega-col">
            <h3 className="mega-titulo">
              <span className="mega-icono" aria-hidden="true" style={mascara(grupo.icon)} />
              {grupo.titulo}
            </h3>

            <ul>
              {grupo.items.map((item) => (
                <li key={item.label}>
                  <NavLink to={`/categoria/${slug(grupo.titulo)}/${slug(item.label)}`}>
                    <span>{item.label}</span>
                    {item.sub && (
                      <span className="mega-chevron" aria-hidden="true" style={mascara(flechaIcon)} />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}