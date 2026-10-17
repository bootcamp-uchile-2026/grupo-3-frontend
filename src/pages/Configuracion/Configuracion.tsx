 
import { Link } from "react-router-dom";

export function Configuracion() {
  return (
    <>
      <div className="menu-contenido-perfil-usuario">
          {/* MENÚ DEL PERFIL */}
          <nav className="menu-perfil">
            <ul>
              <li>
                <Link to="/mi-perfil/perfil-mascota">Mis mascotas</Link>
              </li>

              <li>
                <a aria-disabled="true">Seguimiento de pedido</a>
              </li>

              <li>
                <a aria-disabled="true">Detalles de la cuenta</a>
              </li>

              <li className="activo">
                <Link to="/mi-perfil/configuracion">Configuración</Link>
              </li>

              <li>
                <a aria-disabled="true">Métodos de pago</a>
              </li>

              <li>
                <a aria-disabled="true">Historial de compras</a>
              </li>

              <li>
                <a aria-disabled="true">Direcciones</a>
              </li>
            </ul>
          </nav>

          {/* CONTENIDO DE CONFIGURACIÓN */}
          <section className="contenido-configuracion">
            <h1>Configuración</h1>

            <div className="grupo-configuracion">
              <h2>Notificaciones de tienda</h2>

              {/* RECORDATORIO DE RECOMPRA */}
              <div className="tipo-notificacion">
                <h3>Recordatorio de recompra</h3>

                <label className="opcion-configuracion">
                  <span>E-Mail</span>
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="opcion-configuracion">
                  <span>Aplicación Móvil</span>
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="opcion-configuracion">
                  <span>Página web</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>

              {/* PROMOCIONES PERSONALIZADAS */}
              <div className="tipo-notificacion">
                <h3>Promociones personalizadas</h3>

                <label className="opcion-configuracion">
                  <span>E-Mail</span>
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="opcion-configuracion">
                  <span>Aplicación Móvil</span>
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="opcion-configuracion">
                  <span>Página web</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>

              {/* PEDIDO EN CAMINO */}
              <div className="tipo-notificacion">
                <h3>Pedido en camino</h3>

                <label className="opcion-configuracion">
                  <span>E-Mail</span>
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="opcion-configuracion">
                  <span>Aplicación Móvil</span>
                  <input type="checkbox" defaultChecked />
                </label>

                <label className="opcion-configuracion">
                  <span>Página web</span>
                  <input type="checkbox" defaultChecked />
                </label>
              </div>
              <div className="grupo-configuracion">
                <h2>Recordatorios de tu mascota</h2>

                <div className="tipo-notificacion">
                  <h3>Recordatorio de hora veterinaria</h3>

                  <label className="opcion-configuracion">
                    <span>E-Mail</span>
                    <input type="checkbox" defaultChecked />
                  </label>

                  <label className="opcion-configuracion">
                    <span>Aplicación Móvil</span>
                    <input type="checkbox" defaultChecked />
                  </label>

                  <label className="opcion-configuracion">
                    <span>Página web</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>

                <div className="tipo-notificacion">
                  <h3>Recordatorio de vacunas</h3>

                  <label className="opcion-configuracion">
                    <span>E-Mail</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="opcion-configuracion">
                    <span>Aplicación Móvil</span>
                    <input type="checkbox" defaultChecked />
                  </label>

                  <label className="opcion-configuracion">
                    <span>Página web</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>
              </div>
            </div>
          </section>
      </div>
    </>
  )
}
