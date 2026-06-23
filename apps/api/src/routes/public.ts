import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { supabaseAdmin } from '../supabase.js';
import { env } from '../env.js';
import { asyncHandler, fail, ok, zodMessage } from '../http.js';
import { leadCreateSchema, profileSubmitSchema, uploadRequestSchema } from '../resources.js';

const PHOTO_BUCKET = 'profile-photos';
const EXT_BY_TYPE: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/**
 * Public, unauthenticated endpoints consumed by the marketing site.
 * Only exposes approved profiles and active content; never private fields
 * beyond what the site already shows.
 */
export const publicRouter = Router();

// Approved profiles only, optional gender filter.
publicRouter.get(
  '/profiles',
  asyncHandler(async (req, res) => {
    const gender = req.query.gender;
    let query = supabaseAdmin
      .from('profiles')
      .select('id, gender, age, education, profession, location, community, height, gotram, native_place, star, image_url')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (gender === 'Bride' || gender === 'Groom') {
      query = query.eq('gender', gender);
    }

    const { data, error } = await query;
    if (error) return fail(res, 500, error.message);
    return ok(res, data);
  }),
);

// Public profile self-registration → creates a PENDING profile for approval.
publicRouter.post(
  '/profiles',
  asyncHandler(async (req, res) => {
    const parsed = profileSubmitSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert({ ...parsed.data, status: 'pending' })
      .select('id')
      .single();
    if (error) return fail(res, 500, error.message);
    return ok(res, data, 201);
  }),
);

// Public, unauthenticated signed upload URL for a registrant's photo.
// Returns an absolute upload URL the browser PUTs the file to, plus the
// eventual public URL to store on the pending profile. The bucket enforces
// image-only + 5 MB; paths are randomized under a `pending/` prefix.
publicRouter.post(
  '/uploads',
  asyncHandler(async (req, res) => {
    const parsed = uploadRequestSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));

    const ext = EXT_BY_TYPE[parsed.data.content_type] ?? 'jpg';
    const path = `pending/${randomUUID()}.${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from(PHOTO_BUCKET)
      .createSignedUploadUrl(path);
    if (error || !data) return fail(res, 500, error?.message ?? 'Failed to create upload URL');

    // supabase-js v2 returns an absolute signedUrl; fall back to building one.
    const uploadUrl = /^https?:\/\//.test(data.signedUrl)
      ? data.signedUrl
      : `${env.supabaseUrl}/storage/v1${data.signedUrl}`;
    const publicUrl = supabaseAdmin.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
    return ok(res, { uploadUrl, publicUrl });
  }),
);

// Public lead submission (registration form + expert-call modal).
publicRouter.post(
  '/leads',
  asyncHandler(async (req, res) => {
    const parsed = leadCreateSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));
    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert({ source: 'registration', ...parsed.data })
      .select('id')
      .single();
    if (error) return fail(res, 500, error.message);
    return ok(res, data, 201);
  }),
);
