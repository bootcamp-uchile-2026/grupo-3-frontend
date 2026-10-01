
export type Filtros = {
  clinica: string;
  veterinario: string;
  desde: string;
  hasta: string;
};

export const FILTROS_VACIOS: Filtros = { clinica: "", veterinario: "", desde: "", hasta: "" };

const CLINICAS = ["Clínica 1", "Clínica 2", "Clínica 3"];
const VETERINARIOS = ["Veterinario 1", "Veterinario 2", "Veterinario 3"];

// Sirve para cualquier registro que tenga estos tres campos
export function filtrar<T extends { clinica: string; veterinario: string; fecha: string }>(
  items: T[],
  f: Filtros
): T[] {
  return items.filter(
    (i) =>
      (!f.clinica || i.clinica === f.clinica) &&
      (!f.veterinario || i.veterinario === f.veterinario) &&
      (!f.desde || i.fecha >= f.desde) &&
      (!f.hasta || i.fecha <= f.hasta)
  );
}

type Props = {
  prefix: string; // evita IDs duplicados entre pestañas
  onBuscar: (filtros: Filtros) => void;
};

export function FiltroClinicaVet({ prefix, onBuscar }: Props) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    onBuscar({
      clinica: String(data.get("clinica") ?? ""),
      veterinario: String(data.get("veterinario") ?? ""),
      desde: String(data.get("desde") ?? ""),
      hasta: String(data.get("hasta") ?? ""),
    });
  };

  return (
    <div className="filtro-wrapper">
      <form className="form-column" onSubmit={handleSubmit}>
        <label htmlFor={`${prefix}-clinica`}>Clínica</label>
        <select name="clinica" id={`${prefix}-clinica`}>
          <option value="">Todas</option>
          {CLINICAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label htmlFor={`${prefix}-vet`}>Veterinario</label>
        <select name="veterinario" id={`${prefix}-vet`}>
          <option value="">Todos</option>
          {VETERINARIOS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <label htmlFor={`${prefix}-desde`}>Desde</label>
        <input type="date" name="desde" id={`${prefix}-desde`} />

        <label htmlFor={`${prefix}-hasta`}>Hasta</label>
        <input type="date" name="hasta" id={`${prefix}-hasta`} />

        <button type="submit" className="btn-1">Buscar</button>
      </form>
    </div>
  );
}