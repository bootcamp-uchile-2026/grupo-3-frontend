import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { CarritoApiResponse, ItemCarritoApi } from "../services/carrito";

type ProductoCarrito = ItemCarritoApi;

type ResumenCarritoApi = Pick<
  CarritoApiResponse,
  "totalArticulos" | "subtotal" | "cuponAplicado" | "descuentoCupon" | "total"
>;

type CarritoState = {
  productos: ProductoCarrito[];
  resumenApi?: ResumenCarritoApi;
};

type CarritoAction =
  | { type: "AGREGAR"; producto: ProductoCarrito }
  | { type: "ELIMINAR"; id: string }
  | { type: "CAMBIAR_CANTIDAD"; id: string; delta: number }
  | { type: "SINCRONIZAR"; carrito: CarritoApiResponse }
  | { type: "LIMPIAR" };

const initialState: CarritoState = {
  productos: [],
};

function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case "AGREGAR": {
      const existe = state.productos.find((p) => p.productoId === action.producto.productoId);
      if (existe) {
        return {
          productos: state.productos.map((p) =>
            p.productoId === action.producto.productoId
              ? {
                  ...p,
                  cantidad: p.cantidad + action.producto.cantidad,
                  subtotal: p.precioUnitario * (p.cantidad + action.producto.cantidad),
                }
              : p
          ),
        };
      }
      return { productos: [...state.productos, action.producto] };
    }
    case "ELIMINAR":
      return {
        productos: state.productos.filter((p) => p.productoId !== action.id),
      };
    case "CAMBIAR_CANTIDAD":
      return {
        productos: state.productos.map((p) =>
          p.productoId === action.id
            ? {
                ...p,
                cantidad: Math.max(1, p.cantidad + action.delta),
                subtotal: p.precioUnitario * Math.max(1, p.cantidad + action.delta),
              }
            : p
        ),
      };
    case "SINCRONIZAR":
      // Mantener los identificadores y nombres del API evita perder productos al renderizar el carrito.
      return {
        productos: action.carrito.items,
        resumenApi: {
          totalArticulos: action.carrito.totalArticulos,
          subtotal: action.carrito.subtotal,
          cuponAplicado: action.carrito.cuponAplicado,
          descuentoCupon: action.carrito.descuentoCupon,
          total: action.carrito.total,
        },
      };
    case "LIMPIAR":
      return { productos: [] };
    default:
      return state;
  }
}

const CarritoContext = createContext<{
  state: CarritoState;
  dispatch: React.Dispatch<CarritoAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(carritoReducer, initialState);

  return (
    <CarritoContext.Provider value={{ state, dispatch }}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}