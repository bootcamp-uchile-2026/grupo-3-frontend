import { create } from "zustand";
import { ApiError } from "../services/apiClient";
import { crearPedido, DetallePedidoPendienteError } from "../services/pedidos";
import type { CreatePedidoDto, PedidoCreado } from "../schemas/pedidos";
import { useCarritoStore } from "./carritoStore";

const claveEnvioPendiente = "petlove-pedido-pendiente";
export const mensajePedidoPendiente = "No pudimos verificar si se creó el pedido. Revisa si recibiste una confirmación antes de volver a comprar.";

type PedidosStore = {
  estado: "idle" | "submitting" | "success" | "error";
  pedido: PedidoCreado | null;
  carritoPendiente: string | null;
  enviarPedido: (carritoId: string, datos: CreatePedidoDto) => Promise<PedidoCreado>;
};

function leerEnvioPendiente(): string | null {
  try {
    return sessionStorage.getItem(claveEnvioPendiente);
  } catch {
    return null;
  }
}

function guardarEnvioPendiente(carritoId: string | null) {
  try {
    if (carritoId) sessionStorage.setItem(claveEnvioPendiente, carritoId);
    else sessionStorage.removeItem(claveEnvioPendiente);
  } catch {
    // El estado de Zustand sigue bloqueando envíos en la pestaña actual.
    return;
  }
}

export const usePedidosStore = create<PedidosStore>((set, get) => ({
  estado: "idle",
  pedido: null,
  carritoPendiente: leerEnvioPendiente(),
  enviarPedido: async (carritoId, datos) => {
    if (get().estado === "submitting") {
      throw new ApiError("Ya se está enviando un pedido.");
    }
    if (get().carritoPendiente === carritoId) {
      throw new ApiError(mensajePedidoPendiente);
    }
    if (useCarritoStore.getState().carritoId !== carritoId) {
      throw new ApiError("El carrito cambió. Revisa tus productos antes de continuar.");
    }

    guardarEnvioPendiente(carritoId);
    set({ estado: "submitting", carritoPendiente: carritoId, pedido: null });

    let pedido: PedidoCreado;
    try {
      pedido = await crearPedido(carritoId, datos);
    } catch (error) {
      const status = error instanceof ApiError ? error.status : null;
      const rechazo = status === 400 || status === 401 || status === 403 || status === 409;
      if (rechazo) guardarEnvioPendiente(null);
      set({ estado: "error", carritoPendiente: rechazo ? null : carritoId });
      if (rechazo || status === 404 || error instanceof DetallePedidoPendienteError) throw error;

      const detalle = status === null
        ? "No llegó una respuesta del servidor."
        : status >= 500
          ? `El servidor devolvió un error (HTTP ${status}).`
          : `La respuesta del servidor no pudo validarse (HTTP ${status}).`;
      throw new ApiError(`${detalle} ${mensajePedidoPendiente}`, status);
    }

    // La API ya cerró este carrito. El siguiente uso creará uno nuevo.
    if (useCarritoStore.getState().carritoId === carritoId) {
      useCarritoStore.setState({
        carritoId: null,
        productos: [],
        cuponAplicado: null,
        descuentoCupon: 0,
        estado: "idle",
        error: null,
      });
    }
    guardarEnvioPendiente(null);
    set({ estado: "success", carritoPendiente: null, pedido });
    return pedido;
  },
}));
