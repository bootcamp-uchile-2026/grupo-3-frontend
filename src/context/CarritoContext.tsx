import { createContext, useContext, useReducer, type ReactNode } from "react";

type ProductoCarrito = {
  idProducto: number;
  titulo: string;
  precio: number;
  cantidad: number;
};

type CarritoState = {
  productos: ProductoCarrito[];
};

type CarritoAction =
  | { type: "AGREGAR"; producto: ProductoCarrito }
  | { type: "ELIMINAR"; id: number }
  | { type: "CAMBIAR_CANTIDAD"; id: number; delta: number }
  | { type: "LIMPIAR" };

const initialState: CarritoState = {
  productos: [],
};

function carritoReducer(state: CarritoState, action: CarritoAction): CarritoState {
  switch (action.type) {
    case "AGREGAR": {
      const existe = state.productos.find((p) => p.idProducto === action.producto.idProducto);
      if (existe) {
        return {
          productos: state.productos.map((p) =>
            p.idProducto === action.producto.idProducto
              ? { ...p, cantidad: p.cantidad + action.producto.cantidad }
              : p
          ),
        };
      }
      return { productos: [...state.productos, action.producto] };
    }
    case "ELIMINAR":
      return { productos: state.productos.filter((p) => p.idProducto !== action.id) };
    case "CAMBIAR_CANTIDAD":
      return {
        productos: state.productos.map((p) =>
          p.idProducto === action.id
            ? { ...p, cantidad: Math.max(1, p.cantidad + action.delta) }
            : p
        ),
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