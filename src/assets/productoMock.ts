export type Producto = {
  idProducto: number;
  titulo: string;
  urlImagen: string;
  precio: number;
  categoria: string;
  rating?: number;
  badge?: string;
  descuento?: number;
};

export const productosMock: Producto[] = [
  {
    idProducto: 1,
    titulo: "Alimento Premium Perro",
    categoria: "Perros",
    precio: 50,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.5,
    badge: "Nuevo",
    descuento: 5,
  },
  {
    idProducto: 2,
    titulo: "Arena para Gatos",
    categoria: "Gatos",
    precio: 75,
    urlImagen: "https://placehold.co/400x400",
    rating: 5,
  },
  {
    idProducto: 3,
    titulo: "Jaula para Aves",
    categoria: "Aves",
    precio: 120,
    urlImagen: "https://placehold.co/400x400",
    rating: 3.8,
    descuento: 10,
  },
  {
    idProducto: 4,
    titulo: "Filtro para Pecera",
    categoria: "Peces",
    precio: 200,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.2,
  },
  {
    idProducto: 5,
    titulo: "Collar Antipulgas",
    categoria: "Perros",
    precio: 35,
    urlImagen: "https://placehold.co/400x400",
    badge: "Oferta",
    rating: 4,
  },
  {
    idProducto: 6,
    titulo: "Comedero para Canarios",
    categoria: "Aves",
    precio: 25,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.1,
  },
  {
    idProducto: 7,
    titulo: "Alimento para Loros",
    categoria: "Aves",
    precio: 60,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.7,
    descuento: 15,
  },
  {
    idProducto: 8,
    titulo: "Decoración Acuario Rocas Naturales",
    categoria: "Peces",
    precio: 45,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.3,
  },
  {
    idProducto: 9,
    titulo: "Alimento Escamas Tropicales",
    categoria: "Peces",
    precio: 30,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.6,
    badge: "Top Ventas",
  },
  {
    idProducto: 10,
    titulo: "Alimento para Hurones",
    categoria: "Exóticos",
    precio: 80,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.4,
  },
  {
    idProducto: 11,
    titulo: "Terrario para Gecko",
    categoria: "Exóticos",
    precio: 150,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.8,
    descuento: 20,
  },
  {
    idProducto: 12,
    titulo: "Lámpara UVB para Iguanas",
    categoria: "Exóticos",
    precio: 95,
    urlImagen: "https://placehold.co/400x400",
    rating: 4.5,
    badge: "Recomendado",
  },
];