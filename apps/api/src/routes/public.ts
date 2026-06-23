import { Router } from 'express';
import { supabaseAdmin } from '../supabase';
import { asyncHandler, fail, ok, zodMessage } from '../http';
import { leadCreateSchema, profileSubmitSchema } from '../resources';

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

// Active content collections.
const activeCollections: Record<string, { table: string; order: string }> = {
  communities: { table: 'communities', order: 'sort_order' },
  testimonials: { table: 'testimonials', order: 'sort_order' },
  faqs: { table: 'faqs', order: 'sort_order' },
  'success-stories': { table: 'success_stories', order: 'sort_order' },
  'membership-plans': { table: 'membership_plans', order: 'sort_order' },
};

for (const [path, cfg] of Object.entries(activeCollections)) {
  publicRouter.get(
    `/${path}`,
    asyncHandler(async (_req, res) => {
      const { data, error } = await supabaseAdmin
        .from(cfg.table)
        .select('*')
        .eq('active', true)
        .order(cfg.order, { ascending: true });
      if (error) return fail(res, 500, error.message);
      return ok(res, data);
    }),
  );
}

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
