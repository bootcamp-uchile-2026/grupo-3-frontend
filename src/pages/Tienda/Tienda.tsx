import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { CardProducto } from '../../components/CardProducto/CardProducto';
import { FiltroTienda, type FiltroClave, type SeleccionesFiltro } from '../../components/FiltroTienda/FiltroTienda';
import { subcategoriasMascota } from '../../components/FiltroTienda/subcategoriasMascota';
import { HeroTienda } from '../../components/HeroTienda/HeroTienda';
import { OrdenTienda, type OrdenTiendaValor, type VistaTienda } from '../../components/OrdenTienda/OrdenTienda';

type ProductoCatalogo = {
  id: string;
  nombre: string;
  precio: number;
  precioOriginal?: number;
  imagenes: string[];
  categoria: string;
  marca?: string;
  descuento?: number;
  especie?: string;
  subcategoria?: string;
  descripcion?: string;
  fichaTecnica?: string;
  modoDeUso?: string;
  fichaTecnicaDetalle?: Record<string, string>;
};

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

function esFichaTecnicaDetalle(value: unknown): value is Record<string, string> {
  return typeof value === 'object' && value !== null
    && Object.values(value).every((dato) => typeof dato === 'string');
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
    && (!('descuento' in value) || typeof value.descuento === 'number')
    && (!('especie' in value) || typeof value.especie === 'string')
    && (!('subcategoria' in value) || typeof value.subcategoria === 'string')
    && (!('descripcion' in value) || typeof value.descripcion === 'string')
    && (!('fichaTecnica' in value) || typeof value.fichaTecnica === 'string')
    && (!('modoDeUso' in value) || typeof value.modoDeUso === 'string')
    && (!('fichaTecnicaDetalle' in value) || esFichaTecnicaDetalle(value.fichaTecnicaDetalle));
}

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
    ...Object.entries(producto.fichaTecnicaDetalle ?? {}).flat(),
  ].filter((valor): valor is string => typeof valor === 'string');
}

function etiquetaCategoria(slug: string): string {
  const etiquetas: Record<string, string> = {
    farmacia: 'Farmacia',
    gatos: 'Gatos',
    perros: 'Perros',
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
        const productosValidos = data.filter(esProductoCatalogo);
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
    <main className="tienda-pagina">
      <HeroTienda titulo={tituloCategoria} />
      <div className="tienda-contenedor">
        <Breadcrumbs items={itemsBreadcrumb} />
        <OrdenTienda
          vista={vista}
          orden={orden}
          onCambiarVista={setVista}
          onCambiarOrden={(nuevoOrden) => {
            setOrden(nuevoOrden);
            setPaginacion({ pathname, limite: 12 });
          }}
        />
        <div className="tienda-layout">
          <aside className="tienda-filtros">
            <details className="tienda-filtros__desplegable" open>
              <summary>Filtros</summary>
              <FiltroTienda
                selecciones={selecciones}
                onSelectionChange={actualizarSeleccion}
                onClear={limpiarFiltros}
              />
            </details>
          </aside>
          <section className="tienda-resultados" aria-label="Productos">
            {cargando && <p role="status">Cargando productos...</p>}
            {errorCatalogo && <p role="alert">{errorCatalogo}</p>}
            {!cargando && productosOrdenados.length > 0 && (
              <p className="tienda-resultados__cantidad">
                {productosOrdenados.length} productos
              </p>
            )}
            <div className={`tienda-productos tienda-productos--${vista}`}>
              {productosMostrados.map((producto) => (
                <CardProducto
                  key={producto.id}
                  id={producto.id}
                  titulo={producto.nombre}
                  urlImagen={producto.imagenes[0]}
                  precio={producto.precio}
                  precioOriginal={producto.precioOriginal}
                  categoria={producto.categoria}
                  descuento={producto.descuento}
                  variant={vista === 'list' ? 'store-list' : 'standard'}
                />
              ))}
            </div>
            {!cargando && productosOrdenados.length === 0 && productos.length > 0 && (
              <div className="tienda-vacio">
                <p>No hay productos que coincidan con los criterios seleccionados.</p>
                {hayFiltrosActivos && (
                  <button type="button" onClick={limpiarFiltros}>Limpiar filtros</button>
                )}
              </div>
            )}
            {!cargando && productos.length === 0 && !errorCatalogo && (
              <p className="tienda-vacio">No hay productos disponibles en el catálogo.</p>
            )}
            {productosMostrados.length < productosOrdenados.length && (
              <button
                className="tienda-ver-mas"
                type="button"
                onClick={() => setPaginacion({
                  pathname,
                  limite: limiteProductos + 12,
                })}
              >
                Ver más
              </button>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
