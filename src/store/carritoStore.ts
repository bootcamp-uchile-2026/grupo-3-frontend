import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  agregarProductoAlCarritoInputSchema,
  carritoStateSchema,
  cambiarCantidadProductoInputSchema,
  eliminarProductoDelCarritoInputSchema,
  itemCarritoSchema,
  sincronizarCarritoInputSchema,
} from "../schemas/carrito";
import type {
  AgregarProductoAlCarritoInput,
  CarritoState,
  CambiarCantidadProductoInput,
  EliminarProductoDelCarritoInput,
  SincronizarCarritoInput,
} from "../schemas/carrito";

const VERSION_PERSISTENCIA_CARRITO = 1;
const NOMBRE_PERSISTENCIA_CARRITO = "petlove-carrito";

const estadoInicial: CarritoState = {
  productos: [],
  cuponAplicado: null,
  descuentoCupon: 0,
};

type AccionesCarrito = {
  agregarProducto: (entrada: AgregarProductoAlCarritoInput) => void;
  eliminarProducto: (entrada: EliminarProductoDelCarritoInput) => void;
  cambiarCantidad: (entrada: CambiarCantidadProductoInput) => void;
  sincronizarCarrito: (entrada: SincronizarCarritoInput) => void;
  limpiarCarrito: () => void;
};

export type CarritoStore = CarritoState & AccionesCarrito;

function informarErrorValidacion(mensaje: string, error: unknown) {
  console.error(mensaje, error);
}

const almacenamientoConJsonValido = {
  getItem(nombre: string) {
    const valor = localStorage.getItem(nombre);
    if (valor === null) return null;

    try {
      JSON.parse(valor);
      return valor;
    } catch (error) {
      localStorage.removeItem(nombre);
      informarErrorValidacion("Se descartó el carrito persistido porque no es JSON válido.", error);
      return null;
    }
  },
  setItem(nombre: string, valor: string) {
    localStorage.setItem(nombre, valor);
  },
  removeItem(nombre: string) {
    localStorage.removeItem(nombre);
  },
};

export const useCarritoStore = create<CarritoStore>()(
  persist(
    (set) => ({
      ...estadoInicial,
      agregarProducto: (entrada) => {
        const resultado = agregarProductoAlCarritoInputSchema.safeParse(entrada);
        if (!resultado.success) {
          informarErrorValidacion("No se agregó el producto: los datos son inválidos.", resultado.error);
          return;
        }

        const producto = resultado.data.producto;
        set((estado) => {
          const existente = estado.productos.find(
            (item) => item.productoId === producto.productoId,
          );
          if (!existente) {
            return { productos: [...estado.productos, producto] };
          }

          const cantidad = existente.cantidad + producto.cantidad;
          const itemActualizado = itemCarritoSchema.safeParse({
            ...existente,
            cantidad,
            subtotal: existente.precioUnitario * cantidad,
          });
          if (!itemActualizado.success) {
            informarErrorValidacion(
              "No se actualizó la cantidad: el resultado excede los valores permitidos.",
              itemActualizado.error,
            );
            return estado;
          }

          return {
            productos: estado.productos.map((item) =>
              item.productoId === producto.productoId ? itemActualizado.data : item,
            ),
          };
        });
      },
      eliminarProducto: (entrada) => {
        const resultado = eliminarProductoDelCarritoInputSchema.safeParse(entrada);
        if (!resultado.success) {
          informarErrorValidacion("No se eliminó el producto: el identificador es inválido.", resultado.error);
          return;
        }
        set((estado) => ({
          productos: estado.productos.filter(
            (item) => item.productoId !== resultado.data.productoId,
          ),
        }));
      },
      cambiarCantidad: (entrada) => {
        const resultado = cambiarCantidadProductoInputSchema.safeParse(entrada);
        if (!resultado.success) {
          informarErrorValidacion("No se cambió la cantidad: los datos son inválidos.", resultado.error);
          return;
        }

        set((estado) => {
          const producto = estado.productos.find(
            (item) => item.productoId === resultado.data.productoId,
          );
          if (!producto) return estado;

          const cantidad = Math.max(1, producto.cantidad + resultado.data.delta);
          if (cantidad === producto.cantidad) return estado;

          const itemActualizado = itemCarritoSchema.safeParse({
            ...producto,
            cantidad,
            subtotal: producto.precioUnitario * cantidad,
          });
          if (!itemActualizado.success) {
            informarErrorValidacion(
              "No se actualizó la cantidad: el resultado excede los valores permitidos.",
              itemActualizado.error,
            );
            return estado;
          }

          return {
            productos: estado.productos.map((item) =>
              item.productoId === resultado.data.productoId ? itemActualizado.data : item,
            ),
          };
        });
      },
      sincronizarCarrito: (entrada) => {
        const resultado = sincronizarCarritoInputSchema.safeParse(entrada);
        if (!resultado.success) {
          informarErrorValidacion("No se sincronizó el carrito: la respuesta es inválida.", resultado.error);
          return;
        }

        const carrito = resultado.data.carrito;
        set({
          productos: carrito.items,
          cuponAplicado: carrito.cuponAplicado ?? null,
          descuentoCupon: carrito.descuentoCupon,
        });
      },
      limpiarCarrito: () => set(estadoInicial),
    }),
    {
      name: NOMBRE_PERSISTENCIA_CARRITO,
      version: VERSION_PERSISTENCIA_CARRITO,
      storage: createJSONStorage(() => almacenamientoConJsonValido),
      partialize: (estado) => ({
        productos: estado.productos,
        cuponAplicado: estado.cuponAplicado,
        descuentoCupon: estado.descuentoCupon,
      }),
      migrate: (estadoPersistido, version) => {
        if (version !== VERSION_PERSISTENCIA_CARRITO) {
          informarErrorValidacion(
            `Se descartó el carrito persistido de la versión ${version}.`,
            new Error("La versión persistida no es compatible."),
          );
          return estadoInicial;
        }

        const resultado = carritoStateSchema.safeParse(estadoPersistido);
        if (!resultado.success) {
          informarErrorValidacion("Se descartó el carrito persistido inválido.", resultado.error);
          return estadoInicial;
        }
        return resultado.data;
      },
      merge: (estadoPersistido, estadoActual) => {
        if (estadoPersistido == null) return estadoActual;

        const resultado = carritoStateSchema.safeParse(estadoPersistido);
        if (!resultado.success) {
          localStorage.removeItem(NOMBRE_PERSISTENCIA_CARRITO);
          informarErrorValidacion("Se descartó el carrito persistido inválido.", resultado.error);
          return estadoActual;
        }
        return { ...estadoActual, ...resultado.data };
      },
      onRehydrateStorage: () => (_estado, error) => {
        if (error) {
          informarErrorValidacion("No se pudo rehidratar el carrito persistido.", error);
        }
      },
    },
  ),
);

export const selectProductos = (estado: CarritoStore) => estado.productos;
export const selectCuponAplicado = (estado: CarritoStore) => estado.cuponAplicado;
export const selectCantidadArticulos = (estado: CarritoStore) =>
  estado.productos.reduce((total, producto) => total + producto.cantidad, 0);
export const selectSubtotalCarrito = (estado: CarritoStore) =>
  estado.productos.reduce((total, producto) => total + producto.subtotal, 0);
export const selectDescuentoCarrito = (estado: CarritoStore) =>
  Math.min(selectSubtotalCarrito(estado), estado.descuentoCupon);
export const selectTotalCarrito = (estado: CarritoStore) =>
  selectSubtotalCarrito(estado) - selectDescuentoCarrito(estado);
