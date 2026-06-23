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

/**
 * Resources exposed under /api/admin/:resource with full CRUD.
 * Content sections (communities, testimonials, FAQs, success stories,
 * membership plans) are hard-coded on the public site and no longer
 * managed here.
 */
export const ADMIN_RESOURCES: Record<string, ResourceConfig> = {
  profiles: {
    table: 'profiles',
    orderBy: { column: 'created_at', ascending: false },
    createSchema: z.object(profileBase),
    updateSchema: z.object(profileBase).partial(),
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
