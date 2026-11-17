
import { useState } from "react";

import { UIProductPagination } from "../../components/UIKit/UIPagination/UIProductPagination";
import UIOption from "../../components/UIKit/UIOption/UIOption";
import UIRadio from "../../components/UIKit/UIRadio/UIRadio";
import { UICheckbox } from "../../components/UIKit/UICheckbox/UICheckbox";
import { UIToggle } from "../../components/UIKit/UIToggle/UIToggle";
import { UIFormSelection } from "../../components/UIKit/UIFormSelection/UIFormSelection";
import UIButton from "../../components/UIKit/UIButton/UIButton";
import { PawIcon, PlusIcon } from "../../components/UIKit/UIButton/ButtonIcons";
import { UIDropdown } from "../../components/UIKit/UIDropdown/UIDropdown";

// ======================================
// COMPONENTE PAGINATION
// ======================================

type PaginationExampleProps = {
  title: string;
  totalPages: number;
  initialPage?: number;
  disabled?: boolean;
};

function PaginationExample({
  title,
  totalPages,
  initialPage = 1,
  disabled = false,
}: PaginationExampleProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <section className="ui-kit-pagination-example">
      <h2>{title}</h2>
      <UIProductPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        disabled={disabled}
      />
    </section>
  );
}

// ======================================
// COMPONENTE RADIO
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

// ======================================
// PÁGINA PRINCIPAL DEL UI KIT
// ======================================

export function UIKitComponents() {
  return (
    <main className="container ui-kit-components-page">
      <h1>UI Kit Components</h1>

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

        {/* COMPONENTE PAGINATION */}
        <PaginationExample
          title="Paginación básica (5 páginas)"
          totalPages={5}
        />

        <PaginationExample
          title="Paginación (10 páginas)"
          totalPages={10}
          initialPage={4}
        />

        <PaginationExample
          title="Paginación (20 páginas)"
          totalPages={20}
          initialPage={12}
        />

        <PaginationExample
          title="Paginación deshabilitada"
          totalPages={10}
          initialPage={3}
          disabled
        />

      </div>
    </main>
  );
}
