import { useState, type ChangeEvent } from "react";
import { Campo, ModalClinicaVet } from "./ModalClinicaVet";

type Examen = {
    id: number;
    nombre: string;
    tipo: string;
    fecha: string;
    clinica: string;
};

type FiltrosExamen = {
    buscar: string;
    tipo: string;
    fecha: string;
    clinica: string;
};

const EXAMENES: Examen[] = [
    { id: 1, nombre: "Hemograma", tipo: "Tipo 1", fecha: "2026-04-12", clinica: "Clínica 1" },
    { id: 2, nombre: "Radiografía de tórax", tipo: "Tipo 2", fecha: "2026-07-03", clinica: "Clínica 2" },
    { id: 3, nombre: "Perfil renal", tipo: "Tipo 1", fecha: "2026-08-19", clinica: "Clínica 1" },
];

const TIPOS = ["Tipo 1", "Tipo 2", "Tipo 3"];
const CLINICAS = ["Clínica 1", "Clínica 2", "Clínica 3"];

const FILTROS_VACIOS: FiltrosExamen = { buscar: "", tipo: "", fecha: "", clinica: "" };

export function TabExamenes() {
    const [filtros, setFiltros] = useState<FiltrosExamen>(FILTROS_VACIOS);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const filas = EXAMENES.filter(
        (x) =>
            (!filtros.buscar ||
                x.nombre.toLowerCase().includes(filtros.buscar.toLowerCase())) &&
            (!filtros.tipo || x.tipo === filtros.tipo) &&
            (!filtros.fecha || x.fecha === filtros.fecha) &&
            (!filtros.clinica || x.clinica === filtros.clinica)
    );
    const [modalAbierto, setModalAbierto] = useState(false);

    const handleGuardar = (data: FormData) => {
        console.log(Object.fromEntries(data)); // en el Paso 6 lo guardamos de verdad
        setModalAbierto(false);
    };
    return (
        <>
            <div className="tab-head-examen">
                <div className="filtro-wrapper">
                    <form className="form-row" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="examenes-buscar">Examen</label>
                            <input
                                type="text"
                                id="examenes-buscar"
                                name="buscar"
                                placeholder="Buscar"
                                value={filtros.buscar}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="examenes-tipo">Tipo</label>
                            <select
                                id="examenes-tipo"
                                name="tipo"
                                value={filtros.tipo}
                                onChange={handleChange}
                            >
                                <option value="">Todos</option>
                                {TIPOS.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="examenes-fecha">Fecha</label>
                            <input
                                type="date"
                                id="examenes-fecha"
                                name="fecha"
                                value={filtros.fecha}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="examenes-clinica">Clínica</label>
                            <select
                                id="examenes-clinica"
                                name="clinica"
                                value={filtros.clinica}
                                onChange={handleChange}
                            >
                                <option value="">Todas</option>
                                {CLINICAS.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>

                <button type="button" className="btn-1" onClick={() => setModalAbierto(true)}>
                    Agregar Examen
                </button>
            </div>

            <div className="tabla-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Clínica</th>
                            <th>Veterinario</th>
                            <th>Fecha</th>
                            <th>Examen</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filas.map((x) => (
                            <tr key={x.id}>
                                <td>{x.clinica}</td>
                                <td></td>
                                <td>{x.fecha}</td>
                                <td>{x.nombre}</td>
                                <td>{x.tipo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="visual-examen">
                <img src="https://placehold.co/612x792.png" alt="" />
            </div>
            {modalAbierto && (
                <ModalClinicaVet
                    titulo="Agregar / Editar examen"
                    onClose={() => setModalAbierto(false)}
                    onSubmit={handleGuardar}
                >
                    <div className="form-row">
                        <Campo label="Examen" id="examen-nombre">
                            <input type="text" id="examen-nombre" name="nombre" />
                        </Campo>
                        <Campo label="Tipo" id="examen-tipo">
                            <select id="examen-tipo" name="tipo">
                                {TIPOS.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </Campo>
                        <Campo label="Fecha" id="examen-fecha">
                            <input type="date" id="examen-fecha" name="fecha" />
                        </Campo>
                    </div>

                    <Campo label="Clínica" id="examen-clinica">
                        <input type="text" id="examen-clinica" name="clinica" />
                    </Campo>

                    <Campo label="Documento" id="examen-doc">
                        <input type="file" id="examen-doc" name="doc" />
                    </Campo>
                </ModalClinicaVet>
            )}
        </>
    );
}