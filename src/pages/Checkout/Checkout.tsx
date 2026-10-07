import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
// import { useNavigate } from "react-router-dom";

type Producto ={
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

type Opcion = {
  value: string;
  label: string;
}

type DatosEnvio = {
  nombre: string;
  apellidos: string;
  direccion: string;
  detalle: string;
  region: string;
  comuna: string;
  email: string;
  telefono: string;
  documento: "" | "boleta" | "factura";
  rut: string;
}

type MetodoEnvio = "" | "envio-normal" | "retiro-tienda";
type MetodoPago = "" | "mercado-pago" | "tarjetas" | "webpay-plus";

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Nombre de producto", precio: 7490, imagen: "https://placehold.co/80x80" },
  { id: 2, nombre: "Nombre de producto", precio: 7490, imagen: "https://placehold.co/80x80" },
  { id: 3, nombre: "Nombre de producto", precio: 7490, imagen: "https://placehold.co/80x80" },
];

const REGIONES: Opcion[] = [
  { value: "region-1", label: "Región 1" },
  { value: "region-2", label: "Región 2" },
  { value: "region-3", label: "Región 3" },
];

const COMUNAS: Opcion[] = [
  { value: "comuna-1", label: "Comuna 1" },
  { value: "comuna-2", label: "Comuna 2" },
  { value: "comuna-3", label: "Comuna 3" },
];

const COSTO_ENVIO: Record<string, number> = {
  "envio-normal": 3990,
  "retiro-tienda": 0,
};

const formatoCLP = (n: number): string => `$${n.toLocaleString("es-CL")}`;

export function Checkout() {
  // const navigate = useNavigate();

  const [datos, setDatos] = useState<DatosEnvio>({
    nombre: "", apellidos: "", direccion: "", detalle: "",
    region: "", comuna: "", email: "", telefono: "", documento: "", rut: "",
  });
  const [metodoEnvio, setMetodoEnvio] = useState<MetodoEnvio>("");
  const [metodoPago, setMetodoPago] = useState<MetodoPago>("");
  const [cupon, setCupon] = useState<string>("");
  const [descuento, setDescuento] = useState<number>(0);
  const [terminos, setTerminos] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // ---------- Cálculos ----------
  const subtotal = PRODUCTOS.reduce((acc, p) => acc + p.precio, 0);
  const costoEnvio = COSTO_ENVIO[metodoEnvio] ?? 0;
  const total = subtotal + costoEnvio - descuento;

  // ---------- Funciones (por implementar) ----------

  // TODO: formatear RUT con puntos y guion (12.345.678-5)
  const formatearRut = (rut: string): string => rut;

  // TODO: validar formato + dígito verificador (módulo 11)
  const validarRut = (_rut: string): boolean => true;

  // TODO: validar teléfono chileno (+56 9 XXXX XXXX)
  const validarTelefono = (_telefono: string): boolean => true;

  // TODO: devolver solo las comunas de la región seleccionada (JSON/API)
  const obtenerComunas = (_region: string): Opcion[] => COMUNAS;

  const cambioInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDatos((datos) => ({
      ...datos,
      [name]: name === "rut" ? formatearRut(value) : value,
    }));
  };

  // TODO: al cambiar región, guardar la región y resetear datos.comuna
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    cambioInput(e);
  };

  // TODO: validar cupón contra la API y hacer setDescuento(monto). Mostrar error si es inválido
  const aplicarCupon = (): void => {
    setDescuento(0);
  };

  // TODO: validar datos, armar el pedido, enviarlo a la API / pasarela de pago
  // y navegar a la confirmación
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!validarRut(datos.rut)) return setError("RUT inválido");
    if (!validarTelefono(datos.telefono)) return setError("Teléfono inválido");

    setLoading(true);
    try {
      // const pedido = { ...datos, metodoEnvio, metodoPago, cupon, total };
      // await fetch(...)
      // navigate("/carrito-compras/confirmacion-pedido");
    } catch {
      setError("No se pudo procesar el pedido");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Render ----------
  return (
    <section>
      <form onSubmit={handleSubmit} className="container checkout-container">

        {/* DATOS DE ENVÍO */}
        <div className="datos-envio-div">
          <div className="titulo-icono">
            <img src="https://placehold.co/30x30" alt="" />
            <h2>Datos para el despacho</h2>
          </div>
          <div id="datos-envio">
            <div className="form-row">
              <input type="text" name="nombre" placeholder="Nombre*" autoComplete="given-name"
                value={datos.nombre} onChange={cambioInput} required />
              <input type="text" name="apellidos" placeholder="Apellidos*" autoComplete="family-name"
                value={datos.apellidos} onChange={cambioInput} required />
            </div>
            <div className="form-row">
              <input type="text" name="direccion" placeholder="Dirección, calle y número*" autoComplete="street-address"
                value={datos.direccion} onChange={cambioInput} required />
              <input type="text" name="detalle" placeholder="N° depto, oficina, etc. (Opcional)"
                value={datos.detalle} onChange={cambioInput} />
            </div>

            <select name="region" value={datos.region} onChange={handleRegionChange} required>
              <option value="" disabled>Selecciona una región</option>
              {REGIONES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>

            <select name="comuna" value={datos.comuna} onChange={cambioInput} required>
              <option value="" disabled>Comuna</option>
              {obtenerComunas(datos.region).map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <div className="form-row">
              <input type="email" name="email" placeholder="Correo electrónico*" autoComplete="email"
                value={datos.email} onChange={cambioInput} required />
              <input type="tel" name="telefono" placeholder="Teléfono*" autoComplete="tel"
                value={datos.telefono} onChange={cambioInput} required />
            </div>

            <select name="documento" value={datos.documento} onChange={cambioInput} required>
              <option value="" disabled>¿Boleta o factura?*</option>
              <option value="boleta">Boleta</option>
              <option value="factura">Factura</option>
            </select>

            <input type="text" name="rut" placeholder="Rut*"
              value={datos.rut} onChange={cambioInput} required />
          </div>
        </div>

        {/* MÉTODO DE ENVÍO */}
        <div className="metodo-envio-div">
          <div className="titulo-icono">
            <img src="https://placehold.co/30x30" alt="" />
            <h2>¿Recibes o retiras tu pedido?</h2>
          </div>
          <div className="sel-metodos">
            <div className="sel-metodo">
              <div className="input-label">
                <input type="radio" name="metodo-envio" id="envio-normal" value="envio-normal"
                  checked={metodoEnvio === "envio-normal"}
                  onChange={() => setMetodoEnvio("envio-normal")} required />
                <label htmlFor="envio-normal">Envío Normal</label>
              </div>
              <p>{formatoCLP(COSTO_ENVIO["envio-normal"])}</p>
            </div>
            <div className="sel-metodo">
              <div className="input-label">
                <input type="radio" name="metodo-envio" id="retiro-tienda" value="retiro-tienda"
                  checked={metodoEnvio === "retiro-tienda"}
                  onChange={() => setMetodoEnvio("retiro-tienda")} required />
                <label htmlFor="retiro-tienda">Retiro gratis en tienda.</label>
              </div>
              <p>Gratis</p>
            </div>
          </div>
        </div>

        {/* MÉTODO DE PAGO */}
        <div className="metodo-pago-div">
          <div className="titulo-icono">
            <img src="https://placehold.co/30x30" alt="" />
            <h2>¿Cómo vas a pagar?</h2>
          </div>
          <div id="metodo-pago" className="sel-metodos">
            <div className="sel-metodo">
              <div className="input-label">
                <input type="radio" name="metodo-pago" id="mercado-pago" value="mercado-pago"
                  checked={metodoPago === "mercado-pago"}
                  onChange={() => setMetodoPago("mercado-pago")} required />
                <label htmlFor="mercado-pago">Mercado Pago</label>
              </div>
              <img src="https://placehold.co/45x30" alt="Mercado Pago" />
            </div>
            <div className="sel-metodo">
              <div className="input-label">
                <input type="radio" name="metodo-pago" id="tarjetas" value="tarjetas"
                  checked={metodoPago === "tarjetas"}
                  onChange={() => setMetodoPago("tarjetas")} required />
                <label htmlFor="tarjetas">Tarjeta crédito, débito y prepago.</label>
              </div>
            </div>
            <div className="sel-metodo">
              <div className="input-label">
                <input type="radio" name="metodo-pago" id="webpay-plus" value="webpay-plus"
                  checked={metodoPago === "webpay-plus"}
                  onChange={() => setMetodoPago("webpay-plus")} required />
                <label htmlFor="webpay-plus">Webpay Plus</label>
              </div>
            </div>
          </div>
        </div>

        {/* RESUMEN */}
        <div className="resumen-pedido-div">
          <div className="titulo-icono">
            <img src="https://placehold.co/30x30" alt="" />
            <h2>Resumen del pedido</h2>
          </div>

          <div className="productos-resumen-pedido">
            {PRODUCTOS.map((p) => (
              <article key={p.id} className="producto-resumen-pedido">
                <div className="info-producto">
                  <img src={p.imagen} alt={p.nombre} className="imagen-producto-resumen" />
                  <p className="nombre-producto-resumen">{p.nombre}</p>
                </div>
                <p className="precio-producto-resumen">{formatoCLP(p.precio)}</p>
              </article>
            ))}
          </div>

          <div className="cupon-descuento">
            <div className="titulo-icono">
              <img src="https://placehold.co/30x30" alt="" />
              <h3>Cupón de descuento o Giftcard</h3>
            </div>
            <div id="codigo-cupon">
              <input type="text" name="codigo" placeholder="Introduce el código promocional"
                value={cupon} onChange={(e) => setCupon(e.target.value)} />
              <button type="button" onClick={aplicarCupon}>Aplicar</button>
            </div>
          </div>

          <div className="subtotal-total-resumen-div">
            <div className="subtotal-div">
              <p>Subtotal:</p>
              <p>{formatoCLP(subtotal)}</p>
            </div>
            {costoEnvio > 0 && (
              <div className="subtotal-div">
                <p>Envío:</p>
                <p>{formatoCLP(costoEnvio)}</p>
              </div>
            )}
            {descuento > 0 && (
              <div className="subtotal-div">
                <p>Descuento:</p>
                <p>-{formatoCLP(descuento)}</p>
              </div>
            )}
            <div className="total-div">
              <p>Total</p>
              <span>{formatoCLP(total)}</span>
            </div>
          </div>

          <div id="finalizar-compra">
            <div className="check-terminos">
              <input type="checkbox" name="terminos-condiciones" id="terminos-condiciones"
                checked={terminos} onChange={(e) => setTerminos(e.target.checked)} required />
              <label htmlFor="terminos-condiciones">
                He leído y estoy de acuerdo con los{" "}
                <a href="/terminos-y-condiciones" target="_blank" rel="noopener noreferrer">
                  términos y condiciones.
                </a>
              </label>
            </div>

            {error && <p className="error-checkout">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Procesando..." : "Finalizar compra"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}