import { useState, type ReactNode } from "react";

import UIOption from "../../components/UIKit/UIOption/UIOption";
import UIRadio from "../../components/UIKit/UIRadio/UIRadio";
import { UICheckbox } from "../../components/UIKit/UICheckbox/UICheckbox";
import { UIToggle } from "../../components/UIKit/UIToggle/UIToggle";
import { UIFormSelection } from "../../components/UIKit/UIFormSelection/UIFormSelection";
import  UIButton from "../../components/UIKit/UIButton/UIButton";
import { PawIcon, PlusIcon } from "../../components/UIKit/UIButton/ButtonIcons";
import { UIDropdown } from "../../components/UIKit/UIDropdown/UIDropdown";
import { UIKitIcon } from "../../components/UIKit/UIIcons/UIKitIcon";
import { UISearchInput } from "../../components/UIKit/UISearchInput/UISearchInput";
import { UIIconButton } from "../../components/UIKit/UIIconButton/UIIconButton";
import { UIInput } from "../../components/UIKit/UIInput/UIInput";
import { UIBadge } from "../../components/UIKit/UIBadge/UIBadge";
import { UITextLink } from "../../components/UIKit/UITextLink/UITextLink";
import { UILink } from "../../components/UIKit/UILinks/UILinks";
import { UINavItem } from "../../components/UIKit/UINavItem/UINavItem";
import { UILogo } from "../../components/UIKit/UILogo/UILogo";
import { UIMenuItem } from "../../components/UIKit/UIMenuItem/UIMenuItem";
import { UIMenuGroup } from "../../components/UIKit/UIMenuGroup/UIMenuGroup";
import { UISubMenu } from "../../components/UIKit/UISubMenu/UISubMenu";
import { UIStepper } from "../../components/UIKit/UIStepper/UIStepper";
import { UIDropDownPanel } from "../../components/UIKit/UIDropDownPanel/UIDropDownPanel";
import { UIInfoBlock } from "../../components/UIKit/UIInfoBlock/UIInfoBlock";
import { UILinkList } from "../../components/UIKit/UILinkList/UILinkList";
import { UISocialLinks } from "../../components/UIKit/UISocialLinks/UISocialLinks";
import { UIQualification } from "../../components/UIKit/UIQualification/UIQualification";

import userIcon from "../../assets/Icons/user.svg";
import cartIcon from "../../assets/Icons/shopping-cart.svg";
import catIcon from "../../assets/Icons/cat.svg";
import dogIcon from "../../assets/Icons/dog.svg";
import instagramIcon from "../../assets/Icons/instagram.svg";
import tiktokIcon from "../../assets/Icons/tiktok.svg";
import whatsappIcon from "../../assets/Icons/whatsapp.svg";
import facebookIcon from "../../assets/Icons/facebook.svg";


// ======================================
// AUXILIARES DE DOCUMENTACIÓN
// ======================================

/** [nombre, tipo, requerida, por defecto, descripción] */
type PropRow = [string, string, "Sí" | "No", string, string];

function PropsTable({ title, rows }: { title: string; rows: PropRow[] }) {
  return (
    <>
      <h3>{title}</h3>
      <div className="ui-kit-product-card-example__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Requerida</th>
              <th>Por defecto</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([nombre, tipo, requerida, defecto, descripcion]) => (
              <tr key={nombre}>
                <td>{nombre}</td>
                <td>{tipo}</td>
                <td>{requerida}</td>
                <td>{defecto}</td>
                <td>{descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

type DocSectionProps = {
  title: string;
  description: ReactNode;
  children: ReactNode;
  props: { title: string; rows: PropRow[] }[];
  usage: string;
  note?: ReactNode;
};

function DocSection({ title, description, children, props, usage, note }: DocSectionProps) {
  return (
    <section className="ui-kit-pagination-example ui-kit-product-card-example">
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
      {note && <p>{note}</p>}
      <div className="ui-kit-product-card-example__api">
        {props.map((tabla) => (
          <PropsTable key={tabla.title} title={tabla.title} rows={tabla.rows} />
        ))}
        <h3>Uso</h3>
        <pre>
          <code>{usage}</code>
        </pre>
      </div>
    </section>
  );
}

const fila = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px", margin: "16px 0" } as const;
const fondoHeader = { ...fila, padding: "16px", borderRadius: "12px", background: "#FFE9DA" } as const;
const fondoBarra = { ...fila, padding: "10px 16px", borderRadius: "12px", background: "#FFA57E" } as const;
const fondoFooter = { ...fila, alignItems: "flex-start", padding: "24px", borderRadius: "12px", background: "#D5DFBB" } as const;

const IconoMenu = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconoFlecha = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// ======================================
// UISearchInput
// ======================================

function SearchInputExample() {
  const [grande, setGrande] = useState("");
  const [mediano, setMediano] = useState("Alimento");
  const [ultimaBusqueda, setUltimaBusqueda] = useState("");

  return (
    <DocSection
      title="UISearchInput"
      description="Buscador controlado con lupa como botón, botón para borrar y foco visible. Enter o la lupa envían la búsqueda; Escape borra el texto."
      props={[
        {
          title: "Props de UISearchInput",
          rows: [
            ["value", "string", "Sí", "—", "Texto actual (componente controlado)."],
            ["onChange", "(value: string) => void", "Sí", "—", "Se llama con el nuevo texto."],
            ["onSubmit", "(value: string) => void", "No", "—", "Se llama al enviar, con el texto sin espacios sobrantes. No se llama si está vacío."],
            ["placeholder", "string", "No", '"Buscar"', "Texto de ayuda dentro del campo."],
            ["label", "string", "No", '"Buscar"', "Etiqueta para lectores de pantalla (no visible)."],
            ["clearable", "boolean", "No", "true", "Muestra el botón × cuando hay texto."],
            ["size", '"md" | "lg"', "No", '"lg"', "Alto de 40 px o 48 px."],
            ["disabled", "boolean", "No", "false", "Deshabilita el campo y los botones."],
            ["id / name", "string", "No", "auto / \"q\"", "Id del input (se genera si falta) y nombre del campo."],
            ["className", "string", "No", "—", "Clase adicional del formulario."],
          ],
        },
      ]}
      usage={`<UISearchInput
  value={busqueda}
  onChange={setBusqueda}
  onSubmit={(termino) => navigate(\`/buscar?q=\${encodeURIComponent(termino)}\`)}
  placeholder="¿Qué necesita tu mascota?"
  label="Buscar productos"
/>`}
    >
      <div style={{ ...fondoHeader, flexDirection: "column", alignItems: "stretch", maxWidth: "520px" }}>
        <h3>Tamaño lg (header)</h3>
        <UISearchInput
          value={grande}
          onChange={setGrande}
          onSubmit={setUltimaBusqueda}
          placeholder="¿Qué necesita tu mascota?"
          label="Buscar productos"
        />
        <h3>Tamaño md, con texto</h3>
        <UISearchInput value={mediano} onChange={setMediano} onSubmit={setUltimaBusqueda} size="md" />
        <h3>Deshabilitado</h3>
        <UISearchInput value="" onChange={() => undefined} placeholder="No disponible" disabled />
      </div>
      <p>Última búsqueda enviada: {ultimaBusqueda || "—"}</p>
    </DocSection>
  );
}

// ======================================
// UIInput
// ======================================

type EstadoInputDemo = {
  nombre: string;
  status?: "default" | "error" | "success";
  forceState?: "hover" | "focus";
  disabled?: boolean;
};

const ESTADOS_INPUT: EstadoInputDemo[] = [
  { nombre: "Default" },
  { nombre: "Hover", forceState: "hover" },
  { nombre: "Focus", forceState: "focus" },
  { nombre: "Error", status: "error" },
  { nombre: "Success", status: "success" },
  { nombre: "Disabled", disabled: true },
];

function InputExample() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [tocado, setTocado] = useState(false);

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
  const estadoCorreo = !tocado || !correo ? "default" : correoValido ? "success" : "error";

  return (
    <DocSection
      title="UIInput"
      description="Campo de texto con forma de píldora. El nombre del campo va dentro, como placeholder, con asterisco rojo si es obligatorio, y se oculta al escribir. Estados: default, hover, focus, error, success (con ✓) y disabled, en tamaños md y sm."
      note="Las filas de la tabla usan forceState o status para mostrar cada estado fijo, como en Figma. En el ejemplo interactivo, el correo se valida al salir del campo."
      props={[
        {
          title: "Props de UIInput",
          rows: [
            ["label", "string", "Sí", "—", "Nombre del campo, mostrado dentro mientras está vacío."],
            ["value", "string", "Sí", "—", "Valor actual (componente controlado)."],
            ["onChange", "(value: string) => void", "Sí", "—", "Se llama con el nuevo texto."],
            ["onBlur", "(event) => void", "No", "—", "Al salir del campo (útil para validar)."],
            ["type", "string", "No", '"text"', "Tipo de input: text, email, tel, password…"],
            ["required", "boolean", "No", "false", "Muestra el asterisco rojo y marca el campo como obligatorio."],
            ["status", '"default" | "error" | "success"', "No", '"default"', "Borde rojo o verde con ✓."],
            ["message", "string", "No", "—", "Texto bajo el campo; en error se anuncia a lectores de pantalla."],
            ["size", '"sm" | "md"', "No", '"md"', "40 px o 48 px de alto."],
            ["disabled", "boolean", "No", "false", "Fondo gris y sin interacción."],
            ["id / name / autoComplete / inputMode / maxLength", "—", "No", "—", "Atributos nativos del input."],
            ["forceState", '"hover" | "focus"', "No", "—", "Solo documentación: fija un estado visual."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UIInput
  label="Correo"
  type="email"
  required
  value={correo}
  onChange={setCorreo}
  onBlur={() => setTocado(true)}
  status={correoInvalido ? "error" : "default"}
  message={correoInvalido ? "Ingresa un correo válido" : undefined}
/>`}
    >
      <div className="ui-kit-product-card-example__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>md</th>
              <th>sm</th>
            </tr>
          </thead>
          <tbody>
            {ESTADOS_INPUT.map((e) => (
              <tr key={e.nombre}>
                <td>{e.nombre}</td>
                {(["md", "sm"] as const).map((tamano) => (
                  <td key={tamano} style={{ minWidth: "260px" }}>
                    <UIInput
                      label="Nombre"
                      required
                      value=""
                      onChange={() => undefined}
                      size={tamano}
                      status={e.status}
                      forceState={e.forceState}
                      disabled={e.disabled}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Interactivo</h3>
      <div style={{ ...fondoHeader, flexDirection: "column", alignItems: "stretch", maxWidth: "420px" }}>
        <UIInput label="Nombre" required value={nombre} onChange={setNombre} autoComplete="given-name" />
        <UIInput
          label="Correo"
          type="email"
          required
          value={correo}
          onChange={setCorreo}
          onBlur={() => setTocado(true)}
          autoComplete="email"
          status={estadoCorreo}
          message={
            estadoCorreo === "error"
              ? "Ingresa un correo válido, por ejemplo nombre@correo.cl"
              : estadoCorreo === "success"
                ? "Correo válido"
                : undefined
          }
        />
        <UIInput label="Teléfono" type="tel" size="sm" value="" onChange={() => undefined} message="Opcional" />
      </div>
    </DocSection>
  );
}

// ======================================
// UIStepper
// ======================================

const PASOS_AGENDAMIENTO = ["Selección de servicio", "Fecha, hora y profesional", "Datos de contacto"];
const PASOS_COMPRA = ["Datos", "Tipo de entrega", "Pago"];

function StepperExample() {
  const [paso, setPaso] = useState(0);

  return (
    <DocSection
      title="UIStepper"
      description="Indicador de progreso de un proceso por pasos. El paso actual se muestra relleno y los demás en tono claro, unidos por líneas. Esquema verde (agendamiento) o naranjo (compra)."
      note="En el ejemplo interactivo usa Anterior y Siguiente; con onStepClick, los pasos ya completados se pueden presionar para volver a ellos. En pantallas angostas solo se muestra el nombre del paso actual."
      props={[
        {
          title: "Props de UIStepper",
          rows: [
            ["steps", "string[]", "Sí", "—", "Nombre de cada paso, en orden."],
            ["current", "number", "Sí", "—", "Paso actual, empezando en 0."],
            ["color", '"green" | "orange"', "No", '"green"', "Esquema de color."],
            ["size", '"sm" | "md"', "No", '"md"', "Círculo de 32 px o 40 px."],
            ["onStepClick", "(index: number) => void", "No", "—", "Permite volver a pasos completados."],
            ["ariaLabel", "string", "No", '"Progreso"', "Nombre accesible del proceso."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UIStepper
  steps={["Selección de servicio", "Fecha, hora y profesional", "Datos de contacto"]}
  current={pasoActual}
  onStepClick={setPasoActual}
  ariaLabel="Pasos del agendamiento"
/>`}
    >
      <h3>Verde: paso 1, 2 y 3</h3>
      <div style={{ ...fondoHeader, flexDirection: "column", alignItems: "stretch" }}>
        <UIStepper steps={PASOS_AGENDAMIENTO} current={0} />
        <UIStepper steps={PASOS_AGENDAMIENTO} current={1} />
        <UIStepper steps={PASOS_AGENDAMIENTO} current={2} />
      </div>

      <h3>Naranjo y tamaño sm</h3>
      <div style={{ ...fondoHeader, flexDirection: "column", alignItems: "stretch" }}>
        <UIStepper steps={PASOS_COMPRA} current={0} color="orange" />
        <UIStepper steps={PASOS_COMPRA} current={1} color="orange" size="sm" />
      </div>

      <h3>Interactivo</h3>
      <div style={{ ...fondoHeader, flexDirection: "column", alignItems: "stretch" }}>
        <UIStepper
          steps={PASOS_AGENDAMIENTO}
          current={paso}
          onStepClick={setPaso}
          ariaLabel="Pasos del agendamiento"
        />
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <UIButton variant="tertiary" size="S" disabled={paso === 0} onClick={() => setPaso((p) => p - 1)}>
            Anterior
          </UIButton>
          <UIButton
            variant="secondary"
            size="S"
            disabled={paso === PASOS_AGENDAMIENTO.length - 1}
            onClick={() => setPaso((p) => p + 1)}
          >
            Siguiente
          </UIButton>
        </div>
      </div>
    </DocSection>
  );
}

// ======================================
// UIIconButton
// ======================================

function IconButtonExample() {
  const [clics, setClics] = useState(0);

  return (
    <DocSection
      title="UIIconButton"
      description="Botón circular solo con ícono. Se renderiza como NavLink (to), enlace externo (href) o botón (onClick). Admite un contador (badge)."
      note="Pasa el mouse para ver hover, haz clic para ver active y usa Tab para comprobar el foco visible."
      props={[
        {
          title: "Props de UIIconButton",
          rows: [
            ["ariaLabel", "string", "Sí", "—", "Texto accesible (el botón no tiene texto visible)."],
            ["icon", "ReactNode", "No", "—", "Ícono como elemento (<svg>, <img>, <UIKitIcon />)."],
            ["iconSrc", "string", "No", "—", "Ícono como archivo .svg importado; toma el color del botón (máscara)."],
            ["to", "string", "No", "—", "Ruta interna (React Router)."],
            ["href", "string", "No", "—", "Enlace externo; se abre en otra pestaña."],
            ["onClick", "(event) => void", "No", "—", "Acción al hacer clic."],
            ["badge", "number", "No", "—", "Número sobre el ícono. 0 u omitido = no se muestra."],
            ["badgeMax", "number", "No", "99", "A partir de este valor muestra «99+»."],
            ["variant", '"ghost" | "filled" | "outline"', "No", '"ghost"', "Estilo visual."],
            ["size", '"sm" | "md" | "lg"', "No", '"md"', "32, 40 o 48 px."],
            ["disabled", "boolean", "No", "false", "Deshabilita la acción."],
            ["type", '"button" | "submit" | "reset"', "No", '"button"', "Tipo cuando se renderiza como <button>."],
            ["title / className", "string", "No", "—", "Tooltip nativo y clase adicional."],
          ],
        },
      ]}
      usage={`<UIIconButton
  ariaLabel="Carrito"
  iconSrc={cartIcon}
  to="/carrito-compras"
  badge={totalItems}
/>`}
    >
      <h3>Variantes</h3>
      <div style={fondoHeader}>
        <UIIconButton ariaLabel="Ghost" iconSrc={userIcon} onClick={() => setClics((c) => c + 1)} />
        <UIIconButton ariaLabel="Filled" iconSrc={userIcon} variant="filled" onClick={() => setClics((c) => c + 1)} />
        <UIIconButton ariaLabel="Outline" iconSrc={userIcon} variant="outline" onClick={() => setClics((c) => c + 1)} />
        <UIIconButton ariaLabel="Menú" icon={IconoMenu} onClick={() => setClics((c) => c + 1)} />
        <span>Clics: {clics}</span>
      </div>
      <h3>Tamaños y badge</h3>
      <div style={fondoHeader}>
        <UIIconButton ariaLabel="Carrito" iconSrc={cartIcon} size="sm" badge={2} />
        <UIIconButton ariaLabel="Carrito" iconSrc={cartIcon} size="md" badge={12} />
        <UIIconButton ariaLabel="Carrito" iconSrc={cartIcon} size="lg" badge={150} />
        <UIIconButton ariaLabel="Carrito vacío" iconSrc={cartIcon} badge={0} />
        <UIIconButton ariaLabel="Deshabilitado" iconSrc={cartIcon} disabled />
      </div>
    </DocSection>
  );
}

// ======================================
// UIBadge
// ======================================

function BadgeExample() {
  return (
    <DocSection
      title="UIBadge"
      description="Contador o etiqueta pequeña. Con count = 0 no se dibuja (salvo showZero); sobre max muestra «99+»."
      props={[
        {
          title: "Props de UIBadge",
          rows: [
            ["count", "number", "No", "—", "Número a mostrar."],
            ["max", "number", "No", "99", "Límite antes de mostrar «max+»."],
            ["showZero", "boolean", "No", "false", "Muestra el badge aunque count sea 0."],
            ["children", "ReactNode", "No", "—", "Texto en vez de número (ej. «Oferta»)."],
            ["dot", "boolean", "No", "false", "Solo un punto, sin texto."],
            ["variant", '"accent" | "brown" | "soft" | "success" | "neutral"', "No", '"accent"', "Color."],
            ["size", '"sm" | "md"', "No", '"sm"', "18 px o 24 px de alto."],
            ["ariaLabel", "string", "No", "—", "Si se pasa, el badge se anuncia; si no, es decorativo."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UIBadge count={3} />
<UIBadge variant="soft" size="md">Oferta</UIBadge>`}
    >
      <h3>Números</h3>
      <div style={fila}>
        <UIBadge count={3} />
        <UIBadge count={42} />
        <UIBadge count={150} />
        <UIBadge count={0} showZero variant="neutral" />
        <UIBadge dot />
      </div>
      <h3>Variantes con texto (size md)</h3>
      <div style={fila}>
        <UIBadge size="md">Accent</UIBadge>
        <UIBadge size="md" variant="brown">Brown</UIBadge>
        <UIBadge size="md" variant="soft">Oferta</UIBadge>
        <UIBadge size="md" variant="success">Disponible</UIBadge>
        <UIBadge size="md" variant="neutral">Agotado</UIBadge>
      </div>
    </DocSection>
  );
}

// ======================================
// UITextLink
// ======================================

function TextLinkExample() {
  const [clics, setClics] = useState(0);

  return (
    <DocSection
      title="UITextLink"
      description="Enlace de texto. Se renderiza como NavLink (to), enlace externo (href) o botón con aspecto de enlace (onClick)."
      props={[
        {
          title: "Props de UITextLink",
          rows: [
            ["children", "ReactNode", "Sí", "—", "Texto del enlace."],
            ["to", "string", "No", "—", "Ruta interna."],
            ["href", "string", "No", "—", "Enlace externo; se abre en otra pestaña."],
            ["onClick", "(event) => void", "No", "—", "Acción; sin to ni href se renderiza un <button>."],
            ["variant", '"default" | "strong" | "muted"', "No", '"default"', "Rojizo, oscuro en negrita o gris."],
            ["underline", '"hover" | "always" | "none"', "No", '"hover"', "Cuándo se subraya."],
            ["size", '"sm" | "md"', "No", '"md"', "13 px o 15 px."],
            ["iconEnd", "ReactNode", "No", "—", "Ícono después del texto (se desplaza en hover)."],
            ["disabled", "boolean", "No", "false", "Se muestra apagado y no navega."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UITextLink to="/mi-perfil/perfil-mascota/historial-medico" iconEnd={<FlechaIcon />}>
  Ver historial completo
</UITextLink>`}
    >
      <h3>Variantes</h3>
      <div style={fila}>
        <UITextLink to="/">Default</UITextLink>
        <UITextLink to="/" variant="strong">Strong</UITextLink>
        <UITextLink to="/" variant="muted">Muted</UITextLink>
      </div>
      <h3>Subrayado, ícono, botón y deshabilitado</h3>
      <div style={fila}>
        <UITextLink to="/" underline="always">Siempre subrayado</UITextLink>
        <UITextLink to="/" underline="none">Sin subrayado</UITextLink>
        <UITextLink to="/" iconEnd={IconoFlecha}>Ver historial completo</UITextLink>
        <UITextLink onClick={() => setClics((c) => c + 1)}>Como botón ({clics})</UITextLink>
        <UITextLink size="sm" disabled>Iniciar sesión</UITextLink>
      </div>
    </DocSection>
  );
}

// ======================================
// UILink
// ======================================

const ESTADOS_LINK = [
  { nombre: "Default", estado: undefined },
  { nombre: "Hover", estado: "hover" },
  { nombre: "Active", estado: "active" },
  { nombre: "Focus", estado: "focus" },
] as const;

const COLUMNAS_LINK = [
  { nombre: "S · subrayado", size: "sm", underline: true },
  { nombre: "M · subrayado", size: "md", underline: true },
  { nombre: "S · sin subrayado", size: "sm", underline: false },
  { nombre: "M · sin subrayado", size: "md", underline: false },
] as const;

function MatrizLinks({ color, weight }: { color: "brown" | "blue"; weight: "regular" | "bold" }) {
  return (
    <div className="ui-kit-product-card-example__table-wrap">
      <table>
        <thead>
          <tr>
            <th>Estado</th>
            {COLUMNAS_LINK.map((c) => (
              <th key={c.nombre}>{c.nombre}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ESTADOS_LINK.map((e) => (
            <tr key={e.nombre}>
              <td>{e.nombre}</td>
              {COLUMNAS_LINK.map((c) => (
                <td key={c.nombre}>
                  <UILink
                    color={color}
                    weight={weight}
                    size={c.size}
                    underline={c.underline}
                    forceState={e.estado}
                  >
                    Link
                  </UILink>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LinkExample() {
  const [clics, setClics] = useState(0);

  return (
    <DocSection
      title="UILink"
      description="Enlace con flecha ↗ según Figma. Dos esquemas de color (café y azul), dos tamaños, peso regular o bold y subrayado opcional. Estados: default, hover, active y focus (borde redondeado)."
      note="Las matrices usan forceState para mostrar cada estado fijo, como en Figma. En los ejemplos interactivos pasa el mouse, haz clic y usa Tab para ver los estados reales."
      props={[
        {
          title: "Props de UILink",
          rows: [
            ["children", "ReactNode", "Sí", "—", "Texto del enlace."],
            ["to", "string", "No", "—", "Ruta interna (React Router)."],
            ["href", "string", "No", "—", "Enlace externo; se abre en otra pestaña y lo anuncia a lectores de pantalla."],
            ["onClick", "(event) => void", "No", "—", "Acción; sin to ni href se renderiza un <button>."],
            ["color", '"brown" | "blue"', "No", '"brown"', "Esquema de color."],
            ["size", '"sm" | "md"', "No", '"sm"', "13 px o 16 px."],
            ["weight", '"regular" | "bold"', "No", '"regular"', "Peso del texto."],
            ["underline", "boolean", "No", "true", "Subrayado permanente del texto."],
            ["icon", "boolean | ReactNode", "No", "true", "Flecha ↗; false la oculta y también acepta un ícono propio."],
            ["disabled", "boolean", "No", "false", "Se muestra apagado y no navega."],
            ["forceState", '"hover" | "active" | "focus"', "No", "—", "Solo documentación: fija un estado visual."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UILink to="/terminos-y-condiciones">Términos y condiciones</UILink>

<UILink href="https://www.sag.gob.cl" color="blue" size="md" underline={false}>
  Más información
</UILink>`}
    >
      <h3>Café · regular</h3>
      <MatrizLinks color="brown" weight="regular" />
      <h3>Café · bold</h3>
      <MatrizLinks color="brown" weight="bold" />
      <h3>Azul · regular</h3>
      <MatrizLinks color="blue" weight="regular" />

      <h3>Interactivos</h3>
      <div style={fondoHeader}>
        <UILink to="/">Ruta interna</UILink>
        <UILink href="https://www.google.com" color="blue">Enlace externo</UILink>
        <UILink onClick={() => setClics((c) => c + 1)} weight="bold" size="md">
          Como botón ({clics})
        </UILink>
        <UILink to="/" icon={false}>Sin flecha</UILink>
        <UILink to="/" disabled>Deshabilitado</UILink>
      </div>
    </DocSection>
  );
}

// ======================================
// UIQualification
// ======================================

const CALIFICACIONES = [0, 1, 2, 3, 4, 5];

function QualificationExample() {
  const [miNota, setMiNota] = useState(0);

  return (
    <DocSection
      title="UIQualification"
      description="Calificación en dos variantes: «stars» muestra estrellas llenas y vacías en tres tamaños (con onChange se vuelve seleccionable) y «badge» es la etiqueta compacta «★ n/5» de las reviews."
      note="En el ejemplo interactivo, pasa el mouse para previsualizar, haz clic para elegir y vuelve a hacer clic en la misma estrella para borrar la nota. También funciona con Tab y Enter."
      props={[
        {
          title: "Props de UIQualification",
          rows: [
            ["value", "number", "Sí", "—", "Calificación; en stars se redondea, en badge admite decimales. Siempre entre 0 y max."],
            ["max", "number", "No", "5", "Cantidad de estrellas / valor máximo."],
            ["variant", '"stars" | "badge"', "No", '"stars"', "Fila de estrellas o etiqueta «★ n/5»."],
            ["size", '"sm" | "md" | "lg"', "No", '"md"', "stars: 12, 18 o 24 px. badge: sm o md (lg se muestra como md)."],
            ["onChange", "(value: number) => void", "No", "—", "Solo stars: las estrellas se vuelven seleccionables."],
            ["showIcon", "boolean", "No", "true", "Solo badge: muestra la estrella antes del número."],
            ["disabled", "boolean", "No", "false", "Deshabilita la selección."],
            ["ariaLabel", "string", "No", "«Calificación: n de max»", "Texto accesible."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UIQualification value={producto.rating} size="md" />

<UIQualification value={nota} onChange={setNota} size="lg" />

<UIQualification value={4} variant="badge" />`}
    >
      <h3>variant="stars": 0 a 5 en tamaños lg, md y sm</h3>
      <div className="ui-kit-product-card-example__table-wrap">
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>lg</th>
              <th>md</th>
              <th>sm</th>
            </tr>
          </thead>
          <tbody>
            {CALIFICACIONES.map((n) => (
              <tr key={n}>
                <td>{n}/5</td>
                <td><UIQualification value={n} size="lg" /></td>
                <td><UIQualification value={n} size="md" /></td>
                <td><UIQualification value={n} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>variant="stars" interactivo</h3>
      <div style={fondoHeader}>
        <UIQualification value={miNota} onChange={setMiNota} size="lg" ariaLabel="Califica el producto" />
        <span>Tu calificación: {miNota}/5</span>
        <UIQualification value={3} onChange={() => undefined} disabled />
      </div>

      <h3>variant="badge": 0/5 a 5/5</h3>
      <div style={fila}>
        {CALIFICACIONES.map((n) => (
          <UIQualification key={n} value={n} variant="badge" />
        ))}
      </div>
      <h3>variant="badge": tamaño sm, decimales y sin ícono</h3>
      <div style={fila}>
        <UIQualification value={4.5} variant="badge" size="sm" />
        <UIQualification value={3.75} variant="badge" />
        <UIQualification value={5} variant="badge" showIcon={false} />
      </div>
    </DocSection>
  );
}

// ======================================
// UINavItem
// ======================================

function NavItemExample() {
  return (
    <DocSection
      title="UINavItem"
      description="Opción de la barra de navegación con ícono. Se resalta en hover y cuando la ruta actual coincide. Sin ruta se muestra deshabilitada."
      props={[
        {
          title: "Props de UINavItem",
          rows: [
            ["label", "string", "Sí", "—", "Texto de la opción."],
            ["to", "string", "No", "—", "Ruta interna. Vacía = deshabilitada (evita que NavLink quede siempre activo)."],
            ["icon", "ReactNode", "No", "—", "Ícono como elemento (ej. <UIKitIcon />)."],
            ["iconSrc", "string", "No", "—", "Ícono como archivo .svg (toma el color del texto)."],
            ["active", "boolean", "No", "false", "Fuerza el estado activo (ej. mientras su menú está abierto)."],
            ["end", "boolean", "No", "false", "Activa solo si la ruta coincide exactamente."],
            ["highlightActive", "boolean", "No", "true", "Resaltar automáticamente cuando la ruta coincide."],
            ["size", '"md" | "lg"', "No", '"lg"', "Tamaño de texto e ícono."],
            ["onClick / className", "—", "No", "—", "Acción adicional y clase adicional."],
          ],
        },
      ]}
      usage={`<UINavItem
  label="Categorías"
  to="/tienda"
  icon={<UIKitIcon name="Category" iconColor="brown" />}
/>`}
    >
      <h3>Tamaño lg (barra del header)</h3>
      <div style={fondoBarra}>
        <UINavItem label="Categorías" to="/tienda" icon={<UIKitIcon name="Category" iconColor="brown" />} />
        <UINavItem label="Activo forzado" to="/tienda" active icon={<UIKitIcon name="Hospital" iconColor="brown" />} />
        <UINavItem label="Sin ruta" icon={<UIKitIcon name="Telephone" iconColor="brown" />} />
      </div>
      <h3>Tamaño md</h3>
      <div style={fondoBarra}>
        <UINavItem size="md" label="Servicios" to="/servicios-veterinarios/agendar-veterinario-lista-servicios" icon={<UIKitIcon name="Stethoscope" iconColor="brown" />} />
        <UINavItem size="md" label="Con iconSrc" to="/tienda" iconSrc={catIcon} />
      </div>
    </DocSection>
  );
}

// ======================================
// UILogo
// ======================================

function LogoExample() {
  return (
    <DocSection
      title="UILogo"
      description="Logo de la marca en sus cuatro versiones de Figma: horizontal (V1), compacto (Mobile), con mascotas (V2) y casa (V3). Por defecto enlaza al inicio; con to={null} es solo imagen."
      note="Con responsive, la versión horizontal cambia sola a la compacta bajo 768 px (o el breakpoint indicado). Achica la ventana para probarlo."
      props={[
        {
          title: "Props de UILogo",
          rows: [
            ["variant", '"horizontal" | "compact" | "con-mascotas" | "casa"', "No", '"horizontal"', "V1, Mobile, V2 o V3."],
            ["size", '"sm" | "md" | "lg"', "No", '"md"', "Alto según la variante (ej. horizontal: 32, 44 o 56 px)."],
            ["responsive", "boolean", "No", "false", "Solo horizontal: usa la versión compacta en pantallas angostas."],
            ["breakpoint", "number", "No", "768", "Ancho (px) bajo el cual se usa la versión compacta."],
            ["to", "string | null", "No", '"/"', "Ruta al hacer clic; null = sin enlace."],
            ["src", "string", "No", "—", "Reemplaza la imagen de la variante."],
            ["alt", "string", "No", '"PetLove"', "Texto alternativo."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UILogo responsive />                       {/* header */}
<UILogo variant="con-mascotas" />             {/* footer */}
<UILogo variant="casa" size="lg" to={null} /> {/* login, estados vacíos */}`}
    >
      <h3>V1 · horizontal (sm, md, lg)</h3>
      <div style={fondoHeader}>
        <UILogo size="sm" to={null} />
        <UILogo size="md" to={null} />
        <UILogo size="lg" to={null} />
      </div>

      <h3>Mobile · compact (sm, md, lg)</h3>
      <div style={fondoHeader}>
        <UILogo variant="compact" size="sm" to={null} />
        <UILogo variant="compact" size="md" to={null} />
        <UILogo variant="compact" size="lg" to={null} />
      </div>

      <h3>Responsive (horizontal → compact bajo 768 px)</h3>
      <div style={fondoHeader}>
        <UILogo responsive to={null} />
      </div>

      <h3>V2 · con mascotas</h3>
      <div style={fondoFooter}>
        <UILogo variant="con-mascotas" size="sm" to={null} />
        <UILogo variant="con-mascotas" size="md" to={null} />
      </div>

      <h3>V3 · casa (sm, md)</h3>
      <div style={fondoHeader}>
        <UILogo variant="casa" size="sm" to={null} />
        <UILogo variant="casa" size="md" to={null} />
      </div>
    </DocSection>
  );
}

// ======================================
// UIMenuGroup + UIMenuItem + UISubMenu
// ======================================

function MenuExample() {
  return (
    <DocSection
      title="UIMenuGroup, UIMenuItem y UISubMenu"
      description="Piezas del menú de categorías. UIMenuGroup agrupa opciones bajo un título con ícono; UIMenuItem es cada opción y, si recibe otros UIMenuItem como hijos, muestra la flecha y los abre en un UISubMenu."
      note="Pasa el mouse por «Alimentos y Snack» o «Accesorios» para abrir su submenú a la derecha. El submenú tarda un instante en abrirse y cerrarse para permitir moverse en diagonal."
      props={[
        {
          title: "Props de UIMenuGroup",
          rows: [
            ["title", "string", "Sí", "—", "Título del grupo."],
            ["icon", "ReactNode", "No", "—", "Ícono como elemento."],
            ["iconSrc", "string", "No", "—", "Ícono como archivo .svg (máscara)."],
            ["children", "ReactNode", "Sí", "—", "Normalmente una lista de <UIMenuItem />."],
            ["listWidth", "number | string", "No", "190px", "Ancho de la lista; los submenús se abren a la derecha de este ancho."],
            ["headingLevel", "2 | 3 | 4", "No", "3", "Nivel del encabezado."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
        {
          title: "Props de UIMenuItem",
          rows: [
            ["label", "string", "Sí", "—", "Texto de la opción."],
            ["to", "string", "No", "—", "Ruta interna; sin to se renderiza un <button>."],
            ["onClick", "(event) => void", "No", "—", "Acción al hacer clic."],
            ["icon", "ReactNode", "No", "—", "Ícono antes del texto."],
            ["children", "ReactNode", "No", "—", "Subopciones (<UIMenuItem />) mostradas en un UISubMenu."],
            ["hasSubmenu", "boolean", "No", "auto", "Muestra la flecha aunque no haya children."],
            ["submenuPlacement", '"right" | "below"', "No", '"right"', "Dónde se abre el submenú."],
            ["active / disabled", "boolean", "No", "false", "Estado activo forzado / deshabilitado."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
        {
          title: "Props de UISubMenu",
          rows: [
            ["children", "ReactNode", "Sí", "—", "Lista de <UIMenuItem />."],
            ["label", "string", "No", "—", "Nombre de la opción padre (lectores de pantalla)."],
            ["open", "boolean", "No", "—", "Fuerza el submenú abierto; si se omite, se abre con hover/foco del padre."],
            ["placement", '"right" | "below"', "No", '"right"', "Flotante a la derecha o desplegado hacia abajo."],
            ["className", "string", "No", "—", "Clase adicional."],
          ],
        },
      ]}
      usage={`<UIMenuGroup title="Gato" iconSrc={catIcon}>
  <UIMenuItem label="Alimentos y Snack" to="/categoria/gato/alimentos-y-snack">
    <UIMenuItem label="Alimentos húmedos" to="/categoria/gato/alimentos-y-snack/alimentos-humedos" />
    <UIMenuItem label="Alimentos secos" to="/categoria/gato/alimentos-y-snack/alimentos-secos" />
  </UIMenuItem>
  <UIMenuItem label="Outlet" to="/categoria/gato/outlet" />
</UIMenuGroup>`}
    >
      <h3>Submenú a la derecha (placement «right»)</h3>
      <div style={{ ...fila, alignItems: "flex-start", minHeight: "220px", gap: "160px" }}>
        <UIMenuGroup title="Gato" iconSrc={catIcon}>
          <UIMenuItem label="Alimentos y Snack" to="/categoria/gato/alimentos-y-snack">
            <UIMenuItem label="Alimentos húmedos" to="/categoria/gato/alimentos-y-snack/alimentos-humedos" />
            <UIMenuItem label="Alimentos secos" to="/categoria/gato/alimentos-y-snack/alimentos-secos" />
            <UIMenuItem label="Snack" to="/categoria/gato/alimentos-y-snack/snack" />
          </UIMenuItem>
          <UIMenuItem label="Accesorios" to="/categoria/gato/accesorios">
            <UIMenuItem label="Camas y rascadores" to="/categoria/gato/accesorios/camas-y-rascadores" />
            <UIMenuItem label="Juguetes" to="/categoria/gato/accesorios/juguetes" />
          </UIMenuItem>
          <UIMenuItem label="Arenas y Areneros" to="/categoria/gato/arenas-y-areneros" />
          <UIMenuItem label="Deshabilitado" disabled />
        </UIMenuGroup>

        <UIMenuGroup title="Perro" iconSrc={dogIcon}>
          <UIMenuItem label="Desplegable abajo" submenuPlacement="below">
            <UIMenuItem label="Opción A" to="/categoria/perro" />
            <UIMenuItem label="Opción B" to="/categoria/perro" />
          </UIMenuItem>
          <UIMenuItem label="Outlet" to="/categoria/perro/outlet" />
        </UIMenuGroup>
      </div>

      <h3>UISubMenu forzado abierto (open)</h3>
      <ul style={{ listStyle: "none", margin: "16px 0", padding: 0, width: "220px", position: "relative" }}>
        <li className="ui-menu-item">
          <strong>Opción padre</strong>
          <UISubMenu open placement="below" label="Opción padre">
            <UIMenuItem label="Subopción 1" to="/tienda" />
            <UIMenuItem label="Subopción 2" to="/tienda" />
          </UISubMenu>
        </li>
      </ul>
    </DocSection>
  );
}

// ======================================
// UIDropDownPanel
// ======================================

function DropDownPanelExample() {
  return (
    <DocSection
      title="UIDropDownPanel"
      description="Panel desplegable que se abre con hover o con clic. Se cierra con Escape, al hacer clic fuera o al elegir un enlace dentro del panel."
      note="El trigger puede ser una función que recibe el estado abierto, útil para resaltar la opción mientras el panel está visible."
      props={[
        {
          title: "Props de UIDropDownPanel",
          rows: [
            ["trigger", "ReactNode | (open: boolean) => ReactNode", "Sí", "—", "Elemento que abre el panel."],
            ["children", "ReactNode", "Sí", "—", "Contenido del panel."],
            ["openOn", '"hover" | "click"', "No", '"hover"', "Cómo se abre."],
            ["open / onOpenChange", "boolean / (open) => void", "No", "—", "Modo controlado (opcional)."],
            ["align", '"start" | "end" | "full"', "No", '"start"', "Alineación; full ocupa el ancho del contenedor posicionado más cercano."],
            ["closeDelay", "number", "No", "200", "Milisegundos antes de cerrar al sacar el mouse."],
            ["ariaLabel", "string", "No", "—", "Nombre accesible del panel."],
            ["className / panelClassName", "string", "No", "—", "Clases del contenedor y del panel."],
          ],
        },
      ]}
      usage={`<UIDropDownPanel
  align="full"
  openOn="hover"
  panelClassName="mega-menu"
  trigger={(abierto) => <UINavItem label="Categorías" to="/tienda" active={abierto} />}
>
  <MegaMenuCategorias />
</UIDropDownPanel>`}
    >
      <div style={{ ...fila, minHeight: "200px", alignItems: "flex-start" }}>
        <UIDropDownPanel
          openOn="click"
          ariaLabel="Menú de usuario"
          trigger={(abierto) => (
            <UIButton variant="tertiary" size="S">
              {abierto ? "Cerrar (clic)" : "Abrir con clic"}
            </UIButton>
          )}
        >
          <UILinkList
            ariaLabel="Mi cuenta"
            variant="default"
            links={[
              { label: "Mi perfil", to: "/mi-perfil/perfil-usuario" },
              { label: "Mis mascotas", to: "/mi-perfil/perfil-mascota" },
              { label: "Cerrar sesión" },
            ]}
          />
        </UIDropDownPanel>

        <UIDropDownPanel
          openOn="hover"
          align="end"
          ariaLabel="Ayuda"
          trigger={<UIButton variant="secondary" size="S">Abrir con hover</UIButton>}
        >
          <p style={{ margin: 0 }}>Contenido libre: texto, enlaces o componentes.</p>
        </UIDropDownPanel>
      </div>

      <h3>align «full» (ancho del contenedor)</h3>
      <div style={{ position: "relative", minHeight: "180px" }}>
        <div style={fondoBarra}>
          <UIDropDownPanel
            align="full"
            ariaLabel="Categorías"
            trigger={(abierto) => (
              <UINavItem
                label="Categorías"
                to="/tienda"
                active={abierto}
                icon={<UIKitIcon name="Category" iconColor="brown" />}
              />
            )}
          >
            <UIMenuGroup title="Gato" iconSrc={catIcon}>
              <UIMenuItem label="Alimentos y Snack" to="/categoria/gato/alimentos-y-snack" />
              <UIMenuItem label="Outlet" to="/categoria/gato/outlet" />
            </UIMenuGroup>
          </UIDropDownPanel>
        </div>
      </div>
    </DocSection>
  );
}

// ======================================
// FOOTER: UIInfoBlock, UILinkList, UISocialLinks
// ======================================

function FooterPiecesExample() {
  return (
    <DocSection
      title="UIInfoBlock, UILinkList y UISocialLinks"
      description="Piezas del footer: bloque de información con título, lista vertical de enlaces y fila de redes sociales."
      note="En UILinkList, los enlaces sin to ni href se muestran como texto. En UISocialLinks, los íconos sin href se muestran pero no son clickeables."
      props={[
        {
          title: "Props de UIInfoBlock",
          rows: [
            ["title", "string", "Sí", "—", "Título del bloque."],
            ["lines", "ReactNode[]", "No", "[]", "Líneas de información."],
            ["children", "ReactNode", "No", "—", "Contenido libre adicional."],
            ["icon", "ReactNode", "No", "—", "Ícono junto al título."],
            ["asAddress", "boolean", "No", "false", "Usa <address> para datos de contacto."],
            ["headingLevel / className", "2 | 3 | 4 / string", "No", "3 / —", "Nivel del título y clase adicional."],
          ],
        },
        {
          title: "Props de UILinkList",
          rows: [
            ["links", "{ label; to?; href? }[]", "Sí", "—", "Enlaces de la lista."],
            ["title", "string", "No", "—", "Título opcional (ej. «Nosotros»)."],
            ["ariaLabel", "string", "No", "—", "Nombre accesible cuando no hay título."],
            ["variant", '"default" | "strong" | "muted"', "No", '"strong"', "Variante de UITextLink."],
            ["size", '"sm" | "md"', "No", '"sm"', "Tamaño de UITextLink."],
            ["headingLevel / className", "2 | 3 | 4 / string", "No", "3 / —", "Nivel del título y clase adicional."],
          ],
        },
        {
          title: "Props de UISocialLinks",
          rows: [
            ["links", "{ name; iconSrc?; icon?; href? }[]", "Sí", "—", "Redes; name se usa como texto accesible."],
            ["color", "string", "No", "#4A5A24", "Color de los íconos."],
            ["size", '"sm" | "md" | "lg"', "No", '"sm"', "Tamaño de UIIconButton."],
            ["variant", '"ghost" | "filled" | "outline"', "No", '"ghost"', "Variante de UIIconButton."],
            ["ariaLabel / className", "string", "No", '"Redes sociales" / —', "Nombre accesible y clase adicional."],
          ],
        },
      ]}
      usage={`<UIInfoBlock title="Sucursal" lines={[direccion, ...horarios]} asAddress />
<UILinkList title="Nosotros" links={[{ label: "Sobre nosotros", to: "/nosotros" }]} />
<UISocialLinks links={[{ name: "Instagram", iconSrc: instagramIcon, href: "https://instagram.com/..." }]} />`}
    >
      <div style={fondoFooter}>
        <UIInfoBlock
          title="Sucursal"
          lines={["Avenida Nueva Providencia 2556", "Lunes a Viernes 9:00 a 20:00", "Sábado y Domingo 10:00 a 18:00"]}
          asAddress
        />
        <UILinkList
          ariaLabel="Información"
          links={[
            { label: "Preguntas frecuentes" },
            { label: "Términos y condiciones" },
            { label: "Políticas de privacidad", to: "/" },
          ]}
        />
        <UILinkList
          title="Nosotros"
          variant="default"
          links={[{ label: "Sobre nosotros" }, { label: "Horario de atención" }]}
        />
      </div>

      <h3>UISocialLinks</h3>
      <div style={fondoFooter}>
        <UISocialLinks
          links={[
            { name: "Instagram", iconSrc: instagramIcon, href: "https://instagram.com" },
            { name: "TikTok", iconSrc: tiktokIcon },
            { name: "WhatsApp", iconSrc: whatsappIcon },
            { name: "Facebook", iconSrc: facebookIcon },
          ]}
        />
        <UISocialLinks
          size="md"
          variant="outline"
          color="#922500"
          links={[
            { name: "Instagram", iconSrc: instagramIcon, href: "https://instagram.com" },
            { name: "Facebook", iconSrc: facebookIcon, href: "https://facebook.com" },
          ]}
        />
      </div>
    </DocSection>
  );
}


import {
    UIProductDescription,
    UIKitCarouselPagination,
    UIProductPagination,
    UIProductUsage,
    UITechnicalSheet,
} from "../../components/UIKit"
import { UIProductPage } from "../../components/UIKit/UIPagination/UIProductPage"
import {
    UIProductCard,
    UIProductCardButton,
} from "../../components/UIKit/UIProductCard"
import {
    UIProductCardModalCart,
    UIProductCardModalCartQuantityStepper,
} from "../../components/UIKit/UIProductCardModalCart"
import { UIAppointmentButton } from "../../components/UIKit/UIAppointmentButton"

const productCardExample = {
    imageSrc: new URL(
        "../../components/UIKit/UIProductCard/assets/product-card-example.png",
        import.meta.url,
    ).href,
    imageAlt: "Caja de bolsas biodegradables Paw Bags",
    name: "Bolsas Biodegradables Paw Bags (400 bolsas)",
    price: "$8.993",
    rating: 4,
}

const productCardModalCartExample = {
    imageSrc: new URL(
        "../../components/UIKit/UIProductCardModalCart/assets/product-churu.png",
        import.meta.url,
    ).href,
    imageAlt: "Envase de Ciao Churu de pollo con queso y carne",
    productName: "Ciao Churu Pollo con Queso y Carne 56g – 4 unidades",
    price: "$7.490",
    priceQuantity: 2,
}

type PaginationExampleProps = {
    title: string
    totalPages: number
    initialPage?: number
    colorScheme?: "primary" | "secondary"
    disabled?: boolean
}

function PaginationExample({
    title,
    totalPages,
    initialPage = 1,
    colorScheme = "primary",
    disabled = false,
}: PaginationExampleProps) {
    const [currentPage, setCurrentPage] = useState(initialPage)

    return (
        <section className="ui-kit-pagination-example">
            <h2>{title}</h2>
            <UIProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                colorScheme={colorScheme}
                disabled={disabled}
            />
        </section>
    )
}

// ======================================

function RadioExample() {
  const [selectedValue, setSelectedValue] = useState("selected");

  return (
    <section>
      <h2>Componente Radio Button</h2>
      <p>Estados del componente según Figma</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>Default</h3>
          <UIRadio
            name="radio-demo"
            value="default"
            label="Opción 1"
            checked={selectedValue === "default"}
            onChange={setSelectedValue}
          />
        </div>

        <div>
          <h3>Selected</h3>
          <UIRadio
            name="radio-demo"
            value="selected"
            label="Opción 2"
            checked={selectedValue === "selected"}
            onChange={setSelectedValue}
          />
        </div>

        <div>
          <h3>Disabled</h3>
          <UIRadio
            name="radio-disabled"
            value="disabled"
            label="No disponible"
            disabled
          />
        </div>

        <div>
          <h3>Focus</h3>
          <UIRadio
            name="radio-focus"
            value="focus"
            label="Usa la tecla Tab"
          />
        </div>

        <div>
          <h3>Error</h3>
          <UIRadio
            name="radio-error"
            value="error"
            label="Campo con error"
            error
          />
        </div>
      </div>
    </section>
  );
}

// ======================================
// COMPONENTE CHECKBOX
// ======================================

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  const [hoverChecked, setHoverChecked] = useState(false);
  const [selected, setSelected] = useState(true);
  const [focusChecked, setFocusChecked] = useState(false);
  const [errorChecked, setErrorChecked] = useState(false);

  return (
    <section>
      <h2>Componente Checkbox</h2>
      <p>Estados del componente según Figma</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>Default</h3>
          <UICheckbox
            label="Opción 1"
            checked={checked}
            onChange={setChecked}
          />
        </div>

        <div>
          <h3>Hover</h3>
          <UICheckbox
            label="Opción 2"
            checked={hoverChecked}
            onChange={setHoverChecked}
          />
          <p>Pasa el mouse por encima</p>
        </div>

        <div>
          <h3>Selected</h3>
          <UICheckbox
            label="Opción 3"
            checked={selected}
            onChange={setSelected}
          />
        </div>

        <div>
          <h3>Disabled</h3>
          <UICheckbox
            label="No disponible"
            checked={false}
            onChange={() => {}}
            disabled
          />
        </div>

        <div>
          <h3>Focus</h3>
          <UICheckbox
            label="Usa la tecla Tab"
            checked={focusChecked}
            onChange={setFocusChecked}
          />
        </div>

        <div>
          <h3>Error</h3>
          <UICheckbox
            label="Campo obligatorio"
            checked={errorChecked}
            onChange={setErrorChecked}
            error
          />
        </div>
      </div>
    </section>
  );
}

// ======================================
// COMPONENTE TOGGLE
// ======================================

function ToggleExample() {
  const [defaultChecked, setDefaultChecked] = useState(false);
  const [hoverChecked, setHoverChecked] = useState(false);
  const [selected, setSelected] = useState(true);
  const [focusChecked, setFocusChecked] = useState(false);
  const [errorChecked, setErrorChecked] = useState(false);

  return (
    <section>
      <h2>Componente Toggle</h2>
      <p>Estados del componente según Figma</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>Default</h3>
          <UIToggle
            label="Opción 1"
            checked={defaultChecked}
            onChange={setDefaultChecked}
          />
        </div>

        <div>
          <h3>Hover</h3>
          <UIToggle
            label="Opción 2"
            checked={hoverChecked}
            onChange={setHoverChecked}
          />
        </div>

        <div>
          <h3>Selected</h3>
          <UIToggle
            label="Opción 3"
            checked={selected}
            onChange={setSelected}
          />
        </div>

        <div>
          <h3>Disabled</h3>
          <UIToggle
            label="No disponible"
            checked={false}
            onChange={() => {}}
            disabled
          />
        </div>

        <div>
          <h3>Focus</h3>
          <UIToggle
            label="Usa la tecla Tab"
            checked={focusChecked}
            onChange={setFocusChecked}
          />
        </div>

        <div>
          <h3>Error</h3>
          <UIToggle
            label="Campo con error"
            checked={errorChecked}
            onChange={setErrorChecked}
            error
          />
        </div>
      </div>
    </section>
  );
}

// ======================================
// COMPONENTE FORM SELECTION
// ======================================

function FormSelectionExample() {
  const [shipping, setShipping] = useState("normal");
  const [payment, setPayment] = useState("mercado");
  const [vet, setVet] = useState("ana");

  return (
    <section>
      <h2>Componente Form Selection</h2>
      <p>Variantes del componente según Figma</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <div>
          <h3>Selección de envío</h3>
          <UIFormSelection
            type="shipping"
            value={shipping}
            onChange={setShipping}
            options={[
              {
                value: "normal",
                label: "Envío normal",
                price: "$3.990",
              },
              {
                value: "retiro",
                label: "Retiro en tienda",
                price: "Gratis",
              },
            ]}
          />
        </div>

        <div>
          <h3>Selección de pago</h3>
          <UIFormSelection
            type="payment"
            value={payment}
            onChange={setPayment}
            options={[
              {
                value: "mercado",
                label: "Mercado pago",
              },
              {
                value: "tarjeta",
                label: "Tarjeta de crédito, débito o prepago",
              },
              {
                value: "webpay",
                label: "Webpay Plus",
              },
            ]}
          />
        </div>

        <div>
          <h3>Selección de veterinario</h3>
          <UIFormSelection
            type="vet"
            value={vet}
            onChange={setVet}
            options={[
              {
                value: "ana",
                label: "Dra. Ana López",
                subtitle: "Especialista en felinos",
                time: "9:00",
              },
              {
                value: "otro",
                label: "Dra. Ana López",
                subtitle: "Especialista en felinos",
                time: "10:00",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

// ======================================
// COMPONENTE BUTTONS
// ======================================

function ButtonsExample() {
  return (
    <section>
      <h2>Componente Buttons</h2>
      <p>Variantes, tamaños e íconos según Figma</p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        {/* PRIMARY */}
        <div>
          <h3>Primary - Naranja</h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <UIButton
              variant="primary"
              size="L"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón L
            </UIButton>

            <UIButton
              variant="primary"
              size="M"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón M
            </UIButton>

            <UIButton
              variant="primary"
              size="S"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón S
            </UIButton>

            <UIButton
              variant="primary"
              size="L"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
              disabled
            >
              Disabled
            </UIButton>
          </div>
        </div>

        {/* SECONDARY */}
        <div>
          <h3>Secondary - Verde</h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <UIButton
              variant="secondary"
              size="L"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón L
            </UIButton>

            <UIButton
              variant="secondary"
              size="M"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón M
            </UIButton>

            <UIButton
              variant="secondary"
              size="S"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón S
            </UIButton>

            <UIButton
              variant="secondary"
              size="L"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
              disabled
            >
              Disabled
            </UIButton>
          </div>
        </div>

        {/* TERTIARY */}
        <div>
          <h3>Tertiary - Borde naranja</h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <UIButton
              variant="tertiary"
              size="L"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón L
            </UIButton>

            <UIButton
              variant="tertiary"
              size="M"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón M
            </UIButton>

            <UIButton
              variant="tertiary"
              size="S"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
            >
              Botón S
            </UIButton>

            <UIButton
              variant="tertiary"
              size="L"
              iconLeft={<PawIcon />}
              iconRight={<PlusIcon />}
              disabled
            >
              Disabled
            </UIButton>
          </div>
        </div>

        {/* EJEMPLOS SIN ÍCONOS */}
        <div>
          <h3>Botones sin íconos</h3>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <UIButton variant="primary" size="L">
              Continuar
            </UIButton>

            <UIButton variant="secondary" size="M">
              Guardar
            </UIButton>

            <UIButton variant="tertiary" size="S">
              Cancelar
            </UIButton>
          </div>
        </div>
      </div>

      <p>
        Pasa el mouse sobre los botones para probar Hover.
        Haz clic para probar Active y utiliza la tecla Tab
        para comprobar Focus.
      </p>
    </section>
  );
}

// ======================================
// COMPONENTE DROPDOWN
// ======================================

function DropdownExample() {
  const [documentType, setDocumentType] = useState("");
  const [region, setRegion] = useState("");
  const [commune, setCommune] = useState("");
  const [pet, setPet] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const fieldStyle = {
    width: "100%",
    maxWidth: "350px",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
    gap: "24px",
    marginTop: "20px",
    marginBottom: "30px",
  };

  return (
    <section>
      <h2>Componente Dropdown</h2>
      <p>
        Menús desplegables según Figma.
        Haz clic para elegir una opción.
      </p>

      <div style={gridStyle}>
        {/* BOLETA O FACTURA */}
        <div style={fieldStyle}>
          <h3>Boleta o factura</h3>
          <UIDropdown
            label="Tipo de documento"
            placeholder="¿Boleta o factura?"
            value={documentType}
            onChange={setDocumentType}
            options={[
              { value: "boleta", label: "Boleta" },
              { value: "factura", label: "Factura" },
            ]}
          />
        </div>

        {/* REGIÓN */}
        <div style={fieldStyle}>
          <h3>Región</h3>
          <UIDropdown
            label="Región"
            placeholder="Región"
            value={region}
            onChange={setRegion}
            options={[
              {
                value: "metropolitana",
                label: "Región Metropolitana de Santiago",
              },
              {
                value: "valparaiso",
                label: "Región de Valparaíso",
              },
            ]}
          />
        </div>

        {/* COMUNA */}
        <div style={fieldStyle}>
          <h3>Comuna</h3>
          <UIDropdown
            label="Comuna"
            placeholder="Comuna"
            value={commune}
            onChange={setCommune}
            options={[
              { value: "la-florida", label: "La Florida" },
              { value: "maipu", label: "Maipú" },
              { value: "las-condes", label: "Las Condes" },
              { value: "providencia", label: "Providencia" },
            ]}
          />
        </div>

        {/* MASCOTA */}
        <div style={fieldStyle}>
          <h3>Mascota (con ícono)</h3>
          <UIDropdown
            label="Tipo de mascota"
            placeholder="Seleccionar"
            iconLeft={<PawIcon />}
            value={pet}
            onChange={setPet}
            options={[
              { value: "perro", label: "Perro" },
              { value: "gato", label: "Gato" },
              { value: "ave", label: "Ave" },
              { value: "reptil", label: "Reptil" },
              { value: "roedor", label: "Roedor" },
              { value: "conejo", label: "Conejo" },
              { value: "huron", label: "Hurón" },
            ]}
          />
        </div>

        {/* DISABLED */}
        <div style={fieldStyle}>
          <h3>Deshabilitado</h3>
          <UIDropdown
            label="Campo deshabilitado"
            placeholder="No disponible"
            options={[
              { value: "ejemplo", label: "Ejemplo" },
            ]}
            disabled
          />
        </div>
      </div>

      {/* FECHA */}
      <h3>Fecha</h3>

      <div style={gridStyle}>
        <div style={fieldStyle}>
          <UIDropdown
            label="Día"
            placeholder="Día"
            value={day}
            onChange={setDay}
            options={Array.from(
              { length: 31 },
              (_, index) => ({
                value: String(index + 1),
                label: String(index + 1),
              })
            )}
          />
        </div>

        <div style={fieldStyle}>
          <UIDropdown
            label="Mes"
            placeholder="Mes"
            value={month}
            onChange={setMonth}
            options={[
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio",
              "Agosto",
              "Septiembre",
              "Octubre",
              "Noviembre",
              "Diciembre",
            ].map((label, index) => ({
              value: String(index + 1),
              label,
            }))}
          />
        </div>

        <div style={fieldStyle}>
          <UIDropdown
            label="Año"
            placeholder="Año"
            value={year}
            onChange={setYear}
            options={Array.from(
              { length: 11 },
              (_, index) => ({
                value: String(2026 - index),
                label: String(2026 - index),
              })
            )}
          />
        </div>
      </div>
    </section>
  );
}

type CarouselPaginationExampleProps = {
    title: string
    size?: "sm" | "md"
    initialSlide?: number
    clickable?: boolean
    disabled?: boolean
}

function CarouselPaginationExample({
    title,
    size = "md",
    initialSlide = 0,
    clickable = true,
    disabled = false,
}: CarouselPaginationExampleProps) {
    const [currentSlide, setCurrentSlide] = useState(initialSlide)

    return (
        <section className="ui-kit-pagination-example">
            <h2>{title}</h2>
            <UIKitCarouselPagination
                totalSlides={5}
                currentSlide={currentSlide}
                onSlideChange={setCurrentSlide}
                size={size}
                clickable={clickable}
                disabled={disabled}
            />
            <p>Diapositiva activa: {currentSlide + 1}</p>
        </section>
    )
}

function ProductCardModalCartExample() {
    const [quantity, setQuantity] = useState(1)
    const [removed, setRemoved] = useState(false)

    if (removed) {
        return (
            <div className="ui-kit-product-card-example__cards">
                <p>Producto quitado del carrito de ejemplo.</p>
                <button type="button" onClick={() => setRemoved(false)}>
                    Restaurar ejemplo
                </button>
            </div>
        )
    }

    return (
        <UIProductCardModalCart
            {...productCardModalCartExample}
            quantity={quantity}
            onRemove={() => setRemoved(true)}
            onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
            onIncrease={() => setQuantity((value) => value + 1)}
        />
    )
}

function ProductCardModalCartQuantityStepperExample() {
    const [quantity, setQuantity] = useState(1)

    return (
        <UIProductCardModalCartQuantityStepper
            quantity={quantity}
            onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
            onIncrease={() => setQuantity((value) => value + 1)}
        />
    )
}

export function UIKitComponents() {
    return (
        <main className="container ui-kit-components-page">
            <h1>UI Kit Components</h1>
            <p>
                UIProductPagination usa botones de página de 54 × 54 px, con 10 px de padding
                exterior y 16 px entre contenedores. La prop <code>colorScheme</code> permite
                elegir <code>"primary"</code> (predeterminado) o <code>"secondary"</code>, que
                combina verde claro y verde oscuro para la página seleccionada.
            </p>
            <div className="ui-kit-components">
{/* COMPONENTE OPTION */}
        <section>
          <h2>Componente Option</h2>
          <p>Estados del componente según Figma</p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              marginTop: "20px",
              marginBottom: "30px",
            }}
          >
            <div style={{ width: "180px" }}>
              <h3>Default</h3>
              <UIOption texto="Opción 1" />
            </div>

            <div style={{ width: "180px" }}>
              <h3>Hover</h3>
              <UIOption texto="Opción 1" />
              <small>Pasa el mouse por encima</small>
            </div>

            <div style={{ width: "180px" }}>
              <h3>Selected</h3>
              <UIOption texto="Opción 1" selected />
            </div>

            <div style={{ width: "180px" }}>
              <h3>Selected + Hover</h3>
              <UIOption texto="Opción 1" selected />
              <small>Pasa el mouse por encima</small>
            </div>
          </div>
        </section>

        {/* COMPONENTE RADIO */}
        <RadioExample />

        {/* COMPONENTE CHECKBOX */}
        <CheckboxExample />

        {/* COMPONENTE TOGGLE */}
        <ToggleExample />

        {/* COMPONENTE FORM SELECTION */}
        <FormSelectionExample />

        {/* COMPONENTE BUTTONS */}
        <ButtonsExample />
        {/* COMPONENTE SEARCH INPUT */}
                <SearchInputExample />

                {/* COMPONENTE INPUT */}
                <InputExample />

                {/* COMPONENTE STEPPER */}
                <StepperExample />

                {/* COMPONENTE ICON BUTTON */}
                <IconButtonExample />

                {/* COMPONENTE BADGE */}
                <BadgeExample />

                {/* COMPONENTE TEXT LINK */}
                <TextLinkExample />

                {/* COMPONENTE LINK */}
                <LinkExample />

                {/* COMPONENTE QUALIFICATION */}
                <QualificationExample />

                {/* COMPONENTE NAV ITEM */}
                <NavItemExample />

                {/* COMPONENTE LOGO */}
                <LogoExample />

                {/* COMPONENTES MENU GROUP, MENU ITEM Y SUBMENU */}
                <MenuExample />

                {/* COMPONENTE DROPDOWN PANEL */}
                <DropDownPanelExample />

                {/* COMPONENTES FOOTER: INFO BLOCK, LINK LIST Y SOCIAL LINKS */}
                <FooterPiecesExample />

        {/* COMPONENTE DROPDOWN */}
        <DropdownExample />
                <PaginationExample title="Paginación básica (5 páginas)" totalPages={5} />
                <PaginationExample
                    title="Paginación — variante secundaria (verde)"
                    totalPages={5}
                    initialPage={3}
                    colorScheme="secondary"
                />
                <PaginationExample title="Paginación (10 páginas)" totalPages={10} initialPage={4} />
                <PaginationExample title="Paginación (20 páginas)" totalPages={20} initialPage={12} />
                <PaginationExample
                    title="Paginación deshabilitada"
                    totalPages={10}
                    initialPage={3}
                    disabled
                />
                <section className="ui-kit-pagination-example">
                    <h2>UIProductPage</h2>
                    <p>
                        Muestra el número de una página. La prop opcional <code>color</code>
                        acepta una clase CSS para cambiar el fondo.
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-base)" }}>
                        <UIProductPage number={1} />
                        <UIProductPage number={2} color="bg-color-primary" />
                    </div>
                    <p>
                        <code>{'<UIProductPage number={1} color="bg-color-primary" />'}</code>
                    </p>
                </section>
                <CarouselPaginationExample title="Carrusel — tamaño md (5 diapositivas)" />
                <CarouselPaginationExample
                    title="Carrusel — tamaño sm (5 diapositivas)"
                    size="sm"
                    initialSlide={2}
                />
                <CarouselPaginationExample
                    title="Carrusel — última diapositiva activa"
                    initialSlide={4}
                />
                <CarouselPaginationExample
                    title="Carrusel — no interactivo"
                    initialSlide={1}
                    clickable={false}
                />
                <CarouselPaginationExample
                    title="Carrusel — deshabilitado"
                    initialSlide={3}
                    disabled
                />
                <section className="ui-kit-pagination-example ui-kit-product-description-example">
                    <h2>Accordion de descripción del producto</h2>
                    <p>
                        Usa el encabezado para expandir o contraer cada sección. El contenido
                        acepta cualquier elemento o componente React mediante <code>children</code>.
                    </p>
                    <UIProductDescription type="technical">
                        <UITechnicalSheet
                            variant="common"
                            data={{
                                especie: "Gato o perro",
                                funcion: "Filtra los residuos, ablanda el agua de grifo y neutraliza los olores.",
                                capacidad: "2 litros",
                                peso: "678 gramos",
                                medidas: "20,5 cm x 20,5 cm x 17 cm",
                                material: "Acero inoxidable",
                                caracteristicas: [
                                    "Bomba supersilenciosa y desmontable",
                                    "Filtro de triple acción",
                                    "Apagado automático",
                                    "Indicador LED de bajo nivel de agua y depósito vacío",
                                ],
                            }}
                        />
                    </UIProductDescription>
                    <UIProductDescription
                        type="technical"
                        defaultOpen={true}
                    >
                        <UITechnicalSheet
                            variant="food"
                            data={{
                                especie: "Perro",
                                etapaVida: "Adulto",
                                saborPrincipal: "Pollo",
                                condicionEspecial: "Digestión sensible",
                                ingredientes: "Pollo, arroz, maíz y otros ingredientes.",
                                colorantes: "No contiene",
                                conservantes: "Conservantes naturales",
                                informacionNutricional: "Proteína: 28%, Grasa: 15%, Fibra: 3%",
                            }}
                        />
                    </UIProductDescription>
                    <UIProductDescription type="usage">
                        <UIProductUsage
                            description={"Llene el depósito con agua limpia.\nConecte la fuente de alimentación y espere a que el sistema comience a funcionar."}
                        />
                    </UIProductDescription>
                    <UIProductDescription type="usage" title="Contenido personalizado">
                        <p>
                            También puedes pasar contenido React directamente, como texto,
                            imágenes, tablas o componentes propios. El título puede personalizarse.
                        </p>
                    </UIProductDescription>
                    <div className="ui-kit-product-description-example__api">
                        <h3>Componentes y props</h3>
                        <dl>
                            <div>
                                <dt>UIProductDescription</dt>
                                <dd>
                                    <code>type</code>: <code>technical</code> o <code>usage</code>.
                                    El título y el icono se definen automáticamente; ambos pueden
                                    sobrescribirse con <code>title</code> e <code>icon</code>.
                                </dd>
                            </div>
                            <div>
                                <dt>UITechnicalSheet</dt>
                                <dd>
                                    Elige <code>variant=&quot;common&quot;</code> o{" "}
                                    <code>variant=&quot;food&quot;</code> y pasa sus datos tipados
                                    en <code>data</code>. Los campos vacíos se omiten.
                                </dd>
                            </div>
                            <div>
                                <dt>UIProductUsage</dt>
                                <dd>
                                    Recibe el contenido sin encabezado interno en la prop{" "}
                                    <code>description</code>; admite texto, saltos de línea y
                                    contenido React.
                                </dd>
                            </div>
                            <div>
                                <dt>Otras props</dt>
                                <dd>
                                    <code>children</code> también admite cualquier contenido React;{" "}
                                    <code>defaultOpen</code> inicia expandido y <code>className</code>{" "}
                                    agrega clases.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>
                <section className="ui-kit-pagination-example ui-kit-product-card-example">
                    <h2>Tarjeta de producto</h2>
                    <p>
                        Tarjeta responsive para mostrar imagen, calificación, precio y descuento.
                        El precio anterior y el manejo de errores de imagen son opcionales; el
                        botón muestra el carrito, un indicador de carga o una confirmación.
                    </p>
                    <div className="ui-kit-product-card-example__cards">
                        <div>
                            <h3>Seleccionado con descuento (Figma)</h3>
                            <UIProductCard
                                {...productCardExample}
                                discountPercentage={22}
                                buttonLabel="Producto agregado"
                                selected
                                onAddToCart={() => undefined}
                            />
                        </div>
                        <div>
                            <h3>Sin descuento</h3>
                            <UIProductCard
                                {...productCardExample}
                                buttonLabel="Agregar al carrito"
                                onAddToCart={() => undefined}
                            />
                        </div>
                    </div>
                    <h3>UIProductCardButton</h3>
                    <div className="ui-kit-product-card-example__buttons">
                        <UIProductCardButton
                            label="Agregar al carrito"
                            onClick={() => undefined}
                        />
                        <UIProductCardButton
                            label="Producto agregado"
                            onClick={() => undefined}
                            selected
                        />
                        <UIProductCardButton
                            label="Cargando"
                            onClick={() => undefined}
                            loading
                        />
                        <UIProductCardButton
                            label="No disponible"
                            onClick={() => undefined}
                            disabled
                        />
                    </div>
                    <p>
                        Prueba hover y active al pasar el puntero y hacer clic. Usa Tab para
                        comprobar el foco visible. Sin stock no aparece en la selección de Figma;
                        disabled se muestra como estado de botón.
                    </p>
                    <div className="ui-kit-product-card-example__api">
                        <h3>Props de UIProductCard</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>imageSrc</td><td>string</td><td>Sí</td><td>—</td><td>URL o ruta de la imagen del producto.</td></tr>
                                    <tr><td>imageAlt</td><td>string</td><td>Sí</td><td>—</td><td>Texto alternativo significativo.</td></tr>
                                    <tr><td>name</td><td>string</td><td>Sí</td><td>—</td><td>Nombre que se muestra en la tarjeta.</td></tr>
                                    <tr><td>price</td><td>string</td><td>Sí</td><td>—</td><td>Precio con formato de presentación.</td></tr>
                                    <tr><td>previousPrice</td><td>string</td><td>No</td><td>—</td><td>Precio anterior tachado; se omite si no se informa.</td></tr>
                                    <tr><td>rating</td><td>number</td><td>No</td><td>—</td><td>Calificación opcional redondeada y limitada al rango de 0 a 5.</td></tr>
                                    <tr><td>buttonLabel</td><td>string</td><td>Sí</td><td>—</td><td>Texto accesible del botón.</td></tr>
                                    <tr><td>onAddToCart</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback al activar el botón.</td></tr>
                                    <tr><td>onImageError</td><td>ReactEventHandler&lt;HTMLImageElement&gt;</td><td>No</td><td>—</td><td>Callback para manejar errores al cargar la imagen.</td></tr>
                                    <tr><td>discountPercentage</td><td>number</td><td>No</td><td>—</td><td>Porcentaje de descuento; si se omite, no se muestra la insignia.</td></tr>
                                    <tr><td>selected</td><td>boolean</td><td>No</td><td>false</td><td>Representa el estado agregado del diseño.</td></tr>
                                    <tr><td>buttonDisabled</td><td>boolean</td><td>No</td><td>false</td><td>Deshabilita el botón de agregar al carrito.</td></tr>
                                    <tr><td>className</td><td>string</td><td>No</td><td>&quot;&quot;</td><td>Clase adicional para el artículo.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Props de UIProductCardButton</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>label</td><td>string</td><td>Sí</td><td>—</td><td>Texto del botón.</td></tr>
                                    <tr><td>onClick</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback de activación.</td></tr>
                                    <tr><td>disabled</td><td>boolean</td><td>No</td><td>false</td><td>Deshabilita la activación.</td></tr>
                                    <tr><td>loading</td><td>boolean</td><td>No</td><td>false</td><td>Muestra el indicador y deshabilita el botón.</td></tr>
                                    <tr><td>selected</td><td>boolean</td><td>No</td><td>false</td><td>Muestra el check y expone el estado pulsado.</td></tr>
                                    <tr><td>className</td><td>string</td><td>No</td><td>&quot;&quot;</td><td>Clase adicional para el botón.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Props de UIProductCardDiscount y UIProductCardRating</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Componente</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>UIProductCardDiscount</td><td>percentage</td><td>number</td><td>Sí</td><td>—</td><td>Porcentaje de descuento con su icono.</td></tr>
                                    <tr><td>UIProductCardRating</td><td>rating</td><td>number</td><td>Sí</td><td>—</td><td>Calificación representada con cinco estrellas.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Uso</h3>
                        <pre><code>{`<UIProductCard
  imageSrc={product.image}
  imageAlt={product.imageAlt}
  name={product.name}
  price={product.price}
  previousPrice={product.previousPrice}
  rating={product.rating}
  discountPercentage={product.discountPercentage}
  buttonLabel="Agregar al carrito"
  onAddToCart={handleAddToCart}
/>`}</code></pre>
                    </div>
                </section>
                <section className="ui-kit-pagination-example ui-kit-product-card-example">
                    <h2>UIProductCardModalCart</h2>
                    <p>
                        Muestra un producto del carrito con su imagen, precio, cantidad y acción
                        para quitarlo. El padre controla el contador y la cantidad mostrada junto
                        al precio mediante props.
                    </p>
                    <ProductCardModalCartExample />
                    <p>
                        Prueba los botones de cantidad con clic, hover y teclado. Usa Tab para
                        comprobar el foco visible; el botón de quitar restaura el ejemplo al usar
                        “Restaurar ejemplo”. Figma no define estados disabled o loading para esta pieza.
                    </p>
                    <div className="ui-kit-product-card-example__api">
                        <h3>Props de UIProductCardModalCart</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>imageSrc</td><td>string</td><td>Sí</td><td>—</td><td>Origen de la imagen del producto.</td></tr>
                                    <tr><td>imageAlt</td><td>string</td><td>Sí</td><td>—</td><td>Texto alternativo de la imagen.</td></tr>
                                    <tr><td>productName</td><td>string</td><td>Sí</td><td>—</td><td>Nombre del producto.</td></tr>
                                    <tr><td>price</td><td>string</td><td>Sí</td><td>—</td><td>Precio con formato de presentación.</td></tr>
                                    <tr><td>priceQuantity</td><td>number</td><td>Sí</td><td>—</td><td>Cantidad mostrada junto al precio.</td></tr>
                                    <tr><td>quantity</td><td>number</td><td>Sí</td><td>—</td><td>Cantidad actual mostrada en el stepper.</td></tr>
                                    <tr><td>onRemove</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback para quitar el producto.</td></tr>
                                    <tr><td>onDecrease</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback para solicitar una disminución.</td></tr>
                                    <tr><td>onIncrease</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback para solicitar un aumento.</td></tr>
                                    <tr><td>className</td><td>string</td><td>No</td><td>&quot;&quot;</td><td>Clase adicional del artículo.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Uso</h3>
                        <pre><code>{`<UIProductCardModalCart
  imageSrc={product.imageSrc}
  imageAlt={product.imageAlt}
  productName={product.name}
  price={product.price}
  priceQuantity={product.priceQuantity}
  quantity={quantity}
  onRemove={handleRemove}
  onDecrease={handleDecrease}
  onIncrease={handleIncrease}
/>`}</code></pre>
                    </div>
                </section>
                <section className="ui-kit-pagination-example ui-kit-product-card-example">
                    <h2>UIProductCardModalCartQuantityStepper</h2>
                    <p>
                        Subcomponente controlado para mostrar y cambiar la cantidad de un producto.
                        El padre decide las reglas de incremento y decremento.
                    </p>
                    <ProductCardModalCartQuantityStepperExample />
                    <p>
                        Pasa el puntero sobre los controles y actívalos para ver hover y active.
                        Usa Tab y Enter o Espacio para comprobar el foco visible y la activación.
                    </p>
                    <div className="ui-kit-product-card-example__api">
                        <h3>Props de UIProductCardModalCartQuantityStepper</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>quantity</td><td>number</td><td>Sí</td><td>—</td><td>Cantidad actual.</td></tr>
                                    <tr><td>onDecrease</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback para disminuir.</td></tr>
                                    <tr><td>onIncrease</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback para aumentar.</td></tr>
                                    <tr><td>className</td><td>string</td><td>No</td><td>&quot;&quot;</td><td>Clase adicional del stepper.</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Uso</h3>
                        <pre><code>{`<UIProductCardModalCartQuantityStepper
  quantity={quantity}
  onDecrease={handleDecrease}
  onIncrease={handleIncrease}
/>`}</code></pre>
                    </div>
                </section>
                <section className="ui-kit-pagination-example ui-kit-product-card-example">
                    <h2>Botón de selección de agendamiento</h2>
                    <p>
                        Permite elegir entre agendar por fecha y hora o por veterinario.
                        El estado seleccionado se representa con un fondo específico para cada opción.
                    </p>
                    <p>Selecciona o vuelve a presionar cada opción para alternar su estado.</p>
                    <UIAppointmentButton
                        appointmentType="date-time"
                        title="Por fecha y hora"
                        description="Revisa la disponibilidad de todos los veterinarios según el día."
                        onClick={() => undefined}
                    />
                    <UIAppointmentButton
                        appointmentType="veterinarian"
                        title="Por veterinario"
                        description="Elige un profesional y revisa sus horarios disponibles."
                        onClick={() => undefined}
                    />
                    <p>
                        El estado seleccionado cambia el fondo, sin agregar bordes al pasar el puntero
                        o presionar. Usa Tab para comprobar el foco visible.
                    </p>
                    <div className="ui-kit-product-card-example__api">
                        <h3>Props de UIAppointmentButton</h3>
                        <div className="ui-kit-product-card-example__table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Requerida</th>
                                        <th>Por defecto</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>appointmentType</td>
                                        <td>&quot;date-time&quot; | &quot;veterinarian&quot;</td>
                                        <td>Sí</td>
                                        <td>—</td>
                                        <td>Tipo de agendamiento; determina el icono y el color al seleccionar.</td>
                                    </tr>
                                    <tr>
                                        <td>title</td>
                                        <td>string</td>
                                        <td>Sí</td>
                                        <td>—</td>
                                        <td>Texto destacado del botón.</td>
                                    </tr>
                                    <tr>
                                        <td>description</td>
                                        <td>string</td>
                                        <td>Sí</td>
                                        <td>—</td>
                                        <td>Descripción debajo del título.</td>
                                    </tr>
                                    <tr>
                                        <td>onClick</td>
                                        <td>() =&gt; void</td>
                                        <td>Sí</td>
                                        <td>—</td>
                                        <td>Callback al activar la opción.</td>
                                    </tr>
                                    <tr>
                                        <td>state</td>
                                        <td>&quot;default&quot; | &quot;selected&quot;</td>
                                        <td>No</td>
                                        <td>Interno: &quot;default&quot;; controlado: no aplica</td>
                                        <td>Estado opcional controlado; si se omite, el botón alterna entre default y selected al activarse.</td>
                                    </tr>
                                    <tr>
                                        <td>onStateChange</td>
                                        <td>(state: UIAppointmentButtonState) =&gt; void</td>
                                        <td>No</td>
                                        <td>—</td>
                                        <td>Notifica el siguiente estado; junto con state permite controlar la selección desde el padre.</td>
                                    </tr>
                                    <tr>
                                        <td>className</td>
                                        <td>string</td>
                                        <td>No</td>
                                        <td>&quot;&quot;</td>
                                        <td>Clase CSS adicional.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3>Uso</h3>
                        <pre><code>{`<UIAppointmentButton
  appointmentType="date-time"
  title="Por fecha y hora"
  description="Revisa la disponibilidad según el día."
  state="selected"
  onClick={handleAppointmentTypeChange}
/>`}</code></pre>
                    </div>
                </section>
            </div>
        </main>
    )
}