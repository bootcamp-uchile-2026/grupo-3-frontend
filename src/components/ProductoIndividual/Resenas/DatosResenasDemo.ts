export type FiltroResenas = "todas" | "recientes" | "positivas" | "criticas";

export type Resena = {
    id: string;
    nombre: string;
    puntuacion: number;
    fecha: string;
    titulo: string;
    comentario: string;
};

// Datos de muestra para desarrollar la interfaz; no son opiniones verificadas del producto.
export const resenasDemostracion: Resena[] = [
    {
        id: "demo-1",
        nombre: "Daniela",
        puntuacion: 4,
        fecha: "2026-09-24",
        titulo: "Buena relación precio-calidad",
        comentario: "Cumple su función y se siente resistente. El tamaño resultó práctico para el uso diario.",
    },
    {
        id: "demo-2",
        nombre: "María",
        puntuacion: 5,
        fecha: "2026-09-22",
        titulo: "Muy práctico y bonito",
        comentario: "Es fácil de limpiar y el diseño combina bien con el espacio.",
    },
    {
        id: "demo-3",
        nombre: "Andrés",
        puntuacion: 4,
        fecha: "2026-09-20",
        titulo: "Buen producto",
        comentario: "Llegó en buenas condiciones y cumple con lo esperado.",
    },
    {
        id: "demo-4",
        nombre: "Diego",
        puntuacion: 3,
        fecha: "2026-09-18",
        titulo: "Podría tener más capacidad",
        comentario: "El producto funciona bien, aunque habría preferido una capacidad mayor.",
    },
    {
        id: "demo-5",
        nombre: "Camila",
        puntuacion: 5,
        fecha: "2026-09-15",
        titulo: "Recomendado",
        comentario: "Buena calidad y muy cómodo para el uso cotidiano.",
    },
    {
        id: "demo-6",
        nombre: "Javier",
        puntuacion: 2,
        fecha: "2026-09-12",
        titulo: "No era lo que esperaba",
        comentario: "El acabado no coincidió del todo con lo que imaginaba al verlo en línea.",
    },
];
