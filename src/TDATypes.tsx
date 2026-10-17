export type HeaderOption = {
    route: string,
    icon: string,
    color: string,
    name: string
}

export type Categoria = {
    id: string;
    nombre: string;
    imagen: string;
    ruta: string;
};

export type ProductoOferta = {
    id: string;
    nombre: string;
    precio: number;
    precioOriginal: number;
    imagenes: string[];
    categoria: string;
};
