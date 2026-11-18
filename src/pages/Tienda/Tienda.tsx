import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { z } from 'zod';
import UIButton from '../../components/UIKit/UIButton/UIButton';
import { UIProductCard } from '../../components/UIKit/UIProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { FiltroTienda, type FiltroClave, type SeleccionesFiltro } from '../../components/FiltroTienda/FiltroTienda';
import { subcategoriasMascota } from '../../components/FiltroTienda/subcategoriasMascota';
import { HeroTienda } from '../../components/HeroTienda/HeroTienda';
import { useCarrito } from '../../context/CarritoContext';
import { agregarProductoAlCarrito } from '../../services/carrito';

type OrdenTiendaValor = 'catalogo' | 'precio-asc' | 'precio-desc' | 'nombre';
type VistaTienda = 'grid' | 'list';

const productoCatalogoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  precio: z.number(),
  precioOriginal: z.number().optional(),
  imagenes: z.array(z.string()).min(1),
  categoria: z.string(),
  marca: z.string().optional(),
  descuento: z.number().optional(),
  calificacionPromedio: z.number().min(0).max(5).optional(),
  especie: z.string().optional(),
  subcategoria: z.string().optional(),
  descripcion: z.string().optional(),
  fichaTecnica: z.string().optional(),
  modoDeUso: z.string().optional(),
  fichaTecnicaDetalle: z.record(z.string(), z.union([z.string(), z.number()])).optional(),
}).catchall(z.unknown());

type ProductoCatalogo = z.infer<typeof productoCatalogoSchema>;

type EstadoCarritoProducto = 'idle' | 'agregando' | 'agregado' | 'error';

function formatoPrecio(precio: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio);
}

function TarjetaProductoTienda({
  producto,
  vista,
}: {
  producto: ProductoCatalogo;
  vista: VistaTienda;
}) {
  const { dispatch } = useCarrito();
  const [estadoCarrito, setEstadoCarrito] = useState<EstadoCarritoProducto>('idle');

  async function agregarAlCarrito() {
    setEstadoCarrito('agregando');
    try {
      const carrito = await agregarProductoAlCarrito(producto.id, 1);
      dispatch({ type: 'SINCRONIZAR', carrito });
      setEstadoCarrito('agregado');
    } catch (error) {
      console.error('No se pudo agregar el producto al carrito.', error);
      setEstadoCarrito('error');
    }
  }

  return (
    <div className={`tienda-pagina__tarjeta tienda-pagina__tarjeta--${vista}`}>
      <UIProductCard
        className={`tienda-pagina__producto-card tienda-pagina__producto-card--${vista}`}
        imageSrc={producto.imagenes[0]}
        imageAlt={producto.nombre}
        name={producto.nombre}
        price={formatoPrecio(producto.precio)}
        previousPrice={producto.precioOriginal !== undefined && producto.precioOriginal > producto.precio
          ? formatoPrecio(producto.precioOriginal)
          : undefined}
        rating={producto.calificacionPromedio}
        discountPercentage={typeof producto.descuento === 'number' && producto.descuento > 0
          ? producto.descuento
          : undefined}
        productTo={`/producto-individual/${encodeURIComponent(producto.id)}`}
        buttonLabel={estadoCarrito === 'agregando'
          ? 'Agregando...'
          : estadoCarrito === 'agregado'
            ? 'Agregado'
            : 'Añadir al carrito'}
        onAddToCart={agregarAlCarrito}
        buttonDisabled={!producto.id}
        loading={estadoCarrito === 'agregando'}
        selected={estadoCarrito === 'agregado'}
      />
      {estadoCarrito === 'error' && (
        <p className="tienda-pagina__feedback" role="alert">
          No se pudo agregar el producto. Inténtalo nuevamente.
        </p>
      )}
    </div>
  );
}

const filtrosIniciales: SeleccionesFiltro = {
  mascota: [],
  tipoProducto: [],
  edad: [],
  tipoComida: [],
  sabor: [],
  formato: [],
  material: [],
  marca: [],
};

function normalizarTexto(texto: string): string {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function coincideConSeleccion(valores: string[], seleccionados: string[]): boolean {
  return seleccionados.some((seleccionado) => {
    const opcion = normalizarTexto(seleccionado);
    return valores.some((valor) => normalizarTexto(valor).includes(opcion));
  });
}

function textosTecnicos(producto: ProductoCatalogo): string[] {
  return [
    producto.nombre,
    producto.descripcion,
    producto.fichaTecnica,
    producto.modoDeUso,
    ...Object.entries(producto.fichaTecnicaDetalle ?? {})
      .flatMap(([clave, valor]) => [clave, String(valor)]),
  ].filter((valor): valor is string => typeof valor === 'string');
}

function etiquetaCategoria(slug: string): string {
  const etiquetas: Record<string, string> = {
    farmacia: 'Farmacia',
    gatos: 'Gato',
    perros: 'Perro',
    exoticos: 'Exóticos',
    ofertas: 'Outlet',
  };
  return etiquetas[slug] ?? slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letra) => letra.toLocaleUpperCase());
}

function productoCoincideConRuta(producto: ProductoCatalogo, slug: string): boolean {
  const especie = normalizarTexto(producto.especie ?? '');
  const categoria = normalizarTexto(producto.categoria);
  switch (slug) {
    case 'gatos':
      return especie === 'gato';
    case 'perros':
      return especie === 'perro';
    case 'farmacia':
      return categoria.includes('farmacia');
    case 'exoticos': {
      const especiesAgrupadas = subcategoriasMascota.flatMap((grupo) => grupo.opciones)
        .map(normalizarTexto);
      return categoria.includes('exotico') || especiesAgrupadas.includes(especie);
    }
    case 'ofertas':
      return typeof producto.descuento === 'number' && producto.descuento > 0;
    default:
      return [producto.categoria, producto.especie ?? '', producto.subcategoria ?? '']
        .some((valor) => normalizarTexto(valor).replace(/\s+/g, '-') === slug);
  }
}

export function Tienda() {
  const { pathname } = useLocation();
  const [productos, setProductos] = useState<ProductoCatalogo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCatalogo, setErrorCatalogo] = useState<string | null>(null);
  const [selecciones, setSelecciones] = useState<SeleccionesFiltro>(filtrosIniciales);
  const [vista, setVista] = useState<VistaTienda>('grid');
  const [orden, setOrden] = useState<OrdenTiendaValor>('catalogo');
  const [paginacion, setPaginacion] = useState({ pathname, limite: 12 });
  const limiteProductos = paginacion.pathname === pathname ? paginacion.limite : 12;
  const slugCategoria = pathname.startsWith('/categoria/')
    ? decodeURIComponent(pathname.slice('/categoria/'.length).split('/')[0]).toLocaleLowerCase()
    : '';
  const tituloCategoria = slugCategoria ? etiquetaCategoria(slugCategoria) : 'Tienda';
  const itemsBreadcrumb = [
    { label: 'Inicio', to: '/' },
    ...(slugCategoria ? [{ label: tituloCategoria, to: pathname }] : [{ label: 'Tienda', to: '/tienda' }]),
  ];

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
        const productosValidos = data.flatMap((producto: unknown) => {
          const resultado = productoCatalogoSchema.safeParse(producto);
          return resultado.success ? [resultado.data] : [];
        });
        const invalidos = data.length - productosValidos.length;
        setProductos(productosValidos);
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

  const productosFiltrados = useMemo(() => productos.filter((producto) => {
    if (slugCategoria && !productoCoincideConRuta(producto, slugCategoria)) {
      return false;
    }

    const textos = textosTecnicos(producto);

    if (selecciones.mascota.length > 0
      && !coincideConSeleccion([producto.especie ?? ''], selecciones.mascota)) {
      return false;
    }

    if (selecciones.tipoProducto.length > 0
      && !coincideConSeleccion(
        [producto.categoria, producto.subcategoria ?? ''],
        selecciones.tipoProducto,
      )) {
      return false;
    }

    if (selecciones.edad.length > 0
      && !coincideConSeleccion(textos, selecciones.edad)) {
      return false;
    }

    if (selecciones.tipoComida.length > 0
      && !coincideConSeleccion(textos, selecciones.tipoComida)) {
      return false;
    }

    if (selecciones.sabor.length > 0
      && !coincideConSeleccion(textos, selecciones.sabor)) {
      return false;
    }

    if (selecciones.formato.length > 0
      && !coincideConSeleccion(textos, selecciones.formato)) {
      return false;
    }

    if (selecciones.material.length > 0
      && !coincideConSeleccion(textos, selecciones.material)) {
      return false;
    }

    if (selecciones.marca.length > 0
      && !coincideConSeleccion([producto.marca ?? ''], selecciones.marca)) {
      return false;
    }

    return true;
  }), [productos, selecciones, slugCategoria]);

  const productosOrdenados = useMemo(() => {
    const resultados = [...productosFiltrados];
    switch (orden) {
      case 'precio-asc':
        return resultados.sort((a, b) => a.precio - b.precio);
      case 'precio-desc':
        return resultados.sort((a, b) => b.precio - a.precio);
      case 'nombre':
        return resultados.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
      default:
        return resultados;
    }
  }, [orden, productosFiltrados]);

  const productosMostrados = productosOrdenados.slice(0, limiteProductos);
  const hayFiltrosActivos = Object.values(selecciones).some((valores) => valores.length > 0);

  const actualizarSeleccion = (
    clave: FiltroClave,
    valor: string,
    seleccionado: boolean,
  ) => {
    setPaginacion({ pathname, limite: 12 });
    setSelecciones((actuales) => ({
      ...actuales,
      [clave]: seleccionado
        ? [...actuales[clave], valor]
        : actuales[clave].filter((seleccionadoActual) => seleccionadoActual !== valor),
    }));
  };

  const limpiarFiltros = () => {
    setSelecciones(filtrosIniciales);
    setPaginacion({ pathname, limite: 12 });
  };

  return (
    <div className="tienda-pagina">
      <HeroTienda />
      <div className="tienda-pagina__contenedor">
        <h1 className="tienda-pagina__titulo">{tituloCategoria}</h1>
        <div className="tienda-pagina__controles">
          <Breadcrumbs items={itemsBreadcrumb} />
          <div className="orden-tienda">
            <label>
              Ordenar por{' '}
              <select
                value={orden}
                onChange={(event) => {
                  setOrden(event.target.value as OrdenTiendaValor);
                  setPaginacion({ pathname, limite: 12 });
                }}
              >
                <option value="catalogo">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nombre">Nombre</option>
              </select>
            </label>
            <div role="group" aria-label="Vista de productos">
              <button type="button" aria-pressed={vista === 'grid'} onClick={() => setVista('grid')}>
                Cuadrícula
              </button>
              <button type="button" aria-pressed={vista === 'list'} onClick={() => setVista('list')}>
                Lista
              </button>
            </div>
          </div>
        </div>
        <div className="tienda-pagina__layout">
          <aside className="tienda-pagina__filtros">
            <details className="tienda-pagina__filtros-desplegable" open>
              <summary>Filtros</summary>
              <FiltroTienda
                selecciones={selecciones}
                onSelectionChange={actualizarSeleccion}
                onClear={limpiarFiltros}
              />
            </details>
          </aside>
          <section
            className="tienda-pagina__resultados"
            id="tienda-resultados"
            aria-label="Productos"
          >
            {cargando && <p role="status">Cargando productos...</p>}
            {errorCatalogo && <p role="alert">{errorCatalogo}</p>}
            <div className={`tienda-pagina__productos tienda-pagina__productos--${vista}`}>
              {productosMostrados.map((producto) => (
                <TarjetaProductoTienda
                  key={producto.id}
                  producto={producto}
                  vista={vista}
                />
              ))}
            </div>
            {!cargando && productosOrdenados.length === 0 && productos.length > 0 && (
              <div className="tienda-pagina__vacio">
                <p>No hay productos que coincidan con los criterios seleccionados.</p>
                {hayFiltrosActivos && (
                  <UIButton variant="tertiary" size="M" onClick={limpiarFiltros}>
                    Limpiar filtros
                  </UIButton>
                )}
              </div>
            )}
            {!cargando && productos.length === 0 && !errorCatalogo && (
              <p className="tienda-pagina__vacio">
                No hay productos disponibles en el catálogo.
              </p>
            )}
            {productosMostrados.length < productosOrdenados.length && (
              <UIButton
                className="tienda-pagina__ver-mas"
                variant="secondary"
                size="L"
                onClick={() => setPaginacion({
                  pathname,
                  limite: limiteProductos + 12,
                })}
              >
                Ver más
              </UIButton>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
