import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  actualizarCantidadStoreInputSchema,
  agregarProductoStoreInputSchema,
  carritoPersistidoSchema,
  eliminarProductoDelCarritoInputSchema,
} from "../schemas/carrito";
import type {
  ActualizarCantidadStoreInput,
  AgregarProductoStoreInput,
  CarritoState,
  EliminarProductoDelCarritoInput,
} from "../schemas/carrito";
import {
  actualizarItemCarritoApi,
  agregarItemAlCarritoApi,
  aplicarCuponCarritoApi,
  crearCarritoInvitado,
  eliminarItemDelCarritoApi,
  obtenerCarritoPorId,
  quitarCuponCarritoApi,
} from "../services/carrito";
import { ApiError } from "../services/apiClient";

const VERSION_PERSISTENCIA_CARRITO = 2;
const NOMBRE_PERSISTENCIA_CARRITO = "petlove-carrito";

const estadoInicial: CarritoState = {
  carritoId: null,
  productos: [],
  cuponAplicado: null,
  descuentoCupon: 0,
  estado: "idle",
  error: null,
};

type AccionesCarrito = {
  inicializar: () => Promise<void>;
  agregarProducto: (entrada: AgregarProductoStoreInput) => Promise<void>;
  eliminarProducto: (entrada: EliminarProductoDelCarritoInput) => Promise<void>;
  cambiarCantidad: (entrada: ActualizarCantidadStoreInput) => Promise<void>;
  aplicarCupon: (codigoCupon: string) => Promise<void>;
  quitarCupon: () => Promise<void>;
  vaciarCarrito: () => Promise<void>;
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

function mensajeDeError(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "No se pudo sincronizar el carrito con el servidor.";
}

function esRespuestaValidacion<T>(
  resultado:
    | { success: true; data: T }
    | { success: false; error: { message: string } },
  mensaje: string,
): T {
  if (!resultado.success) {
    throw new ApiError(`${mensaje}: ${resultado.error.message}`);
  }
  return resultado.data;
}

let inicializacionEnCurso: Promise<void> | null = null;
let colaMutaciones: Promise<void> = Promise.resolve();

function encolarMutacion<T>(mutacion: () => Promise<T>): Promise<T> {
  const resultado = colaMutaciones.then(mutacion, mutacion);
  colaMutaciones = resultado.then(
    () => undefined,
    () => undefined,
  );
  return resultado;
}

export const useCarritoStore = create<CarritoStore>()(
  persist(
    (set, get) => {
      async function inicializar(): Promise<void> {
        if (get().estado === "ready") return;
        if (inicializacionEnCurso) return inicializacionEnCurso;

        inicializacionEnCurso = (async () => {
          set({ estado: "loading", error: null });
          try {
            const carritoId = get().carritoId;
            let carrito;
            let carritoRecreado = false;
            if (carritoId) {
              try {
                carrito = await obtenerCarritoPorId(carritoId);
              } catch (error) {
                if (!(error instanceof ApiError) || error.status !== 404) throw error;
                carrito = await crearCarritoInvitado();
                carritoRecreado = true;
              }
            } else {
              carrito = await crearCarritoInvitado();
            }
            set({
              ...carrito,
              estado: "ready",
              error: carritoRecreado
                ? "El carrito anterior ya no está disponible. Se creó uno nuevo y vacío."
                : null,
            });
          } catch (error) {
            const mensaje = mensajeDeError(error);
            set({ estado: "error", error: mensaje });
            throw error;
          } finally {
            inicializacionEnCurso = null;
          }
        })();

        return inicializacionEnCurso;
      }

      async function ejecutarMutacion(
        mutacion: (carritoId: string) => ReturnType<typeof agregarItemAlCarritoApi>,
      ): Promise<void> {
        await encolarMutacion(async () => {
          await inicializar();
          const carritoId = get().carritoId;
          if (!carritoId) {
            throw new ApiError("No se pudo obtener un identificador de carrito.");
          }

          set({ error: null });
          try {
            const carrito = await mutacion(carritoId);
            set({
              ...carrito,
              estado: "ready",
              error: null,
            });
          } catch (error) {
            const mensaje = mensajeDeError(error);
            set({ estado: "error", error: mensaje });
            throw error;
          }
        });
      }

      return {
        ...estadoInicial,
        inicializar,
        agregarProducto: async (entrada) => {
          const valores = esRespuestaValidacion(
            agregarProductoStoreInputSchema.safeParse(entrada),
            "No se pudo agregar el producto",
          );
          await ejecutarMutacion((carritoId) =>
            agregarItemAlCarritoApi({ carritoId, ...valores }),
          );
        },
        eliminarProducto: async (entrada) => {
          const valores = esRespuestaValidacion(
            eliminarProductoDelCarritoInputSchema.safeParse(entrada),
            "No se pudo eliminar el producto",
          );
          await ejecutarMutacion((carritoId) =>
            eliminarItemDelCarritoApi(carritoId, valores.productoId),
          );
        },
        cambiarCantidad: async (entrada) => {
          const valores = esRespuestaValidacion(
            actualizarCantidadStoreInputSchema.safeParse(entrada),
            "No se pudo cambiar la cantidad",
          );
          await ejecutarMutacion((carritoId) =>
            actualizarItemCarritoApi({ carritoId, ...valores }),
          );
        },
        aplicarCupon: async (codigoCupon) => {
          await ejecutarMutacion((carritoId) =>
            aplicarCuponCarritoApi({ carritoId, codigoCupon }),
          );
        },
        quitarCupon: async () => {
          await ejecutarMutacion((carritoId) => quitarCuponCarritoApi(carritoId));
        },
        vaciarCarrito: async () => {
          await encolarMutacion(async () => {
            await inicializar();
            const carritoId = get().carritoId;
            if (!carritoId) {
              throw new ApiError("No se pudo obtener un identificador de carrito.");
            }

            set({ error: null });
            try {
              for (const producto of get().productos) {
                const carrito = await eliminarItemDelCarritoApi(
                  carritoId,
                  producto.productoId,
                );
                set({ ...carrito, estado: "ready", error: null });
              }
              if (get().cuponAplicado) {
                const carrito = await quitarCuponCarritoApi(carritoId);
                set({ ...carrito, estado: "ready", error: null });
              }
              set({ estado: "ready", error: null });
            } catch (error) {
              const mensaje = mensajeDeError(error);
              set({ estado: "error", error: mensaje });
              throw error;
            }
          });
        },
      };
    },
    {
      name: NOMBRE_PERSISTENCIA_CARRITO,
      version: VERSION_PERSISTENCIA_CARRITO,
      storage: createJSONStorage(() => almacenamientoConJsonValido),
      partialize: (estado) => ({ carritoId: estado.carritoId }),
      migrate: (estadoPersistido, version) => {
        if (version !== VERSION_PERSISTENCIA_CARRITO) {
          informarErrorValidacion(
            `Se descartó el carrito persistido de la versión ${version}.`,
            new Error("La versión persistida no es compatible."),
          );
          return estadoInicial;
        }

        const resultado = carritoPersistidoSchema.safeParse(estadoPersistido);
        if (!resultado.success) {
          informarErrorValidacion("Se descartó el identificador de carrito inválido.", resultado.error);
          return estadoInicial;
        }
        return { ...estadoInicial, ...resultado.data };
      },
      merge: (estadoPersistido, estadoActual) => {
        if (estadoPersistido == null) return estadoActual;

        const resultado = carritoPersistidoSchema.safeParse(estadoPersistido);
        if (!resultado.success) {
          localStorage.removeItem(NOMBRE_PERSISTENCIA_CARRITO);
          informarErrorValidacion("Se descartó el identificador de carrito inválido.", resultado.error);
          return estadoActual;
        }
        return { ...estadoActual, ...resultado.data };
      },
      onRehydrateStorage: () => (_estado, error) => {
        if (error) {
          informarErrorValidacion("No se pudo rehidratar el identificador del carrito.", error);
        }
      },
    },
  ),
);

export const selectProductos = (estado: CarritoStore) => estado.productos;
export const selectCantidadArticulos = (estado: CarritoStore) =>
  estado.productos.reduce((total, producto) => total + producto.cantidad, 0);
export const selectSubtotalCarrito = (estado: CarritoStore) =>
  estado.productos.reduce((total, producto) => total + producto.subtotal, 0);
export const selectDescuentoCarrito = (estado: CarritoStore) =>
  Math.min(selectSubtotalCarrito(estado), estado.descuentoCupon);
export const selectTotalCarrito = (estado: CarritoStore) =>
  selectSubtotalCarrito(estado) - selectDescuentoCarrito(estado);
