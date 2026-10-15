import { useEffect, useState, type FormEvent } from 'react';
import { CardProducto } from '../../components/CardProducto/CardProducto';
import { FiltroTienda } from '../../components/FiltroTienda/FiltroTienda';
import { HeroTienda } from '../../components/HeroTienda/HeroTienda';
import { OrdenTienda } from '../../components/OrdenTienda/OrdenTienda';

type ProductoCatalogo = {
  id: string;
  nombre: string;
  precio: number;
  precioOriginal?: number;
  imagenes: string[];
  categoria: string;
  marca?: string;
  descuento?: number;
};

function normalizarTexto(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function esProductoCatalogo(value: unknown): value is ProductoCatalogo {
  return typeof value === 'object' && value !== null
    && 'id' in value && typeof value.id === 'string'
    && 'nombre' in value && typeof value.nombre === 'string'
    && 'precio' in value && typeof value.precio === 'number'
    && (!('precioOriginal' in value) || typeof value.precioOriginal === 'number')
    && 'imagenes' in value && Array.isArray(value.imagenes)
    && value.imagenes.length > 0
    && value.imagenes.every((imagen) => typeof imagen === 'string')
    && 'categoria' in value && typeof value.categoria === 'string'
    && (!('marca' in value) || typeof value.marca === 'string')
    && (!('descuento' in value) || typeof value.descuento === 'number');
}

export function Tienda() {
  const [productos, setProductos] = useState<ProductoCatalogo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCatalogo, setErrorCatalogo] = useState<string | null>(null);
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [marca, setMarca] = useState('');
  const [edad, setEdad] = useState(2);
  const [productosVisibles, setProductosVisibles] = useState<ProductoCatalogo[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const response = await fetch(
          'http://18.226.214.170:3000/api/v1/catalogo/productos',
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`No se pudo cargar el catálogo (${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('La respuesta del catálogo tiene un formato inválido.');
        }

        // Omitir elementos incompletos, pero informar el problema en lugar de fingir un catálogo completo.
        const productosValidos = data.filter(esProductoCatalogo);
        const invalidos = data.length - productosValidos.length;
        setProductos(productosValidos);
        setProductosVisibles(productosValidos);
        if (invalidos > 0) {
          setErrorCatalogo(`${invalidos} producto(s) del catálogo tienen datos incompletos y no se muestran.`);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('No se pudo cargar el catálogo de productos.', error);
          setErrorCatalogo(error instanceof Error ? error.message : 'No se pudo cargar el catálogo.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    void cargarProductos();
    return () => controller.abort();
  }, []);

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
        (producto) => normalizarTexto(producto.marca ?? '') === normalizarTexto(marca),
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
          {cargando && <p role="status">Cargando productos...</p>}
          {errorCatalogo && <p role="alert">{errorCatalogo}</p>}
          <div className="productos-lista">
            {productosVisibles.map((producto) => {
              return (
                <CardProducto
                  key={producto.id}
                  id={producto.id}
                  titulo={producto.nombre}
                  urlImagen={producto.imagenes[0]}
                  precio={producto.precio}
                  precioOriginal={producto.precioOriginal}
                  categoria={producto.categoria}
                />
              );
            })}
          </div>
          {!cargando && productos.length === 0 && !errorCatalogo && (
            <p>No hay productos disponibles en el catálogo.</p>
          )}
        </div>
      </section>
    </>
  );
}
