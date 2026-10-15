export function AgendarVeterinarioDatosContacto() {
  return (
    <>
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
    </>
  )
}
