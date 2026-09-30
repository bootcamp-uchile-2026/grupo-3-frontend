import './Configuracion.css'
function Configuracion() {
  return (
    <>
      <header className="site-header">
        {/* BARRA SUPERIOR OSCURA */}
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

        {/* BARRA INFERIOR DE CATEGORÍAS */}
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

      <main>
        <div className="menu-contenido-perfil-usuario">
          {/* MENÚ DEL PERFIL */}
          <nav className="menu-perfil">
            <ul>
              <li>
                <a href="perfil-mascota.html">Mis mascotas</a>
              </li>

              <li>
                <a href="#">Seguimiento de pedido</a>
              </li>

              <li>
                <a href="#">Detalles de la cuenta</a>
              </li>

              <li className="activo">
                <a href="configuracion.html">Configuración</a>
              </li>

              <li>
                <a href="#">Métodos de pago</a>
              </li>

              <li>
                <a href="#">Historial de compras</a>
              </li>

              <li>
                <a href="#">Direcciones</a>
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
      </main>
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
                <a href="/preguntas-frecuentes">Preguntas frecuentes</a>
              </li>
              <li>
                <a href="/terminos-condiciones">Términos y condiciones</a>
              </li>
              <li>
                <a href="/politicas-privacidad">Políticas de privacidad</a>
              </li>
              <li>
                <a href="/cambios-devoluciones">Cambios y devoluciones</a>
              </li>
            </ul>

            <ul>
              <li>
                <a href="/nosotros">Nosotros</a>
              </li>
              <li>
                <a href="/sobre-nosotros">Sobre nosotros</a>
              </li>
              <li>
                <a href="/horario-atencion">Horario de atención</a>
              </li>
              <li>
                <a href="/sugerencias-reclamos">Sugerencias y reclamos</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © 2024 Company name. All Rights Reserved</p>

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

export default Configuracion