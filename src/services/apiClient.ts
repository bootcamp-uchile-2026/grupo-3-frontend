import { z } from "zod";

export class ApiError extends Error {
  readonly status: number | null;

  constructor(
    message: string,
    status: number | null = null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function mensajeHttp(status: number): string {
  switch (status) {
    case 400:
      return "La solicitud enviada no es válida.";
    case 401:
      return "La sesión no está autenticada.";
    case 403:
      return "No tienes permiso para realizar esta acción.";
    case 404:
      return "No se encontró el recurso solicitado o el carrito ya no está disponible.";
    case 409:
      return "No hay stock suficiente para la cantidad solicitada.";
    default:
      return status >= 500
        ? "El servidor no está disponible. Inténtalo nuevamente."
        : "No se pudo completar la solicitud.";
  }
}

export function obtenerApiBaseUrl(): string {
  const apiBaseUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");
  if (!apiBaseUrl) {
    throw new ApiError("Falta configurar VITE_API_URL en el entorno.", null);
  }
  return apiBaseUrl;
}

export async function apiFetch<Schema extends z.ZodType>(
  path: string,
  schema: Schema,
  options: RequestInit = {},
): Promise<z.output<Schema>> {
  const headers = new Headers(options.headers);
  if (options.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(
      `${obtenerApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`,
      { ...options, headers },
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") throw error;
    throw new ApiError("No se pudo conectar con el servidor. Verifica tu conexión.", null);
  }

  if (!response.ok) {
    throw new ApiError(mensajeHttp(response.status), response.status);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new ApiError("El servidor devolvió una respuesta que no es JSON válido.", response.status);
  }

  const resultado = schema.safeParse(data);
  if (!resultado.success) {
    throw new ApiError(
      `La respuesta del servidor tiene un formato inválido: ${resultado.error.message}`,
      response.status,
    );
  }

  return resultado.data;
}
