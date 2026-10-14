import './PerfilMascota.css'
import { DatosMascota } from '../components/DatosMascota'
import { InformacionMascota } from '../components/InformacionMascota'
import { ResumenHistorialMascota } from '../components/ResumenHistorialMascota'
import { ResumenVacunasMascota } from '../components/ResumenVacunasMascota'


function PerfilMascota() {
  return (
    <>
      {/* CONTENIDO PRINCIPAL */}
      <div className="datos-detalle-mascota">

       <DatosMascota />

        <section className="detalle-mascota">

         <InformacionMascota />

          <ResumenHistorialMascota />

       <ResumenVacunasMascota />

        </section>
      </div>
    </>
  )
}

export default PerfilMascota