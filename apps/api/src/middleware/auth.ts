import type { NextFunction, Request, Response } from 'express';
import { supabaseAdmin, supabaseAnon } from '../supabase.js';
import { fail } from '../http.js';

export interface StaffUser {
  id: string;
  email: string | null;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      staff?: StaffUser;
    }
  }
}

/**
 * Requires a valid Supabase JWT (Bearer token) belonging to a user that exists
 * in the `staff` table. Attaches the staff user to req.staff.
 */
export async function requireStaff(req: Request, res: Response, next: NextFunction): Promise<void> {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';

  if (!token) {
    fail(res, 401, 'Missing authentication token');
    return;
  }

  const { data, error } = await supabaseAnon.auth.getUser(token);
  if (error || !data.user) {
    fail(res, 401, 'Invalid or expired session');
    return;
  }

  // Confirm the authenticated user is an authorized staff member.
  const { data: staffRow, error: staffError } = await supabaseAdmin
    .from('staff')
    .select('user_id, email, role')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (staffError) {
    fail(res, 500, 'Failed to verify staff access');
    return;
  }
  if (!staffRow) {
    fail(res, 403, 'Account is not authorized for admin access');
    return;
  }

  req.staff = {
    id: data.user.id,
    email: staffRow.email ?? data.user.email ?? null,
    role: staffRow.role,
  };
  next();
}
