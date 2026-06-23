import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import { env } from './env';

// Node < 22 has no native WebSocket. We don't use Supabase realtime, but the
// client initializes it, so provide the `ws` transport to satisfy it.
const realtime = { transport: ws as unknown as typeof WebSocket };

/**
 * Service-role client — bypasses RLS. This is the ONLY thing in the system
 * that holds privileged Supabase access. Never expose this client or its key
 * to any browser; it lives only inside the API process.
 */
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime,
});

/**
 * Anon client used only to validate a staff member's JWT (auth.getUser).
 */
export const supabaseAnon = createClient(env.supabaseUrl, env.supabaseAnonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime,
});
