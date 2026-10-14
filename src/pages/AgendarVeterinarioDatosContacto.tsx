import './AgendarVeterinarioDatosContacto.css'

function AgendarVeterinarioDatosContacto() {
  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="top-bar">
          <div className="left">
            <button className="menu-btn" aria-label="Menú">
              ☰
            </button>

            <a href="/index.html" className="logo">
              <img src="/logo-petlove.svg" alt="Petlove" />
            </a>
          </div>

          <div className="center">
            <form
              className="search-form"
              action="/buscar"
              method="GET"
              role="search"
            >
              <span className="search-icon">⌕</span>
              <input type="search" name="q" placeholder="Buscar" />
            </form>
          </div>

          <div className="right">
            <a href="#" className="login-link">
              Iniciar sesión / registrar
            </a>

            <a href="/mi-perfil/perfil-usuario.html" aria-label="Mi cuenta">
              👤
            </a>

            <a href="/carrito-compras.html" aria-label="Carrito">
              🛒
            </a>
          </div>
        </div>

        <nav className="bottom-bar" aria-label="Categorías principales">
          <ul>
            <li>
              <a href="#">☰ Categorías</a>
            </li>

            <li>
              <a href="/servicios-veterinarios/agendar-veterinario-lista-servicios.html">
                🩺 Servicios veterinarios
              </a>
            </li>

            <li>
              <a href="/categoria/categoria-productos.html">
                💊 Farmacia
              </a>
            </li>

            <li>
              <a href="/categoria/categoria-productos.html">
                🐱 Gato
              </a>
            </li>

            <li>
              <a href="/categoria/categoria-productos.html">
                🐶 Perro
              </a>
            </li>

            <li>
              <a href="/categoria/categoria-productos.html">
                🏷️ Outlet
              </a>
            </li>

            <li>
              <a href="#">📞 Contacto</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main>

        {/* PASOS */}
        <section className="pasos">
          <div className="container">
            <ol>
              <li>
                <span className="numero-paso">1</span>
                <span>Fecha y hora</span>
              </li>

              <li>
                <span className="numero-paso">2</span>
                <span>Profesional</span>
              </li>

              <li className="paso-activo">
                <span className="numero-paso">3</span>
                <span>Datos de contacto</span>
              </li>
            </ol>
          </div>
        </section>

        {/* DATOS DE CONTACTO */}
        <section className="contenedor-contacto">
          <div className="container">
            <div className="contenido-contacto">

              <section className="formulario-contacto">
                <h1>Datos de contacto</h1>

                <form>

                  <div className="fila-formulario">

                    <div className="campo">
                      <label htmlFor="nombre">
                        Nombre <span className="obligatorio">*</span>
                      </label>

                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                      />
                    </div>

                    <div className="campo">
                      <label htmlFor="apellido">
                        Apellido <span className="obligatorio">*</span>
                      </label>

                      <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        required
                      />
                    </div>

                  </div>

                  <div className="fila-formulario">

                    <div className="campo">
                      <label htmlFor="email">
                        Email <span className="obligatorio">*</span>
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                      />
                    </div>

                    <div className="campo">
                      <label htmlFor="telefono">
                        Teléfono <span className="obligatorio">*</span>
                      </label>

                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                      />
                    </div>

                  </div>

                  <div className="campo campo-rut">
                    <label htmlFor="rut">
                      Rut <span className="obligatorio">*</span>
                    </label>

                    <input
                      type="text"
                      id="rut"
                      name="rut"
                      required
                    />
                  </div>

                  <div className="campo campo-comentarios">
                    <div className="encabezado-comentarios">
                      <label htmlFor="comentarios">
                        Comentarios/Observaciones
                      </label>

                      <span>Opcional</span>
                    </div>

                    <textarea
                      id="comentarios"
                      name="comentarios"
                    />
                  </div>

                  <button
                    type="submit"
                    className="boton-agendar"
                  >
                    Agendar
                  </button>

                </form>
              </section>

              {/* RESUMEN */}
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

            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-top">

          <div className="footer-logo">
            <a href="/">
              <div className="logo-placeholder"></div>
              <span>PetLove</span>
            </a>
          </div>

          <div className="footer-links">
            <ul>
              <li>
                <a href="/preguntas-frecuentes">
                  Preguntas frecuentes
                </a>
              </li>

              <li>
                <a href="/terminos-condiciones">
                  Términos y condiciones
                </a>
              </li>

              <li>
                <a href="/politicas-privacidad">
                  Políticas de privacidad
                </a>
              </li>

              <li>
                <a href="/cambios-devoluciones">
                  Cambios y devoluciones
                </a>
              </li>
            </ul>

            <ul>
              <li>
                <a href="/nosotros">Nosotros</a>
              </li>

              <li>
                <a href="/sobre-nosotros">
                  Sobre nosotros
                </a>
              </li>

              <li>
                <a href="/horario-atencion">
                  Horario de atención
                </a>
              </li>

              <li>
                <a href="/sugerencias-reclamos">
                  Sugerencias y reclamos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Copyright © 2024 Company name. All Rights Reserved
          </p>

          <div className="social">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
            <a href="#" aria-label="TikTok">♪</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default AgendarVeterinarioDatosContacto