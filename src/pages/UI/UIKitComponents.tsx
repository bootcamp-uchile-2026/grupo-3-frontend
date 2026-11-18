import { useState } from "react";

import UIOption from "../../components/UIKit/UIOption/UIOption";
import UIRadio from "../../components/UIKit/UIRadio/UIRadio";
import { UICheckbox } from "../../components/UIKit/UICheckbox/UICheckbox";
import { UIToggle } from "../../components/UIKit/UIToggle/UIToggle";
import { UIFormSelection } from "../../components/UIKit/UIFormSelection/UIFormSelection";
import UIButton from "../../components/UIKit/UIButton/UIButton";
import { PawIcon, PlusIcon } from "../../components/UIKit/UIButton/ButtonIcons";
import { UIDropdown } from "../../components/UIKit/UIDropdown/UIDropdown";
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
                        Tarjeta responsive para mostrar imagen, calificación, precio y descuento
                        opcional. La variante de Figma corresponde al estado seleccionado.
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
                                    <tr><td>rating</td><td>number</td><td>Sí</td><td>—</td><td>Calificación redondeada y limitada al rango de 0 a 5.</td></tr>
                                    <tr><td>buttonLabel</td><td>string</td><td>Sí</td><td>—</td><td>Texto accesible del botón.</td></tr>
                                    <tr><td>onAddToCart</td><td>() =&gt; void</td><td>Sí</td><td>—</td><td>Callback al activar el botón.</td></tr>
                                    <tr><td>discountPercentage</td><td>number</td><td>No</td><td>—</td><td>Porcentaje de descuento; si se omite, no se muestra la insignia.</td></tr>
                                    <tr><td>selected</td><td>boolean</td><td>No</td><td>false</td><td>Representa el estado agregado del diseño.</td></tr>
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