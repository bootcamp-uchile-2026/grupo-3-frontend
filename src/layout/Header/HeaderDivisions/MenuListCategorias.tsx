<<<<<<< HEAD
import { UIMenuGroup } from "../../../components/UIKit/UIMenuGroup/UIMenuGroup";
import { UIMenuItem } from "../../../components/UIKit/UIMenuItem/UIMenuItem";
import gatoIcon from "../../../assets/Icons/cat.svg";
import perroIcon from "../../../assets/Icons/dog.svg";
import exoticosIcon from "../../../assets/Icons/paw.svg";
=======
import { NavLink } from "react-router-dom";
import gatoIcon from "../../../assets/Icons/cat.svg";
import perroIcon from "../../../assets/Icons/dog.svg";
import exoticosIcon from "../../../assets/Icons/paw.svg";
import flechaIcon from "../../../assets/Icons/chevron-right.svg";
>>>>>>> develop

type ItemMenu = { label: string; subitems?: string[] };
type GrupoMenu = { titulo: string; icon: string; items: ItemMenu[] };

const GRUPOS: GrupoMenu[] = [
  {
    titulo: "Gato",
    icon: gatoIcon,
    items: [
      { label: "Alimentos y Snack", subitems: ["Alimentos húmedos", "Alimentos secos", "Snack"] },
      { label: "Higiene y Cuidado", subitems: ["Higiene", "Anti-estrés", "Pelos y uñas", "Limpieza del hogar"] },
      { label: "Accesorios", subitems: ["Camas y rascadores", "Transporte y seguridad", "Platos y bebederos", "Vestuario", "Juguetes"] },
      { label: "Farmacia", subitems: ["Antiparasitarios", "Internos", "Externos", "Medicamentos", "Vitaminas y Suplementos"] },
      { label: "Arenas y Areneros" },
      { label: "Outlet" },
    ],
  },
  {
    titulo: "Perro",
    icon: perroIcon,
    items: [
      { label: "Alimentos y Snack", subitems: ["Alimentos húmedos", "Alimentos secos", "Snack"] },
      { label: "Salud y Bienestar", subitems: ["Higiene", "Anti-estrés", "Pelos y uñas", "Limpieza del hogar"] },
      { label: "Accesorios", subitems: ["Camas", "Transporte y seguridad", "Platos y bebederos", "Vestuario", "Juguetes"] },
      { label: "Farmacia", subitems: ["Antiparasitarios", "Internos", "Externos", "Medicamentos", "Vitaminas y Suplementos"] },
      { label: "Outlet" },
    ],
  },
  {
    titulo: "Exóticos",
    icon: exoticosIcon,
    items: [
<<<<<<< HEAD
      { label: "Aves", subitems: ["Alimentos", "Periquitos", "Canarios", "Ninfas", "Agarponis", "Loros", "Jaulas y Accesorios", "Juguetes y Enriquecimiento"] },
=======
      { label: "Aves", subitems: ["Alimentos", "Periquitos", "Canarios", "Ninfas", "Agarponis", "Loros", "Jaulas y Accesorios", "Juguetes y Enriquecimiento" ] },
>>>>>>> develop
      { label: "Reptiles", subitems: ["Alimentos", "Tortugas", "Geckos", "Dragones Barbudos", "Iguanas", "Serpientes", "Terrarios y Accesorios"] },
      { label: "Roedores", subitems: ["Alimentos", "Hámsters", "Cobayos (Cuyes)", "Chinchillas", "Ratas", "Ratones", "Jaulas y Accesorios", "Juguetes y Enriquecimiento"] },
      { label: "Conejos", subitems: ["Alimentos", "Jaulas y Accesorios", "Juguetes y Enriquecimiento"] },
      { label: "Hurones", subitems: ["Alimentos", "Jaulas y Accesorios", "Juguetes y Enriquecimiento"] },
    ],
  },
];

<<<<<<< HEAD
// "Cobayos (Cuyes)" → "cobayos-cuyes", "Exóticos" → "exoticos"
=======
>>>>>>> develop
const slug = (texto: string) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
<<<<<<< HEAD
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function MegaMenuCategorias() {
  return (
    <div className="mega-menu-grid">
      {GRUPOS.map((grupo) => {
        const rutaGrupo = `/categoria/${slug(grupo.titulo)}`;


          return (
          <UIMenuGroup key={grupo.titulo} title={grupo.titulo} iconSrc={grupo.icon}>
            {grupo.items.map((item) => {
              const rutaItem = `${rutaGrupo}/${slug(item.label)}`;

              return (
                <UIMenuItem key={item.label} label={item.label} to={rutaItem}>
                  {item.subitems?.map((sub) => (
                    <UIMenuItem key={sub} label={sub} to={`${rutaItem}/${slug(sub)}`} />
                  ))}
                </UIMenuItem>
              );
            })}
          </UIMenuGroup>
        );
      })}
=======
    .replace(/\s+/g, "-");

const mascara = (src: string) => ({
  maskImage: `url("${src}")`,
  WebkitMaskImage: `url("${src}")`,
});

export function MegaMenuCategorias() {
  return (
    <div className="mega-menu" aria-label="Categorías">
      <div className="mega-menu-grid">
        {GRUPOS.map((grupo) => {
          const rutaGrupo = `/categoria/${slug(grupo.titulo)}`;

          return (
            <section key={grupo.titulo} className="mega-col">
              <h3 className="mega-titulo">
                <span className="mega-icono" aria-hidden="true" style={mascara(grupo.icon)} />
                {grupo.titulo}
              </h3>

              <ul>
                {grupo.items.map((item) => {
                  const rutaItem = `${rutaGrupo}/${slug(item.label)}`;
                  const tieneSub = !!item.subitems?.length;

                  return (
                    <li key={item.label} className={tieneSub ? "con-submenu" : undefined}>
                      <NavLink to={rutaItem} aria-haspopup={tieneSub ? "true" : undefined}>
                        <span>{item.label}</span>
                        {tieneSub && (
                            <svg className="mega-chevron" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="m9 6 6 6-6 6" />
                            </svg>
                            )}
                      </NavLink>

                      {tieneSub && (
                        <div className="submenu">
                          <ul>
                            {item.subitems!.map((sub) => (
                              <li key={sub}>
                                <NavLink to={`${rutaItem}/${slug(sub)}`}>{sub}</NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
>>>>>>> develop
    </div>
  );
}