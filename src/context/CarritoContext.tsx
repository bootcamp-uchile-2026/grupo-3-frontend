
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

type CarritoContextType = {
  productos: ProductoCarritoItem[]
  agregarProducto: (producto: ProductoCarritoItem) => void
  eliminarProducto: (id: number) => void
  aumentarCantidad: (id: number) => void
  disminuirCantidad: (id: number) => void
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
        producto.id === id && producto.cantidad > 1
          ? { ...producto, cantidad: producto.cantidad - 1 }
          : producto
      )
    )
  }

  return (
    <CarritoContext.Provider
      value={{
        productos,
        agregarProducto,
        eliminarProducto,
        aumentarCantidad,
        disminuirCantidad,
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
