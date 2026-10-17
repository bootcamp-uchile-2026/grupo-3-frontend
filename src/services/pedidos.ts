const PEDIDOS_API_URL = "http://18.226.214.170:3000/api/v1/catalogo/pedidos";

export type CreatePedidoDto = {
  nombre: string;
  apellidos: string;
  correoElectronico: string;
  telefono: string;
  tipoComprobante: "Boleta" | "Factura";
  rutDocumento: string;
  tipoEntrega: "EnvioNormal" | "RetiroEnTienda";
  metodoPago: "MercadoPago" | "Tarjeta" | "WebpayPlus";
  aceptaTerminos: boolean;
  usuarioId: string;
  direccionId?: string;
  region?: string;
  comuna?: string;
  direccion?: string;
  departamentoOficina?: string;
  referencia?: string;
  sucursalRetiro?: string;
};

type ItemPedidoCreado = {
  productoId: string;
  nombre: string;
  imagen: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
};

export type PedidoCreado = {
  id: string;
  nombreCliente: string;
  correoElectronico?: string;
  telefono?: string;
  modoEntrega?: string;
  tiempoEstimadoEntrega?: string;
  direccionEntrega?: string;
  sucursalRetiro?: string;
  items: ItemPedidoCreado[];
  subtotal: number;
  costoEnvio: number;
  descuento: number;
  total: number;
  estadoPedido: string;
  fechaCreacion: string;
};

function esItemPedido(value: unknown): value is ItemPedidoCreado {
  return typeof value === "object" && value !== null
    && "productoId" in value && typeof value.productoId === "string"
    && "nombre" in value && typeof value.nombre === "string"
    && "imagen" in value && typeof value.imagen === "string"
    && "cantidad" in value && typeof value.cantidad === "number"
    && "precioUnitario" in value && typeof value.precioUnitario === "number"
    && "subtotal" in value && typeof value.subtotal === "number";
}

function esPedidoCreado(value: unknown): value is PedidoCreado {
  return typeof value === "object" && value !== null
    && "id" in value && typeof value.id === "string"
    && "nombreCliente" in value && typeof value.nombreCliente === "string"
    && "items" in value && Array.isArray(value.items) && value.items.every(esItemPedido)
    && "subtotal" in value && typeof value.subtotal === "number"
    && "costoEnvio" in value && typeof value.costoEnvio === "number"
    && "descuento" in value && typeof value.descuento === "number"
    && "total" in value && typeof value.total === "number"
    && "estadoPedido" in value && typeof value.estadoPedido === "string"
    && "fechaCreacion" in value && typeof value.fechaCreacion === "string";
}

export async function crearPedido(datos: CreatePedidoDto): Promise<PedidoCreado> {
  const response = await fetch(PEDIDOS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(
      `No se pudo crear el pedido (${response.status})${detalle ? `: ${detalle}` : "."}`,
    );
  }

  const data: unknown = await response.json();
  if (!esPedidoCreado(data)) {
    throw new Error("La respuesta de creación del pedido tiene un formato inválido.");
  }
  return data;
}

export async function obtenerPedido(id: string, signal?: AbortSignal): Promise<PedidoCreado> {
  const response = await fetch(`${PEDIDOS_API_URL}/${encodeURIComponent(id)}`, { signal });
  if (!response.ok) {
    const detalle = await response.text();
    throw new Error(
      `No se pudo consultar el pedido (${response.status})${detalle ? `: ${detalle}` : "."}`,
    );
  }

  const data: unknown = await response.json();
  if (!esPedidoCreado(data)) {
    throw new Error("La respuesta del pedido tiene un formato inválido.");
  }
  return data;
}
