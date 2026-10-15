import { DatosMascota } from '../../components/DatosMascota/DatosMascota'
import { InformacionMascota } from '../../components/InformacionMascota/InformacionMascota'
import { ResumenHistorialMascota } from '../../components/ResumenHistorialMascota/ResumenHistorialMascota'
import { ResumenVacunasMascota } from '../../components/ResumenVacunasMascota/ResumenVacunasMascota'


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