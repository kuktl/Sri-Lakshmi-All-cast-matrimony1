import { Router } from 'express';
import { requireStaff } from '../middleware/auth';
import { adminResourceRouter } from './adminResource';
import { randomUUID } from 'node:crypto';
import { ADMIN_RESOURCES, accountUpdateSchema, leadUpdateSchema, uploadRequestSchema } from '../resources';
import { supabaseAdmin } from '../supabase';
import { asyncHandler, fail, ok, zodMessage } from '../http';

/**
 * All admin endpoints. Every route requires a verified staff member.
 */
export const adminRouter = Router();

adminRouter.use(requireStaff);

// Identity of the currently signed-in staff member.
adminRouter.get('/me', (req, res) => ok(res, req.staff));

// The admin updates their own login email and/or password (service-role, no
// confirmation email needed). Keeps the staff table email in sync.
adminRouter.patch(
  '/account',
  asyncHandler(async (req, res) => {
    const parsed = accountUpdateSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));
    const staff = req.staff;
    if (!staff) return fail(res, 401, 'Not authenticated');

    const attrs: { email?: string; password?: string } = {};
    if (parsed.data.email) attrs.email = parsed.data.email;
    if (parsed.data.password) attrs.password = parsed.data.password;

    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(staff.id, {
      ...attrs,
      email_confirm: parsed.data.email ? true : undefined,
    });
    if (authError) return fail(res, 400, authError.message);

    if (parsed.data.email) {
      const { error: rowError } = await supabaseAdmin
        .from('staff')
        .update({ email: parsed.data.email })
        .eq('user_id', staff.id);
      if (rowError) return fail(res, 500, rowError.message);
    }

    return ok(res, { id: staff.id, email: parsed.data.email ?? staff.email });
  }),
);

// Leads: list, read, update status, delete (no public create here).
adminRouter.get(
  '/leads',
  asyncHandler(async (req, res) => {
    const status = req.query.status;
    let query = supabaseAdmin.from('leads').select('*').order('created_at', { ascending: false });
    if (typeof status === 'string' && status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) return fail(res, 500, error.message);
    return ok(res, data);
  }),
);

adminRouter.patch(
  '/leads/:id',
  asyncHandler(async (req, res) => {
    const parsed = leadUpdateSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));
    const { data, error } = await supabaseAdmin
      .from('leads')
      .update(parsed.data)
      .eq('id', req.params.id)
      .select()
      .maybeSingle();
    if (error) return fail(res, 500, error.message);
    if (!data) return fail(res, 404, 'Not found');
    return ok(res, data);
  }),
);

adminRouter.delete(
  '/leads/:id',
  asyncHandler(async (req, res) => {
    const { error } = await supabaseAdmin.from('leads').delete().eq('id', req.params.id);
    if (error) return fail(res, 500, error.message);
    return ok(res, { id: req.params.id });
  }),
);

// Issue a signed URL so the admin can upload a profile photo directly to
// Supabase Storage. Service-role authorizes; staff auth already enforced.
const PHOTO_BUCKET = 'profile-photos';
const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

adminRouter.post(
  '/uploads',
  asyncHandler(async (req, res) => {
    const parsed = uploadRequestSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));

    const ext = EXT_BY_TYPE[parsed.data.content_type] ?? 'jpg';
    const path = `profiles/${randomUUID()}.${ext}`;

    const { data, error } = await supabaseAdmin.storage.from(PHOTO_BUCKET).createSignedUploadUrl(path);
    if (error || !data) return fail(res, 500, error?.message ?? 'Failed to create upload URL');

    const publicUrl = supabaseAdmin.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
    return ok(res, { path: data.path, token: data.token, publicUrl });
  }),
);

// Mount full CRUD for each configured resource (profiles, communities, etc.).
for (const [path, config] of Object.entries(ADMIN_RESOURCES)) {
  adminRouter.use(`/${path}`, adminResourceRouter(config));
}
