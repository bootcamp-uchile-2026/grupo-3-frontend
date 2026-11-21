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
import { USUARIO_ID_CARRITO } from "../../services/carrito";
import { crearPedido, type CreatePedidoDto } from "../../services/pedidos";
import { UIFormSelection } from "../../components/UIKit/UIFormSelection/UIFormSelection";
import { UICheckbox } from "../../components/UIKit/UICheckbox/UICheckbox";
import UIButton from "../../components/UIKit/UIButton/UIButton";
import {
  IconDocument,
  IconLocation,
  IconUser,
} from "../../components/UIKit/UIIcons";

type TipoComprobante = "Boleta" | "Factura";
type TipoEntrega = "EnvioNormal" | "RetiroEnTienda";
type MetodoPago = "MercadoPago" | "Tarjeta" | "WebpayPlus";

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

const formatoCLP = (monto: number): string =>
  `$${new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(monto)}`;

function ImagenProductoResumen({ src, nombre }: { src: string; nombre: string }) {
  const [urlFallida, setUrlFallida] = useState<string | null>(null);

  if (!src || urlFallida === src) {
    return (
      <div
        className="imagen-producto-resumen imagen-producto-resumen--fallback"
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
      className="imagen-producto-resumen"
      onError={() => setUrlFallida(src)}
    />
  );
}

export function Checkout() {
  const navigate = useNavigate();
  const productos = useCarritoStore(useShallow(selectProductos));
  const inicializarCarrito = useCarritoStore((state) => state.inicializar);
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
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const envioEnCurso = useRef(false);
  const cargandoCarrito = estadoCarrito === "idle" || estadoCarrito === "loading";

  useEffect(() => {
    let activo = true;

    void inicializarCarrito().catch((cause: unknown) => {
      if (activo) {
        console.error("No se pudo cargar el carrito para el checkout.", cause);
        setError(cause instanceof Error ? cause.message : "No se pudo cargar el carrito.");
      }
    });

    return () => {
      activo = false;
    };
  }, [inicializarCarrito]);

  function actualizarDato(campo: keyof DatosCheckout, valor: string) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (envioEnCurso.current || enviando) return;
    if (cargandoCarrito) {
      setError("Espera a que cargue el carrito antes de finalizar la compra.");
      return;
    }
    if (productos.length === 0) {
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

    const datosPedido: CreatePedidoDto = {
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correoElectronico: datos.correoElectronico.trim(),
      telefono: datos.telefono.trim(),
      tipoComprobante: datos.tipoComprobante,
      rutDocumento: datos.rutDocumento.trim(),
      tipoEntrega,
      metodoPago,
      aceptaTerminos,
      usuarioId: USUARIO_ID_CARRITO,
      ...(tipoEntrega === "EnvioNormal" && {
        region: datos.region.trim(),
        comuna: datos.comuna.trim(),
        direccion: datos.direccion.trim(),
        ...(datos.departamentoOficina.trim() && {
          departamentoOficina: datos.departamentoOficina.trim(),
        }),
        ...(datos.referencia.trim() && { referencia: datos.referencia.trim() }),
      }),
      ...(tipoEntrega === "RetiroEnTienda" && {
        sucursalRetiro: datos.sucursalRetiro.trim(),
      }),
    };

    // El ref bloquea dobles clics antes de que React alcance a renderizar el estado de carga.
    envioEnCurso.current = true;
    setEnviando(true);
    try {
      const pedido = await crearPedido(datosPedido);
      // La consulta de confirmación recibe el ID únicamente tras una creación exitosa.
      navigate(`/carrito-compras/confirmacion-pedido/${encodeURIComponent(pedido.id)}`);
    } catch (cause) {
      console.error("No se pudo crear el pedido.", cause);
      setError(cause instanceof Error ? cause.message : "No se pudo crear el pedido.");
    } finally {
      envioEnCurso.current = false;
      setEnviando(false);
    }
  }

  return (
    <section className="checkout-page">
      <form onSubmit={handleSubmit} className="checkout-page__container checkout-container">
        <div className="datos-envio-div">
          <div className="titulo-icono">
            <IconUser color="var(--primario-70-color)" size={24} aria-hidden="true" />
            <h1>Datos para el despacho</h1>
          </div>
          <div id="datos-envio">
            <div className="form-row">
              <label className="checkout-field">
                <span>Nombre<span className="checkout-field__required">*</span></span>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  autoComplete="given-name"
                  value={datos.nombre}
                  onChange={(event) => actualizarDato("nombre", event.target.value)}
                  required
                />
              </label>
              <label className="checkout-field">
                <span>Apellido<span className="checkout-field__required">*</span></span>
                <input
                  type="text"
                  name="apellidos"
                  placeholder="Apellido"
                  autoComplete="family-name"
                  value={datos.apellidos}
                  onChange={(event) => actualizarDato("apellidos", event.target.value)}
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label className="checkout-field">
                <span>E-Mail<span className="checkout-field__required">*</span></span>
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
              <label className="checkout-field">
                <span>Teléfono<span className="checkout-field__required">*</span></span>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="+56 9 XXXX XXXX"
                  autoComplete="tel"
                  value={datos.telefono}
                  onChange={(event) => actualizarDato("telefono", event.target.value)}
                  required
                />
              </label>
            </div>

            <label className="checkout-field" htmlFor="tipo-comprobante">
              <span>Boleta o Factura<span className="checkout-field__required">*</span></span>
              <select
                id="tipo-comprobante"
                value={datos.tipoComprobante}
                onChange={(event) => actualizarDato("tipoComprobante", event.target.value)}
                required
              >
                <option value="" disabled>¿Boleta o factura?</option>
                <option value="Boleta">Boleta</option>
                <option value="Factura">Factura</option>
              </select>
            </label>

            <label className="checkout-field">
              <span>RUT o Nro. de documento</span>
              <input
                type="text"
                name="rutDocumento"
                placeholder="12.345.678-9"
                value={datos.rutDocumento}
                onChange={(event) => actualizarDato("rutDocumento", event.target.value)}
                required
              />
            </label>
          </div>
        </div>

        <div className="metodo-envio-div">
          <UIFormSelection
            type="shipping"
            size="M"
            name="tipoEntrega"
            title="¿Recibes o retiras tu pedido?"
            value={tipoEntrega}
            onChange={(value) => setTipoEntrega(value as TipoEntrega)}
            options={[
              { value: "EnvioNormal", label: "Envío normal", price: "$3.990" },
              { value: "RetiroEnTienda", label: "Retiro en tienda", price: "Gratis" },
            ]}
          />

          {tipoEntrega === "EnvioNormal" && (
            <div id="datos-envio" className="checkout-entrega">
              <h2>Dirección de entrega</h2>
              <div className="checkout-entrega__domicilio">
                <IconLocation color="var(--primario-90-color)" size={24} aria-hidden="true" />
                <div className="checkout-entrega__campos">
                  <label className="checkout-field">
                    <span>Región<span className="checkout-field__required">*</span></span>
                    <input
                      type="text"
                      name="region"
                      placeholder="Región"
                      value={datos.region}
                      onChange={(event) => actualizarDato("region", event.target.value)}
                      required
                    />
                  </label>
                  <label className="checkout-field">
                    <span>Comuna<span className="checkout-field__required">*</span></span>
                    <input
                      type="text"
                      name="comuna"
                      placeholder="Comuna"
                      value={datos.comuna}
                      onChange={(event) => actualizarDato("comuna", event.target.value)}
                      required
                    />
                  </label>
                  <label className="checkout-field checkout-entrega__direccion">
                    <span>Dirección, calle y número<span className="checkout-field__required">*</span></span>
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
                  <label className="checkout-field">
                    <span>Departamento u oficina (opcional)</span>
                    <input
                      type="text"
                      name="departamentoOficina"
                      placeholder="Departamento u oficina"
                      value={datos.departamentoOficina}
                      onChange={(event) => actualizarDato("departamentoOficina", event.target.value)}
                    />
                  </label>
                  <label className="checkout-field">
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
            <div className="checkout-sucursal">
              <h2>Sucursal de retiro</h2>
              <div className="checkout-sucursal__card">
                <IconLocation color="var(--primario-70-color)" size={24} aria-hidden="true" />
                <div>
                  <strong>Av. Providencia 2556</strong>
                  <p>Horarios: Lunes a Viernes 10:00–20:00 · Sábado, Domingo y Feriados 10:00–18:00</p>
                </div>
              </div>
              <label className="checkout-field">
                <span>Sucursal de retiro<span className="checkout-field__required">*</span></span>
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

        <div className="metodo-pago-div">
          <UIFormSelection
            type="payment"
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

        <div className="resumen-pedido-div">
          <div className="titulo-icono">
            <IconDocument color="var(--primario-90-color)" size={24} aria-hidden="true" />
            <h2>Resumen del pedido</h2>
          </div>

          {cargandoCarrito && <p role="status">Cargando carrito...</p>}
          {!cargandoCarrito && productos.length === 0 && (
            <p>El carrito está vacío.</p>
          )}
          <div className="productos-resumen-pedido">
            {productos.map((producto) => (
              <article key={producto.productoId} className="producto-resumen-pedido">
                <div className="info-producto">
                  <ImagenProductoResumen src={producto.imagen} nombre={producto.nombre} />
                  <div>
                    <p className="nombre-producto-resumen">{producto.nombre}</p>
                    <p>Cantidad: {producto.cantidad}</p>
                  </div>
                </div>
                <p className="precio-producto-resumen">
                  {formatoCLP(producto.precioUnitario)} c/u
                  <br />
                  Subtotal: {formatoCLP(producto.subtotal)}
                </p>
              </article>
            ))}
          </div>

          <div className="subtotal-total-resumen-div">
            <div className="subtotal-div">
              <p>Subtotal:</p>
              <p>{formatoCLP(subtotal)}</p>
            </div>
            {descuento > 0 && (
              <div className="subtotal-div">
                <p>Descuento aplicado:</p>
                <p>-{formatoCLP(descuento)}</p>
              </div>
            )}
            <div className="subtotal-div">
              <p>Envío:</p>
              <p>Calculado al crear el pedido</p>
            </div>
            <div className="total-div">
              <p>Total del carrito (sin envío):</p>
              <span>{formatoCLP(totalCarrito)}</span>
            </div>
          </div>

          <div id="finalizar-compra">
            <div className="check-termino">
              <UICheckbox
                name="aceptaTerminos"
                id="terminos-condiciones"
                checked={aceptaTerminos}
                onChange={setAceptaTerminos}
                label="He leído y estoy de acuerdo con los términos y condiciones."
              />
            </div>

            {(error || errorCarrito) && (
              <p className="error-checkout" role="alert">{error ?? errorCarrito}</p>
            )}

            <UIButton
              type="submit"
              variant="primary"
              size="L"
              className="checkout-page__submit"
              disabled={cargandoCarrito || enviando || productos.length === 0}
            >
              {enviando ? "Creando pedido..." : "Finalizar compra"}
            </UIButton>
          </div>
        </div>
      </form>
    </section>
  );
}
