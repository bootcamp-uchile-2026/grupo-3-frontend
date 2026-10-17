import { Link } from "react-router-dom";

export function AgendarVeterinarioProfesional() {
  return (
    <>
        {/* PASOS */}
        <section className="pasos">
          <div className="container">
            <ol>
              <li>
                <span className="numero-paso">1</span>
                <span>Fecha y hora</span>
              </li>

              <li className="paso-activo">
                <span className="numero-paso">2</span>
                <span>Profesional</span>
              </li>

              <li>
                <span className="numero-paso">3</span>
                <span>Datos de contacto</span>
              </li>
            </ol>
          </div>
        </section>

        {/* AGENDAMIENTO */}
        <section className="contenedor-agendamiento">
          <div className="container">
            <div className="contenido-agendamiento">

              <section className="profesionales">
                <h1>
                  Selecciona el/la profesional para tu servicio
                </h1>

                <div className="primer-disponible">
                  <span className="icono-usuario">👤</span>
                  <p>Primer profesional disponible</p>
                </div>

                <article className="profesional">
                  <div className="datos-profesional">
                    <img
                      src="https://placehold.co/40x40"
                      alt="Imagen de la profesional"
                    />
                    <p>Dra. Fernanda Vásquez</p>
                  </div>

                  <button type="button">
                    Ver perfil
                  </button>
                </article>

                <article className="profesional">
                  <div className="datos-profesional">
                    <img
                      src="https://placehold.co/40x40"
                      alt="Imagen del profesional"
                    />
                    <p>Dr. Fernando Guerrero</p>
                  </div>

                  <button type="button">
                    Ver perfil
                  </button>
                </article>

                <article className="profesional">
                  <div className="datos-profesional">
                    <img
                      src="https://placehold.co/40x40"
                      alt="Imagen del profesional"
                    />
                    <p>Dr. Javier Reyes</p>
                  </div>

                  <button type="button">
                    Ver perfil
                  </button>
                </article>
              </section>

              {/* RESUMEN */}
              <div className="columna-resumen">
                <aside className="resumen-consulta">
                  <h2>Resumen de tu consulta</h2>

                  <div className="detalle-consulta">
                    <p>📅 26 de agosto de 2026</p>
                    <p>🕒 10:30 am - 11:00 am</p>
                    <p>👤 Dr. Fernando Guerrero</p>
                    <p>🏠 Francisco Bilbao</p>
                  </div>

                  <div className="costo-consulta">
                    <p>Costo total</p>
                    <p>💲 $9.990</p>
                  </div>
                </aside>

                <Link to="/servicios-veterinarios/agendar-veterinario-datos-contacto.html">
                  <button
                    type="button"
                    className="boton-confirmar"
                  >
                    Confirmar
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </section>
    </>
  )
}
