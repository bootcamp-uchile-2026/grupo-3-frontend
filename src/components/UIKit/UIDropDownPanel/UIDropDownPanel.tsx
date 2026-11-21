import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FocusEvent, MouseEvent, ReactNode } from "react";
import "./UIDropDownPanel.css";

export type UIDropDownPanelProps = {
  trigger: ReactNode | ((open: boolean) => ReactNode);
  children: ReactNode;
  openOn?: "hover" | "click";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end" | "full";
  closeDelay?: number;
  ariaLabel?: string;
  className?: string;
  panelClassName?: string;
};

export function UIDropDownPanel({
  trigger,
  children,
  openOn = "hover",
  open: openProp,
  onOpenChange,
  align = "start",
  closeDelay = 200,
  ariaLabel,
  className,
  panelClassName,
}: UIDropDownPanelProps) {
  const [openInterno, setOpenInterno] = useState(false);
  const controlado = openProp !== undefined;
  const open = controlado ? openProp : openInterno;

  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const setOpen = useCallback(
    (valor: boolean) => {
      if (!controlado) setOpenInterno(valor);
      onOpenChange?.(valor);
    },
    [controlado, onOpenChange],
  );

  const cancelarCierre = () => window.clearTimeout(timer.current);

  const abrir = () => {
    cancelarCierre();
    if (!open) setOpen(true);
  };

  const cerrarConRetraso = () => {
    cancelarCierre();
    timer.current = window.setTimeout(() => setOpen(false), closeDelay);
  };


  useEffect(() => {
    if (!open) return;

    const alPresionarFuera = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const alPresionarTecla = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", alPresionarFuera);
    document.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.removeEventListener("pointerdown", alPresionarFuera);
      document.removeEventListener("keydown", alPresionarTecla);
    };
  }, [open, setOpen]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const alPerderFoco = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  const alHacerClicEnPanel = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };

  const clases = [
    "ui-dropdown",
    `ui-dropdown--${align}`,
    open ? "ui-dropdown--open" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const clasesPanel = [
    "ui-dropdown__panel",
    `ui-dropdown__panel--${align}`,
    open ? "ui-dropdown__panel--open" : "",
    panelClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={clases}
      onMouseEnter={openOn === "hover" ? abrir : undefined}
      onMouseLeave={openOn === "hover" ? cerrarConRetraso : undefined}
      onFocus={openOn === "hover" ? abrir : undefined}
      onBlur={alPerderFoco}
    >
      <div
        className="ui-dropdown__trigger"
        onClick={openOn === "click" ? () => setOpen(!open) : undefined}
      >
        {typeof trigger === "function" ? trigger(open) : trigger}
      </div>

      <div
        id={panelId}
        className={clasesPanel}
        role="region"
        aria-label={ariaLabel}
        aria-hidden={!open}
        onClick={alHacerClicEnPanel}
      >
        {children}
      </div>
    </div>
  );
}