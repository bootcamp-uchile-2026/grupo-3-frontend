import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

interface CardCarruselProps {
    children: ReactNode;
}

export function CardCarrusel({ children }: CardCarruselProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{
        pointerId: number;
        startX: number;
        startScrollLeft: number;
        captured: boolean;
    } | null>(null);
    const dragMovedRef = useRef(false);
    const [puedeRetroceder, setPuedeRetroceder] = useState(false);
    const [puedeAvanzar, setPuedeAvanzar] = useState(false);

    const actualizarControles = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;

        setPuedeRetroceder(track.scrollLeft > 1);
        setPuedeAvanzar(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    }, []);

    const desplazar = (direccion: -1 | 1) => {
        const track = trackRef.current;
        if (track) {
            track.scrollBy({ left: direccion * track.clientWidth, behavior: "smooth" });
        }
    };

    const iniciarArrastre = (event: ReactPointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        if (!track || event.pointerType !== "mouse" || event.button !== 0) return;

        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startScrollLeft: track.scrollLeft,
            captured: false,
        };
        dragMovedRef.current = false;
    };

    const arrastrar = (event: ReactPointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        const drag = dragRef.current;
        if (!track || !drag || drag.pointerId !== event.pointerId) return;

        const deltaX = event.clientX - drag.startX;
        if (Math.abs(deltaX) > 4) {
            dragMovedRef.current = true;
            if (!drag.captured) {
                track.setPointerCapture(event.pointerId);
                drag.captured = true;
            }
            event.preventDefault();
        }
        track.scrollLeft = drag.startScrollLeft - deltaX;
    };

    const terminarArrastre = (event: ReactPointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

        if (dragRef.current.captured && track?.hasPointerCapture(event.pointerId)) {
            track.releasePointerCapture(event.pointerId);
        }
        dragRef.current = null;
        window.setTimeout(() => {
            dragMovedRef.current = false;
        }, 0);
    };

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const animationFrame = requestAnimationFrame(actualizarControles);
        track.addEventListener("scroll", actualizarControles, { passive: true });
        window.addEventListener("resize", actualizarControles);

        const resizeObserver = typeof ResizeObserver === "undefined"
            ? null
            : new ResizeObserver(actualizarControles);
        resizeObserver?.observe(track);
        Array.from(track.children).forEach((child) => resizeObserver?.observe(child));

        return () => {
            cancelAnimationFrame(animationFrame);
            track.removeEventListener("scroll", actualizarControles);
            window.removeEventListener("resize", actualizarControles);
            resizeObserver?.disconnect();
        };
    }, [children, actualizarControles]);

    return (
        <div className="card-carrusel">
            <button
                className="card-carrusel__arrow"
                type="button"
                aria-label="Elementos anteriores"
                disabled={!puedeRetroceder}
                onClick={() => desplazar(-1)}
            >
                ‹
            </button>
            <div
                role="region"
                aria-label="Carrusel de tarjetas"
                className="card-carrusel__track"
                ref={trackRef}
                onPointerDown={iniciarArrastre}
                onPointerMove={arrastrar}
                onPointerUp={terminarArrastre}
                onPointerCancel={terminarArrastre}
                onClickCapture={(event) => {
                    if (dragMovedRef.current) {
                        event.preventDefault();
                        event.stopPropagation();
                        dragMovedRef.current = false;
                    }
                }}
            >
                {children}
            </div>
            <button
                className="card-carrusel__arrow"
                type="button"
                aria-label="Elementos siguientes"
                disabled={!puedeAvanzar}
                onClick={() => desplazar(1)}
            >
                ›
            </button>
        </div>
    );
}

export default CardCarrusel;
