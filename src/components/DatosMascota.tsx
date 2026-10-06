import './DatosMascota.css'

export function DatosMascota() {
  return (
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
  )
}