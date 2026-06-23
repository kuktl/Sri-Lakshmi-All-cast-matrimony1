import { z } from 'zod';

/**
 * Declarative config for each database resource: the table name, the column
 * used to filter "public" rows, and the zod schemas for create/update.
 */
export interface ResourceConfig {
  table: string;
  /** Column + value that makes a row publicly visible (e.g. status='approved'). */
  publicFilter?: { column: string; value: string | boolean };
  /** Default ordering for list endpoints. */
  orderBy?: { column: string; ascending: boolean };
  createSchema: z.ZodTypeAny;
  updateSchema: z.ZodTypeAny;
}

const profileBase = {
  gender: z.enum(['Bride', 'Groom']),
  full_name: z.string().min(1).max(120),
  age: z.number().int().min(18).max(100).optional(),
  education: z.string().max(200).optional(),
  profession: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  community: z.string().max(120).optional(),
  height: z.string().max(40).optional(),
  gotram: z.string().max(120).optional(),
  native_place: z.string().max(200).optional(),
  star: z.string().max(80).optional(),
  image_url: z.string().url().max(2000).optional(),
  phone: z.string().max(40).optional(),
  whatsapp: z.string().max(40).optional(),
  dob: z.string().max(40).optional(),
  email: z.string().max(200).optional(),
  income: z.string().max(120).optional(),
  family_details: z.string().max(2000).optional(),
  match_details: z.string().max(2000).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
};

const communityBase = {
  name: z.string().min(1).max(120),
  description: z.string().max(1000).optional(),
  goud: z.boolean().optional(),
  sort_order: z.number().int().optional(),
  active: z.boolean().optional(),
};

const testimonialBase = {
  quote: z.string().min(1),
  name: z.string().max(120).optional(),
  location: z.string().max(120).optional(),
  match_year: z.string().max(10).optional(),
  sort_order: z.number().int().optional(),
  active: z.boolean().optional(),
};

const faqBase = {
  question: z.string().min(1),
  answer: z.string().min(1),
  telugu_question: z.string().optional(),
  telugu_answer: z.string().optional(),
  sort_order: z.number().int().optional(),
  active: z.boolean().optional(),
};

const successStoryBase = {
  title: z.string().max(200).optional(),
  couple_names: z.string().max(200).optional(),
  content: z.string().optional(),
  image_url: z.string().url().max(2000).optional(),
  story_year: z.string().max(10).optional(),
  sort_order: z.number().int().optional(),
  active: z.boolean().optional(),
};

const membershipPlanBase = {
  name: z.string().min(1).max(120),
  price: z.string().max(60).optional(),
  features: z.array(z.string()).optional(),
  highlighted: z.boolean().optional(),
  sort_order: z.number().int().optional(),
  active: z.boolean().optional(),
};

/** Resources exposed under /api/admin/:resource with full CRUD. */
export const ADMIN_RESOURCES: Record<string, ResourceConfig> = {
  profiles: {
    table: 'profiles',
    orderBy: { column: 'created_at', ascending: false },
    createSchema: z.object(profileBase),
    updateSchema: z.object(profileBase).partial(),
  },
  communities: {
    table: 'communities',
    orderBy: { column: 'sort_order', ascending: true },
    createSchema: z.object(communityBase),
    updateSchema: z.object(communityBase).partial(),
  },
  testimonials: {
    table: 'testimonials',
    orderBy: { column: 'sort_order', ascending: true },
    createSchema: z.object(testimonialBase),
    updateSchema: z.object(testimonialBase).partial(),
  },
  faqs: {
    table: 'faqs',
    orderBy: { column: 'sort_order', ascending: true },
    createSchema: z.object(faqBase),
    updateSchema: z.object(faqBase).partial(),
  },
  'success-stories': {
    table: 'success_stories',
    orderBy: { column: 'sort_order', ascending: true },
    createSchema: z.object(successStoryBase),
    updateSchema: z.object(successStoryBase).partial(),
  },
  'membership-plans': {
    table: 'membership_plans',
    orderBy: { column: 'sort_order', ascending: true },
    createSchema: z.object(membershipPlanBase),
    updateSchema: z.object(membershipPlanBase).partial(),
  },
};

/**
 * Public profile self-registration from the website. Creates a PENDING profile
 * for admin approval. `status` is never accepted from the client.
 */
export const profileSubmitSchema = z.object({
  full_name: z.string().min(1).max(120),
  gender: z.enum(['Bride', 'Groom']),
  age: z.number().int().min(18).max(100).optional(),
  community: z.string().max(120).optional(),
  location: z.string().max(200).optional(),
  education: z.string().max(200).optional(),
  profession: z.string().max(200).optional(),
  gotram: z.string().max(120).optional(),
  phone: z.string().min(5).max(40),
  whatsapp: z.string().max(40).optional(),
  dob: z.string().max(40).optional(),
  email: z.string().max(200).optional(),
  income: z.string().max(120).optional(),
  family_details: z.string().max(2000).optional(),
  match_details: z.string().max(2000).optional(),
  image_url: z.string().url().max(1000).optional(),
});

/** Lead creation is public; status updates are admin-only. */
export const leadCreateSchema = z.object({
  source: z
    .enum(['registration', 'expert_call', 'profile_request', 'contact', 'membership'])
    .optional(),
  full_name: z.string().min(1).max(120),
  role: z.enum(['Bride', 'Groom', '']).optional(),
  age: z.string().max(10).optional(),
  community: z.string().max(120).optional(),
  location: z.string().max(200).optional(),
  education: z.string().max(200).optional(),
  profession: z.string().max(200).optional(),
  phone: z.string().min(5).max(40),
  whatsapp: z.string().max(40).optional(),
  message: z.string().max(2000).optional(),
});

export const leadUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'converted', 'closed']),
});

/** Request a signed URL to upload a profile photo to Supabase Storage. */
export const uploadRequestSchema = z.object({
  filename: z.string().min(1).max(200),
  content_type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
});

/** The single admin updating their own login email and/or password. */
export const accountUpdateSchema = z
  .object({
    email: z.string().email().optional(),
    password: z.string().min(8).max(72).optional(),
  })
  .refine((v) => v.email !== undefined || v.password !== undefined, {
    message: 'Provide a new email and/or password',
  });
