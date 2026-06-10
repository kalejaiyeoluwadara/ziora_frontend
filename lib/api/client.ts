import type { ApiResponse } from "./types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://ziora-frontend-omega.vercel.app";

export class WaitlistApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.name = "WaitlistApiError";
    this.code = code;
    this.status = status;
  }
}

interface RequestOptions extends RequestInit {
  /** Throw a typed error on non-2xx / { success: false } instead of returning. */
  parse?: boolean;
}

/**
 * Thin fetch wrapper around the Ziora waitlist API.
 * Normalises the `{ success, data | message, code }` contract into
 * either resolved data or a thrown `WaitlistApiError`.
 */
export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { parse = true, headers, ...init } = options;

  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
  } catch {
    throw new WaitlistApiError(
      "We couldn't reach the server. Check your connection and try again.",
      "NETWORK_ERROR",
    );
  }

  let body: ApiResponse<T> | null = null;
  try {
    body = (await res.json()) as ApiResponse<T>;
  } catch {
    body = null;
  }

  if (!parse) {
    return body as unknown as T;
  }

  if (!res.ok || !body || body.success === false) {
    const message =
      body && body.success === false
        ? body.message
        : "Something went wrong. Please try again shortly.";
    const code = body && body.success === false ? body.code : undefined;
    throw new WaitlistApiError(message, code, res.status);
  }

  return body.data;
}
