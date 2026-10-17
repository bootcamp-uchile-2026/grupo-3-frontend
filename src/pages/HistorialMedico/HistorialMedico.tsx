import { useState } from "react";
import { TabConsultas } from "../../components/TabConsultas/TabConsultas";
import { TabVacunas } from "../../components/TabVacunas/TabVacunas";
import { TabExamenes } from "../../components/TabExamenes/TabExamenes";

const TABS = [
  { id: "consultas", label: "Consultas" },
  { id: "vacunas", label: "Vacunas" },
  { id: "examenes", label: "Exámenes" },
];

export function HistorialMedico() {
  const [tab, setTab] = useState("consultas");

  return (
      <section>
        <div className="container">
          <h1 className="titulo-seccion">Historial Médico</h1>

          <div className="tabs-container">
            <div className="tab-buttons">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  className={`tab-btn${tab === id ? " active" : ""}`}
                  onClick={() => setTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="tab-content active">
              {tab === "consultas" && <TabConsultas />}
              {tab === "vacunas" && <TabVacunas />}
              {tab === "examenes" && <TabExamenes />}
            </div>
          </div>
        </div>
      </section>
  );
}