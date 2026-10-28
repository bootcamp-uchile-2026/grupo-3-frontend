import type { UIKitIconName } from "./components/UIKit/UIIcons/UIKitIcon"

export type HeaderOption = {
    route: string,
    icon: UIKitIconName,
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
