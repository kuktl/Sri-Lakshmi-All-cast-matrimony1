import { Router } from 'express';
import { supabaseAdmin } from '../supabase.js';
import { asyncHandler, fail, ok, zodMessage } from '../http.js';
import type { ResourceConfig } from '../resources.js';

/**
 * Builds a full CRUD router for one admin resource. All routes assume staff
 * auth has already been enforced by the parent router.
 */
export function adminResourceRouter(config: ResourceConfig): Router {
  const router = Router();
  const { table, orderBy, createSchema, updateSchema } = config;

  // List
  router.get(
    '/',
    asyncHandler(async (_req, res) => {
      let query = supabaseAdmin.from(table).select('*');
      if (orderBy) query = query.order(orderBy.column, { ascending: orderBy.ascending });
      const { data, error } = await query;
      if (error) return fail(res, 500, error.message);
      return ok(res, data);
    }),
  );

  // Read one
  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const { data, error } = await supabaseAdmin.from(table).select('*').eq('id', req.params.id).maybeSingle();
      if (error) return fail(res, 500, error.message);
      if (!data) return fail(res, 404, 'Not found');
      return ok(res, data);
    }),
  );

  // Create
  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const parsed = createSchema.safeParse(req.body);
      if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));
      const { data, error } = await supabaseAdmin.from(table).insert(parsed.data).select().single();
      if (error) return fail(res, 500, error.message);
      return ok(res, data, 201);
    }),
  );

  // Update
  router.patch(
    '/:id',
    asyncHandler(async (req, res) => {
      const parsed = updateSchema.safeParse(req.body);
      if (!parsed.success) return fail(res, 400, zodMessage(parsed.error));
      const { data, error } = await supabaseAdmin
        .from(table)
        .update(parsed.data)
        .eq('id', req.params.id)
        .select()
        .maybeSingle();
      if (error) return fail(res, 500, error.message);
      if (!data) return fail(res, 404, 'Not found');
      return ok(res, data);
    }),
  );

  // Delete
  router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const { error } = await supabaseAdmin.from(table).delete().eq('id', req.params.id);
      if (error) return fail(res, 500, error.message);
      return ok(res, { id: req.params.id });
    }),
  );

  return router;
}
