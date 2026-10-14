
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

export type ProductoCarritoItem = {
  id: number
  nombre: string
  precio: number
  cantidad: number
}

type ProductoCarritoDevelop = {
  idProducto: number
  titulo: string
  precio: number
  cantidad: number
}

type CarritoAction =
  | { type: 'AGREGAR'; producto: ProductoCarritoDevelop }
  | { type: 'ELIMINAR'; id: number }
  | { type: 'CAMBIAR_CANTIDAD'; id: number; delta: number }
  | { type: 'LIMPIAR' }

type CarritoContextType = {
  productos: ProductoCarritoItem[]
  agregarProducto: (producto: ProductoCarritoItem) => void
  eliminarProducto: (id: number) => void
  aumentarCantidad: (id: number) => void
  disminuirCantidad: (id: number) => void
  vaciarCarrito: () => void
  state: {
    productos: ProductoCarritoDevelop[]
  }
  dispatch: (action: CarritoAction) => void
}

const CarritoContext = createContext<CarritoContextType | undefined>(
  undefined
)

const CLAVE_CARRITO = 'petlove-carrito'

function obtenerProductosGuardados(): ProductoCarritoItem[] {
  try {
    const datosGuardados = localStorage.getItem(CLAVE_CARRITO)

    if (!datosGuardados) {
      return []
    }

    const productos = JSON.parse(datosGuardados)

    return Array.isArray(productos) ? productos : []
  } catch {
    return []
  }
}

export function CarritoProvider({
  children,
}: {
  children: ReactNode
}) {
  const [productos, setProductos] = useState<ProductoCarritoItem[]>(
    obtenerProductosGuardados
  )

  useEffect(() => {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(productos)
    )
  }, [productos])

  function agregarProducto(producto: ProductoCarritoItem) {
    setProductos((anteriores) => {
      const existente = anteriores.find(
        (item) => item.id === producto.id
      )

      if (existente) {
        return anteriores.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + producto.cantidad,
              }
            : item
        )
      }

      return [...anteriores, producto]
    })
  }

  function eliminarProducto(id: number) {
    setProductos((anteriores) =>
      anteriores.filter((producto) => producto.id !== id)
    )
  }

  function aumentarCantidad(id: number) {
    setProductos((anteriores) =>
      anteriores.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: producto.cantidad + 1 }
          : producto
      )
    )
  }

  function disminuirCantidad(id: number) {
    setProductos((anteriores) =>
      anteriores.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              cantidad: Math.max(1, producto.cantidad - 1),
            }
          : producto
      )
    )
  }

  function vaciarCarrito() {
    setProductos([])
  }

  function dispatch(action: CarritoAction) {
    switch (action.type) {
      case 'AGREGAR':
        agregarProducto({
          id: action.producto.idProducto,
          nombre: action.producto.titulo,
          precio: action.producto.precio,
          cantidad: action.producto.cantidad,
        })
        break

      case 'ELIMINAR':
        eliminarProducto(action.id)
        break

      case 'CAMBIAR_CANTIDAD':
        setProductos((anteriores) =>
          anteriores.map((producto) =>
            producto.id === action.id
              ? {
                  ...producto,
                  cantidad: Math.max(
                    1,
                    producto.cantidad + action.delta
                  ),
                }
              : producto
          )
        )
        break

      case 'LIMPIAR':
        vaciarCarrito()
        break
    }
  }

  const state = {
    productos: productos.map((producto) => ({
      idProducto: producto.id,
      titulo: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
    })),
  }

  return (
    <CarritoContext.Provider
      value={{
        productos,
        agregarProducto,
        eliminarProducto,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        state,
        dispatch,
      }}
    >
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  const contexto = useContext(CarritoContext)

  if (!contexto) {
    throw new Error(
      'useCarrito debe utilizarse dentro de CarritoProvider'
    )
  }

  return contexto
}
