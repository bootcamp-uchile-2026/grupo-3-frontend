import './InformacionMascota.css'

export function InformacionMascota() {
  return (
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
  )
}