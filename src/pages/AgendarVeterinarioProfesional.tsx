import './AgendarVeterinarioProfesional.css'

function AgendarVeterinarioProfesional() {
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

                <a href="agendar-veterinario-datos-contacto.html">
                  <button
                    type="button"
                    className="boton-confirmar"
                  >
                    Confirmar
                  </button>
                </a>
              </div>

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

export default AgendarVeterinarioProfesional