import './PerfilMascota.css'

function PerfilMascota() {
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
        <div className="datos-detalle-mascota">

          <section className="datos-mascota">
            <div className="imagen-mascota">
              <img
                src="https://placehold.co/250x250"
                alt="Imagen de la mascota"
              />
            </div>

            <h1>Nombre de Mascota</h1>
            <p>Raza - Edad - Género</p>
          </section>

          <section className="detalle-mascota">

            {/* INFORMACIÓN */}
            <article className="bloque-informacion">
              <div className="encabezado-bloque">
                <h2>Información</h2>

                <button
                  type="button"
                  className="boton-opciones"
                >
                  ⋮
                </button>
              </div>

              <p>
                Registro de peso, enfermedades, alergias, etc.
              </p>
            </article>

            {/* HISTORIAL MÉDICO */}
            <article className="bloque-historial">
              <div className="encabezado-bloque">
                <h2>Historial Médico</h2>

                <button
                  type="button"
                  className="boton-opciones"
                >
                  ⋮
                </button>
              </div>

              <p>
                Últimas citas veterinarias registradas,
                muestra fecha y razón:
              </p>

              <div className="fila-detalle">
                <p>Control por peso</p>

                <div className="acciones-detalle">
                  <span>17/08/2026</span>

                  <a href="perfil-mascota/historial-medico.html">
                    Ver historial completo
                  </a>
                </div>
              </div>
            </article>

            {/* VACUNAS */}
            <article className="bloque-vacunas">
              <div className="encabezado-bloque">
                <h2>Registro de vacunas</h2>

                <button
                  type="button"
                  className="boton-opciones"
                >
                  ⋮
                </button>
              </div>

              <p>
                Últimas vacunas registradas, muestra tipo y
                fecha de renovación:
              </p>

              <div className="fila-detalle">
                <p>Vacuna Antibiótica</p>

                <div className="acciones-detalle">
                  <span>17/08/2026</span>
                  <span>Renovar 17/08/2029</span>

                  <a href="perfil-mascota/historial-medico.html">
                    Ver registro completo
                  </a>
                </div>
              </div>
            </article>

          </section>
        </div>
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

export default PerfilMascota