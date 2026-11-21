import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import {
  selectProductos,
  selectSubtotalCarrito,
  selectDescuentoCarrito,
  selectTotalCarrito,
  useCarritoStore,
} from "../../store/carritoStore";
import { mensajePedidoPendiente, usePedidosStore } from "../../store/pedidosStore";
import type { CreatePedidoDto, MetodoPago, TipoComprobante, TipoEntrega } from "../../schemas/pedidos";
import { CouponBox } from "../../components/CouponBox/CouponBox";
import { UIInput } from "../../components/UIKit/UIInput/UIInput";
import { UIStepper } from "../../components/UIKit/UIStepper/UIStepper";
import { UIFormSelection } from "../../components/UIKit/UIFormSelection/UIFormSelection";
import { UICheckbox } from "../../components/UIKit/UICheckbox/UICheckbox";
import UIButton from "../../components/UIKit/UIButton/UIButton";
import {
  IconChevronLeft,
  IconDocument,
  IconLocation,
  IconPayment,
  IconTruck,
  IconUser,
} from "../../components/UIKit/UIIcons";

type DatosCheckout = {
  nombre: string;
  apellidos: string;
  correoElectronico: string;
  telefono: string;
  tipoComprobante: TipoComprobante | "";
  rutDocumento: string;
  region: string;
  comuna: string;
  direccion: string;
  departamentoOficina: string;
  referencia: string;
  sucursalRetiro: string;
};

const pasos = ["Datos", "Tipo de entrega", "Pago"];
const consultaPasosMoviles = "(max-width: 600px)";
const formularioCupon = "checkout-cupon";

function validarCampos(contenedor: HTMLElement | null): boolean {
  if (!contenedor) return false;
  return Array.from(contenedor.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input, select"))
    .every((campo) => campo.reportValidity());
}

const formatoCLP = (monto: number): string =>
  `$${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(monto)}`;

function ImagenProductoResumen({ src, nombre }: { src: string; nombre: string }) {
  const [urlFallida, setUrlFallida] = useState<string | null>(null);

  if (!src || urlFallida === src) {
    return (
      <div
        className="checkout-page__imagen checkout-page__imagen--sin-foto"
        role="img"
        aria-label={`Imagen no disponible para ${nombre}`}
      >
        Imagen no disponible
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={nombre}
      className="checkout-page__imagen"
      onError={() => setUrlFallida(src)}
    />
  );
}

export function Checkout() {
  const navigate = useNavigate();
  const carritoId = useCarritoStore((state) => state.carritoId);
  const productos = useCarritoStore(useShallow(selectProductos));
  const inicializarCarrito = useCarritoStore((state) => state.inicializar);
  const aplicarCupon = useCarritoStore((state) => state.aplicarCupon);
  const cuponAplicado = useCarritoStore((state) => state.cuponAplicado);
  const estadoCarrito = useCarritoStore((state) => state.estado);
  const errorCarrito = useCarritoStore((state) => state.error);
  const subtotal = useCarritoStore(selectSubtotalCarrito);
  const descuento = useCarritoStore(selectDescuentoCarrito);
  const totalCarrito = useCarritoStore(selectTotalCarrito);
  const [datos, setDatos] = useState<DatosCheckout>({
    nombre: "",
    apellidos: "",
    correoElectronico: "",
    telefono: "",
    tipoComprobante: "",
    rutDocumento: "",
    region: "",
    comuna: "",
    direccion: "",
    departamentoOficina: "",
    referencia: "",
    sucursalRetiro: "",
  });
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega | "">("");
  const [metodoPago, setMetodoPago] = useState<MetodoPago | "">("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const enviarPedido = usePedidosStore((state) => state.enviarPedido);
  const enviando = usePedidosStore((state) => state.estado === "submitting");
  const carritoPendiente = usePedidosStore((state) => state.carritoPendiente);
  const compraPendiente = carritoId !== null && carritoPendiente === carritoId;
  const [error, setError] = useState<string | null>(null);
  const [paso, setPaso] = useState(0);
  const [errorPaso, setErrorPaso] = useState("");
  const [cupon, setCupon] = useState("");
  const [errorCupon, setErrorCupon] = useState<string | null>(null);
  const [aplicandoCupon, setAplicandoCupon] = useState(false);
  const datosPanel = useRef<HTMLDivElement>(null);
  const entregaPanel = useRef<HTMLDivElement>(null);
  const inicioPasos = useRef<HTMLDivElement>(null);
  const cuponEnCurso = useRef(false);
  const montado = useRef(false);
  const cargandoCarrito = estadoCarrito === "idle" || estadoCarrito === "loading";

  useEffect(() => {
    montado.current = true;

    void inicializarCarrito().catch((cause: unknown) => {
      if (montado.current) {
        setError(cause instanceof Error ? cause.message : "No se pudo cargar el carrito.");
      }
    });

    return () => {
      montado.current = false;
    };
  }, [inicializarCarrito]);

  function actualizarDato(campo: keyof DatosCheckout, valor: string) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
  }

  function cambiarPaso(siguiente: number) {
    setErrorPaso("");
    setPaso(siguiente);
    requestAnimationFrame(() => inicioPasos.current?.focus());
  }

  function avanzarPaso() {
    if (paso === 0 && !validarCampos(datosPanel.current)) return;
    if (paso === 1) {
      if (!tipoEntrega) {
        setErrorPaso("Selecciona cómo quieres recibir tu pedido.");
        return;
      }
      if (!validarCampos(entregaPanel.current)) return;
    }
    cambiarPaso(paso + 1);
  }

  async function enviarCupon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (cuponEnCurso.current || usePedidosStore.getState().estado === "submitting" || compraPendiente || cargandoCarrito || !productos.length) return;
    const codigo = cupon.trim().toUpperCase();
    if (!codigo) {
      setErrorCupon("Ingresa un código promocional.");
      return;
    }
    cuponEnCurso.current = true;
    setAplicandoCupon(true);
    setErrorCupon(null);
    try {
      await aplicarCupon(codigo);
      setCupon("");
    } catch (cause) {
      setErrorCupon(cause instanceof Error ? cause.message : "No se pudo aplicar el cupón.");
    } finally {
      cuponEnCurso.current = false;
      setAplicandoCupon(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const movil = window.matchMedia(consultaPasosMoviles).matches;
    if (movil && paso < 2) {
      avanzarPaso();
      return;
    }

    setError(null);
    if (enviando || compraPendiente || cuponEnCurso.current) return;
    const primerCampoInvalido = event.currentTarget.querySelector<HTMLInputElement | HTMLSelectElement>("input:invalid, select:invalid");
    if (primerCampoInvalido) {
      if (movil) {
        cambiarPaso(datosPanel.current?.contains(primerCampoInvalido) ? 0 : 1);
        requestAnimationFrame(() => primerCampoInvalido.reportValidity());
      } else {
        primerCampoInvalido.reportValidity();
      }
      return;
    }
    if (cargandoCarrito) {
      setError("Espera a que cargue el carrito antes de finalizar la compra.");
      return;
    }
    if (!carritoId || productos.length === 0) {
      setError("No puedes crear un pedido con el carrito vacío.");
      return;
    }
    if (!aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones para continuar.");
      return;
    }
    if (!datos.tipoComprobante || !tipoEntrega || !metodoPago) {
      setError("Completa los campos obligatorios antes de continuar.");
      return;
    }
    if (
      tipoEntrega === "EnvioNormal"
      && (!datos.region.trim() || !datos.comuna.trim() || !datos.direccion.trim())
    ) {
      setError("Completa región, comuna y dirección para el envío.");
      return;
    }
    if (tipoEntrega === "RetiroEnTienda" && !datos.sucursalRetiro.trim()) {
      setError("Indica la sucursal donde retirarás el pedido.");
      return;
    }

    const comprador = {
      nombre: datos.nombre,
      apellidos: datos.apellidos,
      correoElectronico: datos.correoElectronico,
      telefono: datos.telefono,
      tipoComprobante: datos.tipoComprobante,
      rutDocumento: datos.rutDocumento,
      metodoPago,
      aceptaTerminos,
    };
    const datosPedido: CreatePedidoDto = tipoEntrega === "EnvioNormal"
      ? {
        ...comprador,
        tipoEntrega,
        region: datos.region,
        comuna: datos.comuna,
        direccion: datos.direccion,
        departamentoOficina: datos.departamentoOficina.trim() || undefined,
        referencia: datos.referencia.trim() || undefined,
      }
      : { ...comprador, tipoEntrega, sucursalRetiro: datos.sucursalRetiro };

    try {
      const pedido = await enviarPedido(carritoId, datosPedido);
      if (montado.current) {
        navigate(`/carrito-compras/confirmacion-pedido/${encodeURIComponent(pedido.id)}`);
      }
    } catch (cause) {
      if (montado.current) {
        setError(cause instanceof Error ? cause.message : "No se pudo crear el pedido.");
      }
    }
  }

  return (
    <section className="checkout-page">
      {!enviando && !error && carritoPendiente && (compraPendiente || productos.length === 0) && (
        <p className="checkout-page__error" role="alert">{mensajePedidoPendiente}</p>
      )}
      <form id={formularioCupon} onSubmit={enviarCupon} />
      <form noValidate onSubmit={handleSubmit} className="checkout-page__container" data-paso={paso}>
        <div className="checkout-page__progreso" ref={inicioPasos} tabIndex={-1}>
          <UIButton
            variant="tertiary"
            size="M"
            iconLeft={<IconChevronLeft color="currentColor" />}
            onClick={() => paso > 0 ? cambiarPaso(paso - 1) : navigate("/carrito-compras")}
          >
            Volver
          </UIButton>
          <UIStepper steps={pasos} current={paso} color="orange" size="sm" onStepClick={cambiarPaso} ariaLabel="Pasos de compra" />
        </div>
        <div className="checkout-page__datos" ref={datosPanel}>
          <div className="checkout-page__titulo">
            <IconUser color="var(--primario-70-color)" size={24} aria-hidden="true" />
            <h1>Datos para el despacho</h1>
          </div>
          <div className="checkout-page__campos-datos">
            <div className="checkout-page__fila-nombre">
              <UIInput label="Nombre" name="nombre" autoComplete="given-name" value={datos.nombre}
                onChange={(valor) => actualizarDato("nombre", valor)} required />
              <UIInput label="Apellido" name="apellidos" autoComplete="family-name" value={datos.apellidos}
                onChange={(valor) => actualizarDato("apellidos", valor)} required />
            </div>
            <label className="checkout-page__campo">
              <span>E-Mail<span className="checkout-page__requerido">*</span></span>
              <input
                type="email"
                inputMode="email"
                name="correoElectronico"
                placeholder="nombre.apellido@ejemplo.com"
                autoComplete="email"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Ingresa un correo válido, por ejemplo nombre@dominio.com"
                value={datos.correoElectronico}
                onChange={(event) => actualizarDato("correoElectronico", event.target.value)}
                required
              />
            </label>
            <label className="checkout-page__campo" htmlFor="tipo-comprobante">
              <span>Boleta o Factura<span className="checkout-page__requerido">*</span></span>
              <select id="tipo-comprobante" value={datos.tipoComprobante}
                onChange={(event) => actualizarDato("tipoComprobante", event.target.value)} required>
                <option value="" disabled>¿Boleta o factura?</option>
                <option value="Boleta">Boleta</option>
                <option value="Factura">Factura</option>
              </select>
            </label>
            <UIInput label="Teléfono" type="tel" name="telefono" autoComplete="tel" inputMode="tel"
              value={datos.telefono} onChange={(valor) => actualizarDato("telefono", valor)} required />
            <UIInput label="RUT o Nro. de documento" name="rutDocumento" value={datos.rutDocumento}
              onChange={(valor) => actualizarDato("rutDocumento", valor)} required />
          </div>
        </div>

        <div className="checkout-page__entrega" ref={entregaPanel}>
          <UIFormSelection
            type="shipping"
            titleIcon={<IconTruck color="currentColor" aria-hidden="true" />}
            size="M"
            name="tipoEntrega"
            title="¿Recibes o retiras tu pedido?"
            value={tipoEntrega}
            onChange={(value) => {
              setTipoEntrega(value as TipoEntrega);
              setErrorPaso("");
            }}
            options={[
              { value: "EnvioNormal", label: "Envío normal", price: "$3.990" },
              { value: "RetiroEnTienda", label: "Retiro en tienda", price: "Gratis" },
            ]}
          />

          {tipoEntrega === "EnvioNormal" && (
            <div className="checkout-page__detalle-entrega">
              <h2>Dirección de entrega</h2>
              <div className="checkout-page__domicilio">
                <IconLocation color="var(--primario-90-color)" size={24} aria-hidden="true" />
                <div className="checkout-page__campos-entrega">
                  <label className="checkout-page__campo">
                    <span>Región<span className="checkout-page__requerido">*</span></span>
                    <input
                      type="text"
                      name="region"
                      placeholder="Región"
                      value={datos.region}
                      onChange={(event) => actualizarDato("region", event.target.value)}
                      required
                    />
                  </label>
                  <label className="checkout-page__campo">
                    <span>Comuna<span className="checkout-page__requerido">*</span></span>
                    <input
                      type="text"
                      name="comuna"
                      placeholder="Comuna"
                      value={datos.comuna}
                      onChange={(event) => actualizarDato("comuna", event.target.value)}
                      required
                    />
                  </label>
                  <label className="checkout-page__campo checkout-page__direccion">
                    <span>Dirección, calle y número<span className="checkout-page__requerido">*</span></span>
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección, calle y número"
                      autoComplete="street-address"
                      value={datos.direccion}
                      onChange={(event) => actualizarDato("direccion", event.target.value)}
                      required
                    />
                  </label>
                  <label className="checkout-page__campo">
                    <span>Departamento u oficina (opcional)</span>
                    <input
                      type="text"
                      name="departamentoOficina"
                      placeholder="Departamento u oficina"
                      value={datos.departamentoOficina}
                      onChange={(event) => actualizarDato("departamentoOficina", event.target.value)}
                    />
                  </label>
                  <label className="checkout-page__campo">
                    <span>Referencia para el repartidor (opcional)</span>
                    <input
                      type="text"
                      name="referencia"
                      placeholder="Referencia"
                      value={datos.referencia}
                      onChange={(event) => actualizarDato("referencia", event.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {tipoEntrega === "RetiroEnTienda" && (
            <div className="checkout-page__detalle-sucursal">
              <h2>Sucursal de retiro</h2>
              <div className="checkout-page__tarjeta-sucursal">
                <IconLocation color="var(--primario-70-color)" size={24} aria-hidden="true" />
                <div>
                  <strong>Av. Providencia 2556</strong>
                  <p>Horarios: Lunes a Viernes 10:00–20:00 · Sábado, Domingo y Feriados 10:00–18:00</p>
                </div>
              </div>
              <label className="checkout-page__campo">
                <span>Sucursal de retiro<span className="checkout-page__requerido">*</span></span>
                <input
                  type="text"
                  name="sucursalRetiro"
                  placeholder="Sucursal de retiro"
                  value={datos.sucursalRetiro}
                  onChange={(event) => actualizarDato("sucursalRetiro", event.target.value)}
                  required
                />
              </label>
            </div>
          )}
        </div>

        <div className="checkout-page__pago">
          <UIFormSelection
            type="payment"
            titleIcon={<IconPayment color="currentColor" aria-hidden="true" />}
            size="M"
            name="metodoPago"
            title="¿Cómo vas a pagar?"
            value={metodoPago}
            onChange={(value) => setMetodoPago(value as MetodoPago)}
            options={[
              { value: "MercadoPago", label: "Mercado Pago" },
              { value: "Tarjeta", label: "Tarjeta de crédito, débito o prepago" },
              { value: "WebpayPlus", label: "Webpay Plus" },
            ]}
          />
        </div>

        <div className="checkout-page__resumen">
          <div className="checkout-page__titulo">
            <IconDocument color="var(--primario-90-color)" size={24} aria-hidden="true" />
            <h2>Resumen del pedido</h2>
          </div>

          {cargandoCarrito && <p role="status">Cargando carrito...</p>}
          {!cargandoCarrito && productos.length === 0 && (
            <p>El carrito está vacío.</p>
          )}
          <div className="checkout-page__productos">
            {productos.map((producto) => (
              <article key={producto.productoId} className="checkout-page__producto">
                <div className="checkout-page__info-producto">
                  <ImagenProductoResumen src={producto.imagen} nombre={producto.nombre} />
                  <div>
                    <p className="checkout-page__nombre">{producto.nombre}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                  </div>
                </div>
                <p className="checkout-page__precio">
                  {formatoCLP(producto.precioUnitario)} c/u
                  <br />
                  Subtotal: {formatoCLP(producto.subtotal)}
                </p>
              </article>
            ))}
          </div>

          {productos.length > 0 && (
            <div className="checkout-page__cupon">
              <CouponBox
                title="Cupón de descuento o Gift card"
                value={cupon}
                error={errorCupon}
                isLoading={aplicandoCupon}
                formId={formularioCupon}
                onChange={(valor) => {
                  setCupon(valor);
                  setErrorCupon(null);
                }}
              />
              {cuponAplicado && <p role="status">Cupón aplicado: {cuponAplicado}</p>}
            </div>
          )}

          <div className="checkout-page__montos">
            <div className="checkout-page__subtotal">
              <p>Subtotal:</p>
              <p>{formatoCLP(subtotal)}</p>
            </div>
            {descuento > 0 && (
              <div className="checkout-page__subtotal">
                <p>Descuento aplicado:</p>
                <p>-{formatoCLP(descuento)}</p>
              </div>
            )}
            <div className="checkout-page__subtotal">
              <p>Envío:</p>
              <p>Calculado al crear el pedido</p>
            </div>
            <div className="checkout-page__total">
              <p>Total del carrito (sin envío):</p>
              <span>{formatoCLP(totalCarrito)}</span>
            </div>
          </div>

          <div className="checkout-page__finalizar">
            <div className="checkout-page__terminos">
              <UICheckbox
                name="aceptaTerminos"
                id="terminos-condiciones"
                checked={aceptaTerminos}
                onChange={setAceptaTerminos}
                label="He leído y estoy de acuerdo con los términos y condiciones."
              />
            </div>

            {(error || errorCarrito) && (
              <p className="checkout-page__error" role="alert">{error ?? errorCarrito}</p>
            )}

            <UIButton
              type="submit"
              variant="primary"
              size="L"
              className="checkout-page__submit"
              disabled={cargandoCarrito || enviando || compraPendiente || aplicandoCupon || productos.length === 0}
            >
              {enviando ? "Creando pedido..." : "Finalizar compra"}
            </UIButton>
          </div>
        </div>
        {paso < 2 && (
          <div className="checkout-page__avance">
            {errorPaso && <p className="checkout-page__error" role="alert">{errorPaso}</p>}
            <UIButton onClick={avanzarPaso}>{paso === 0 ? "Ir a entrega" : "Ir a pago"}</UIButton>
          </div>
        )}
      </form>
    </section>
  );
}
