import { useState } from "react";
import { FiltroClinicaVet, FILTROS_VACIOS, filtrar, type Filtros } from "./FiltroClinicaVet";
import { Campo, ModalClinicaVet } from "./ModalClinicaVet";

type Vacuna = {
    id: number;
    clinica: string;
    veterinario: string;
    fecha: string;
    vacuna: string;
    detalles: string;
};

const VACUNAS: Vacuna[] = [
    { id: 1, clinica: "Clínica 1", veterinario: "Veterinario 1", fecha: "2026-02-14", vacuna: "Vacuna 1", detalles: "Marca 1 · próxima dosis 2027-02-14" },
    { id: 2, clinica: "Clínica 3", veterinario: "Veterinario 2", fecha: "2026-06-30", vacuna: "Vacuna 2", detalles: "Marca 2 · próxima dosis 2026-12-30" },
];

export function TabVacunas() {
    const [filtros, setFiltros] = useState<Filtros>(FILTROS_VACIOS);
    const filas = filtrar(VACUNAS, filtros);
    const [modalAbierto, setModalAbierto] = useState(false);
    const handleGuardar = (data: FormData) => {
        console.log(Object.fromEntries(data)); // en el Paso 6 lo guardamos de verdad
        setModalAbierto(false);
    };
    return (
        <>
            <div className="tab-head-vacuna">
                <input type="text" name="buscar" placeholder="Buscar" />
                <button type="button" className="btn-1" onClick={() => setModalAbierto(true)}>
                    Agregar Vacuna
                </button>
            </div>

            <div className="filtro-tabla">
                <FiltroClinicaVet prefix="vacunas" onBuscar={setFiltros} />

                <div className="tabla-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Clínica</th>
                                <th>Veterinario</th>
                                <th>Fecha</th>
                                <th>Vacuna</th>
                                <th>Detalles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filas.map((v) => (
                                <tr key={v.id}>
                                    <td>{v.clinica}</td>
                                    <td>{v.veterinario}</td>
                                    <td>{v.fecha}</td>
                                    <td>{v.vacuna}</td>
                                    <td>{v.detalles}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {modalAbierto && (
                <ModalClinicaVet
                    titulo="Agregar / Editar vacuna"
                    onClose={() => setModalAbierto(false)}
                    onSubmit={handleGuardar}
                >
                    <Campo label="Clínica" id="vacuna-clinica">
                        <input type="text" id="vacuna-clinica" name="clinica" />
                    </Campo>
                    <Campo label="Veterinario" id="vacuna-vet">
                        <input type="text" id="vacuna-vet" name="veterinario" />
                    </Campo>

                    <div className="form-row">
                        <Campo label="Vacuna" id="vacuna-nombre">
                            <select id="vacuna-nombre" name="vacuna">
                                <option value="Vacuna 1">Vacuna 1</option>
                                <option value="Vacuna 2">Vacuna 2</option>
                                <option value="Vacuna 3">Vacuna 3</option>
                            </select>
                        </Campo>
                        <Campo label="Marca" id="vacuna-marca">
                            <select id="vacuna-marca" name="marca">
                                <option value="Marca 1">Marca 1</option>
                                <option value="Marca 2">Marca 2</option>
                                <option value="Marca 3">Marca 3</option>
                            </select>
                        </Campo>
                    </div>

                    <div className="form-row">
                        <Campo label="Fecha" id="vacuna-fecha">
                            <input type="date" id="vacuna-fecha" name="fecha" />
                        </Campo>
                        <Campo label="Próxima dosis" id="vacuna-proxima">
                            <input type="date" id="vacuna-proxima" name="proximaDosis" />
                        </Campo>
                    </div>
                </ModalClinicaVet>
            )}
        </>
    );
}