import './ResumenHistorialMascota.css'
import { Link } from 'react-router'

export function ResumenHistorialMascota() {
  return (
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

          <Link to="/mi-perfil/perfil-mascota/historial-medico">
            Ver historial completo
          </Link>
        </div>
      </div>
    </article>
  )
}