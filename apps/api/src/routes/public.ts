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

// Public lead submission (every website enquiry form).
publicRouter.post(
  '/leads',
  asyncHandler(async (req, res) => {
    const parsed = leadCreateSchema.safeParse(req.body);
    if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));

    // profile_id is not a leads column — pull it out and use it to enrich the
    // message for detail requests so the admin sees which candidate (name +
    // ref) was requested instead of a bare UUID.
    const { profile_id, ...leadData } = parsed.data;
    if (profile_id) {
      const { data: prof } = await supabaseAdmin
        .from('profiles')
        .select('full_name, gender, community, profession')
        .eq('id', profile_id)
        .maybeSingle();
      if (prof) {
        const ref = `TRG-${profile_id.replace(/-/g, '').slice(0, 6).toUpperCase()}`;
        const summary = [prof.community, prof.gender, prof.profession].filter(Boolean).join(' · ');
        const who = `Requested profile: ${prof.full_name ?? 'Unknown'} (${ref}${summary ? ` — ${summary}` : ''}).`;
        leadData.message = leadData.message ? `${who} ${leadData.message}` : who;
      }
    }

    const payload = { source: 'registration', ...leadData };
    let { data, error } = await supabaseAdmin.from('leads').insert(payload).select('id').single();

    // Resilience: if the DB still has the older source CHECK constraint (e.g.
    // the 'membership' value was added in code but the migration wasn't run),
    // retry with a known-allowed source so the lead is never silently lost.
    if (error && error.message.includes('leads_source_check') && payload.source !== 'contact') {
      ({ data, error } = await supabaseAdmin
        .from('leads')
        .insert({ ...payload, source: 'contact' })
        .select('id')
        .single());
    }

    if (error) return fail(res, 500, error.message);
    return ok(res, data, 201);
  }),
);
