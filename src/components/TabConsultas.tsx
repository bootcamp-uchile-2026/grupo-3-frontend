import { useState } from "react";
import { FiltroClinicaVet, FILTROS_VACIOS, filtrar, type Filtros } from "./FiltroClinicaVet";
import { Campo, ModalClinicaVet } from "./ModalClinicaVet";

type Consulta = {
  id: number;
  clinica: string;
  veterinario: string;
  fecha: string;
  descripcion: string;
};

const CONSULTAS: Consulta[] = [
  { id: 1, clinica: "Clínica 1", veterinario: "Veterinario 1", fecha: "2026-03-10", descripcion: "Control general" },
  { id: 2, clinica: "Clínica 2", veterinario: "Veterinario 2", fecha: "2026-05-22", descripcion: "Revisión dental" },
  { id: 3, clinica: "Clínica 1", veterinario: "Veterinario 3", fecha: "2026-08-01", descripcion: "Alergia en la piel" },
];

export function TabConsultas() {
  const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
  const [modalAbierto, setModalAbierto] = useState(false);
  const filas = filtrar(CONSULTAS, filtros);
  const handleGuardar = (data: FormData) => {
    console.log(Object.fromEntries(data)); // en el Paso 6 lo guardamos de verdad
    setModalAbierto(false);
  };
  return (
    <>
      <button type="button" className="btn-1 btn-add" onClick={() => setModalAbierto(true)}>Agregar Consulta</button>

      <div className="filtro-tabla">
        <FiltroClinicaVet prefix="consultas" onBuscar={setFiltros} />

        <div className="tabla-wrapper">
          <table>
            <thead>
              <tr>
                <th>Clínica</th>
                <th>Veterinario</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((c) => (
                <tr key={c.id}>
                  <td>{c.clinica}</td>
                  <td>{c.veterinario}</td>
                  <td>{c.fecha}</td>
                  <td>{c.descripcion}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalAbierto && (
        <ModalClinicaVet
          titulo="Agregar / Editar consulta"
          onClose={() => setModalAbierto(false)}
          onSubmit={handleGuardar}
        >
          <Campo label="Clínica" id="consulta-clinica">
            <input type="text" id="consulta-clinica" name="clinica" />
          </Campo>
          <Campo label="Veterinario" id="consulta-vet">
            <input type="text" id="consulta-vet" name="veterinario" />
          </Campo>
          <Campo label="Fecha" id="consulta-fecha">
            <input type="date" id="consulta-fecha" name="fecha" />
          </Campo>
          <Campo label="Descripción" id="consulta-desc">
            <textarea id="consulta-desc" name="descripcion" rows={10} />
          </Campo>
        </ModalClinicaVet>
      )}
    </>
  );
}