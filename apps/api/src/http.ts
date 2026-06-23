import type { Response } from 'express';
import type { ZodError } from 'zod';

/** Flattens a ZodError into a single human-readable message. */
export function zodMessage(error: ZodError): string {
  return error.issues
    .map((i) => {
      const path = i.path.join('.');
      return path ? `${path}: ${i.message}` : i.message;
    })
    .join('; ');
}

/**
 * Consistent API response envelope used across all routes.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;
}

export function ok<T>(res: Response, data: T, status = 200): Response {
  const body: ApiResponse<T> = { success: true, data, error: null };
  return res.status(status).json(body);
}

export function fail(res: Response, status: number, error: string): Response {
  const body: ApiResponse<null> = { success: false, data: null, error };
  return res.status(status).json(body);
}

/**
 * Wraps an async route handler so rejected promises become a 500 instead of
 * crashing the process or hanging the request.
 */
export function asyncHandler<T>(
  handler: (...args: any[]) => Promise<T>,
): (...args: any[]) => void {
  return (req: any, res: any, next: any) => {
    handler(req, res, next).catch((err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unexpected server error';
      // eslint-disable-next-line no-console
      console.error('[api] unhandled route error:', message);
      fail(res, 500, message);
    });
  };
}
