import { useState, type FormEvent } from 'react';
import type { Producto } from '../../assets/productoMock';
import { CardProducto } from '../../components/CardProducto/CardProducto';
import { FiltroTienda } from '../../components/FiltroTienda/FiltroTienda';
import { HeroTienda } from '../../components/HeroTienda/HeroTienda';
import { OrdenTienda } from '../../components/OrdenTienda/OrdenTienda';

type TiendaProps = {
  productos: Producto[];
};

function normalizarTexto(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function Tienda({ productos }: TiendaProps) {
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [marca, setMarca] = useState('');
  const [edad, setEdad] = useState(2);
  const [productosVisibles, setProductosVisibles] = useState(productos);

  const aplicarFiltros = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let filtrados = productos;

    if (categoria) {
      filtrados = filtrados.filter(
        (producto) => normalizarTexto(producto.categoria) === normalizarTexto(categoria),
      );
    }

    if (precio) {
      const [min, max] = precio.split('-').map(Number);
      filtrados = filtrados.filter((producto) => producto.precio >= min && producto.precio <= max);
    }

    if (marca) {
      filtrados = filtrados.filter(
        (producto) => normalizarTexto(producto.badge ?? '') === normalizarTexto(marca),
      );
    }

    if (edad) {
      filtrados = filtrados.filter(
        (producto) => producto.descuento === undefined || producto.descuento <= edad,
      );
    }

    setProductosVisibles(filtrados);
  };

  const limpiarFiltros = () => {
    setCategoria('');
    setPrecio('');
    setMarca('');
    setEdad(2);
    setProductosVisibles(productos);
  };

  return (
    <>
      <section>
        <HeroTienda />
      </section>
      <section>
        <div className="container filtro-productos">
          <OrdenTienda />
          <FiltroTienda
            categoria={categoria}
            precio={precio}
            marca={marca}
            edad={edad}
            onCategoriaChange={setCategoria}
            onPrecioChange={setPrecio}
            onMarcaChange={setMarca}
            onEdadChange={setEdad}
            onSubmit={aplicarFiltros}
            onClear={limpiarFiltros}
          />
          <div className="productos-lista">
            {productosVisibles.map((producto) => {
              const precioFinal = producto.descuento
                ? producto.precio - (producto.precio * producto.descuento) / 100
                : producto.precio;

              return (
                <CardProducto
                  key={producto.idProducto}
                  id={String(producto.idProducto)}
                  titulo={producto.titulo}
                  urlImagen={producto.urlImagen}
                  precio={precioFinal}
                  precioOriginal={producto.descuento ? producto.precio : undefined}
                  categoria={producto.categoria}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
