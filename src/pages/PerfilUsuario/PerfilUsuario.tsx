 

import { Link } from "react-router-dom";

function PerfilUsuario() {
  return (
    <>
      <div className="menu-contenido-perfil-usuario">

          {/* MENÚ LATERAL */}
          <nav className="menu-perfil">
            <ul>
              <li>
                <Link to="/mi-perfil/perfil-mascota">
                  Mis mascotas
                </Link>
              </li>

              <li>
                <a aria-disabled="true">
                  Seguimiento de pedido
                </a>
              </li>

              <li>
                <Link to="/mi-perfil/perfil-usuario">
                  Detalles de la cuenta
                </Link>
              </li>

              <li>
                <Link to="/mi-perfil/configuracion">
                  Configuración
                </Link>
              </li>

              <li>
                <a aria-disabled="true">
                  Métodos de pago
                </a>
              </li>

              <li>
                <a aria-disabled="true">
                  Historial de compras
                </a>
              </li>

              <li>
                <a aria-disabled="true">
                  Direcciones
                </a>
              </li>
            </ul>
          </nav>

          {/* PERFIL */}
          <section className="contenido-perfil">

            <h1>Hola, Usuario!</h1>

            <div className="tarjetas-perfil">

              <a aria-disabled="true" className="tarjeta-perfil">
                <h2>Seguimiento de pedido</h2>
              </a>

              <Link
                to="/mi-perfil/perfil-mascota"
                className="tarjeta-perfil"
              >
                <h2>Mis mascotas</h2>
              </Link>

              <a aria-disabled="true" className="tarjeta-perfil">
                <h2>Historial de compras</h2>
              </a>

              <a aria-disabled="true" className="tarjeta-perfil">
                <h2>Direcciones</h2>
              </a>

            </div>

            <div className="opciones-agregar">

              <a aria-disabled="true" className="opcion-agregar">
                <p>Añade tu mascota</p>
              </a>

              <a aria-disabled="true" className="opcion-agregar">
                <p>Añade tu número de teléfono</p>
              </a>

              <a aria-disabled="true" className="opcion-agregar">
                <p>Añade nuevo método de pago</p>
              </a>

            </div>

          </section>
      </div>
    </>
  )
}

export default PerfilUsuario