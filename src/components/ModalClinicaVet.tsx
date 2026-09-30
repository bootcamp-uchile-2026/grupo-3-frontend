import { useEffect, type ReactNode } from "react";

type ModalProps = {
  titulo: string;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  children: ReactNode;
};

export function Campo({ label, id, children }: { label: string; id: string; children: ReactNode }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
}

export function ModalClinicaVet({ titulo, onClose, onSubmit, children }: ModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(new FormData(e.currentTarget));
  };

  return (
    <section className="modal-section">
      <div className="modal-container">
        <h3 className="modal-title">{titulo}</h3>
        <form onSubmit={handleSubmit}>
          {children}
          <div className="form-row">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Ok</button>
          </div>
        </form>
      </div>
    </section>
  );
}