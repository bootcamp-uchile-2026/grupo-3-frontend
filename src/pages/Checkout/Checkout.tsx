import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import { USUARIO_ID_CARRITO, obtenerCarrito } from "../../services/carrito";
import { crearPedido, type CreatePedidoDto } from "../../services/pedidos";

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

export function Checkout() {
  const navigate = useNavigate();
  const { state, dispatch } = useCarrito();
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
  const [cargandoCarrito, setCargandoCarrito] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const envioEnCurso = useRef(false);

  useEffect(() => {
    let activo = true;

    async function cargarCarrito() {
      try {
        // Consultar el carrito real para que el checkout también funcione al abrirse directamente.
        const carrito = await obtenerCarrito();
        if (activo) {
          dispatch({ type: "SINCRONIZAR", carrito });
        }
      } catch (cause) {
        if (activo) {
          console.error("No se pudo cargar el carrito para el checkout.", cause);
          setError(cause instanceof Error ? cause.message : "No se pudo cargar el carrito.");
        }
      } finally {
        if (activo) {
          setCargandoCarrito(false);
        }
      }
    }

    void cargarCarrito();
    return () => {
      activo = false;
    };
  }, [dispatch]);

  const subtotal = state.resumenApi?.subtotal
    ?? state.productos.reduce((suma, producto) => suma + producto.subtotal, 0);
  const descuento = state.resumenApi?.descuentoCupon ?? 0;
  const totalCarrito = state.resumenApi?.total ?? subtotal - descuento;

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
    if (state.productos.length === 0) {
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
    <section>
      <form onSubmit={handleSubmit} className="container checkout-container">
        <div className="datos-envio-div">
          <div className="titulo-icono">
            <h1>Datos de compra y entrega</h1>
          </div>
          <div id="datos-envio">
            <div className="form-row">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre*"
                autoComplete="given-name"
                value={datos.nombre}
                onChange={(event) => actualizarDato("nombre", event.target.value)}
                required
              />
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos*"
                autoComplete="family-name"
                value={datos.apellidos}
                onChange={(event) => actualizarDato("apellidos", event.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                inputMode="email"
                name="correoElectronico"
                placeholder="Correo electrónico*"
                autoComplete="email"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Ingresa un correo válido, por ejemplo nombre@dominio.com"
                value={datos.correoElectronico}
                onChange={(event) => actualizarDato("correoElectronico", event.target.value)}
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono*"
                autoComplete="tel"
                value={datos.telefono}
                onChange={(event) => actualizarDato("telefono", event.target.value)}
                required
              />
            </div>

            <label htmlFor="tipo-comprobante">Tipo de comprobante*</label>
            <select
              id="tipo-comprobante"
              value={datos.tipoComprobante}
              onChange={(event) => actualizarDato("tipoComprobante", event.target.value)}
              required
            >
              <option value="" disabled>Selecciona un comprobante</option>
              <option value="Boleta">Boleta</option>
              <option value="Factura">Factura</option>
            </select>

            <input
              type="text"
              name="rutDocumento"
              placeholder="RUT o documento*"
              value={datos.rutDocumento}
              onChange={(event) => actualizarDato("rutDocumento", event.target.value)}
              required
            />
          </div>
        </div>

        <div className="metodo-envio-div">
          <div className="titulo-icono">
            <h2>Entrega o retiro</h2>
          </div>
          <div className="sel-metodos">
            <label className="sel-metodo" htmlFor="envio-normal">
              <span>Envío normal</span>
              <input
                id="envio-normal"
                type="radio"
                name="tipoEntrega"
                value="EnvioNormal"
                checked={tipoEntrega === "EnvioNormal"}
                onChange={() => setTipoEntrega("EnvioNormal")}
                required
              />
            </label>
            <label className="sel-metodo" htmlFor="retiro-tienda">
              <span>Retiro en tienda</span>
              <input
                id="retiro-tienda"
                type="radio"
                name="tipoEntrega"
                value="RetiroEnTienda"
                checked={tipoEntrega === "RetiroEnTienda"}
                onChange={() => setTipoEntrega("RetiroEnTienda")}
                required
              />
            </label>
          </div>

          {tipoEntrega === "EnvioNormal" && (
            <div id="datos-envio">
              <input
                type="text"
                name="region"
                placeholder="Región*"
                value={datos.region}
                onChange={(event) => actualizarDato("region", event.target.value)}
                required
              />
              <input
                type="text"
                name="comuna"
                placeholder="Comuna*"
                value={datos.comuna}
                onChange={(event) => actualizarDato("comuna", event.target.value)}
                required
              />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección, calle y número*"
                autoComplete="street-address"
                value={datos.direccion}
                onChange={(event) => actualizarDato("direccion", event.target.value)}
                required
              />
              <input
                type="text"
                name="departamentoOficina"
                placeholder="Departamento u oficina (opcional)"
                value={datos.departamentoOficina}
                onChange={(event) => actualizarDato("departamentoOficina", event.target.value)}
              />
              <input
                type="text"
                name="referencia"
                placeholder="Referencia para el repartidor (opcional)"
                value={datos.referencia}
                onChange={(event) => actualizarDato("referencia", event.target.value)}
              />
            </div>
          )}

          {tipoEntrega === "RetiroEnTienda" && (
            <input
              type="text"
              name="sucursalRetiro"
              placeholder="Sucursal de retiro*"
              value={datos.sucursalRetiro}
              onChange={(event) => actualizarDato("sucursalRetiro", event.target.value)}
              required
            />
          )}
        </div>

        <div className="metodo-pago-div">
          <div className="titulo-icono">
            <h2>Método de pago</h2>
          </div>
          <div id="metodo-pago" className="sel-metodos">
            {([
              ["MercadoPago", "Mercado Pago"],
              ["Tarjeta", "Tarjeta crédito, débito y prepago"],
              ["WebpayPlus", "Webpay Plus"],
            ] as const).map(([value, label]) => (
              <label className="sel-metodo" htmlFor={`pago-${value}`} key={value}>
                <span>{label}</span>
                <input
                  id={`pago-${value}`}
                  type="radio"
                  name="metodoPago"
                  value={value}
                  checked={metodoPago === value}
                  onChange={() => setMetodoPago(value)}
                  required
                />
              </label>
            ))}
          </div>
        </div>

        <div className="resumen-pedido-div">
          <div className="titulo-icono">
            <h2>Resumen del pedido</h2>
          </div>

          {cargandoCarrito && <p role="status">Cargando carrito...</p>}
          {!cargandoCarrito && state.productos.length === 0 && (
            <p>El carrito está vacío.</p>
          )}
          <div className="productos-resumen-pedido">
            {state.productos.map((producto) => (
              <article key={producto.productoId} className="producto-resumen-pedido">
                <div className="info-producto">
                  {producto.imagen && (
                    <img src={producto.imagen} alt={producto.nombre} className="imagen-producto-resumen" />
                  )}
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
              <input
                type="checkbox"
                name="aceptaTerminos"
                id="terminos-condiciones"
                checked={aceptaTerminos}
                onChange={(event) => setAceptaTerminos(event.target.checked)}
                required
              />
              <label htmlFor="terminos-condiciones">
                He leído y estoy de acuerdo con los términos y condiciones.
              </label>
            </div>

            {error && <p className="error-checkout" role="alert">{error}</p>}

            <button
              type="submit"
              disabled={cargandoCarrito || enviando || state.productos.length === 0}
            >
              {enviando ? "Creando pedido..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
