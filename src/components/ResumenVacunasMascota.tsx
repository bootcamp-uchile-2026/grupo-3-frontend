import './ResumenVacunasMascota.css'
import { Link } from 'react-router'

export function ResumenVacunasMascota() {
    return (
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

                    <Link to="/mi-perfil/perfil-mascota/historial-medico">
                        Ver registro completo
                    </Link>
                </div>
            </div>
        </article>
    )
}