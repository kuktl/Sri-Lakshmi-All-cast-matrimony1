import express from 'express';
import cors from 'cors';
import { env } from './env.js';
import { ok, fail } from './http.js';
import { publicRouter } from './routes/public.js';
import { adminRouter } from './routes/admin.js';

/**
 * The configured Express app, without starting a server. Imported by the local
 * dev entry (index.ts) and by the Vercel serverless function (api/index.ts).
 */
const app = express();

// Origins from CORS_ORIGINS env (exact matches), plus built-in production
// defaults so deploys work without re-editing env vars on every domain change.
const staticOrigins = new Set(env.corsOrigins);
const allowedRootDomains = ['srilakshmiallcastmatrimony.com'];
const allowedHostSuffixes = ['.vercel.app'];

function isAllowedOrigin(origin: string): boolean {
  if (staticOrigins.has(origin)) return true;
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  // Apex domain or any of its subdomains (admin., www., api., ...)
  if (allowedRootDomains.some((d) => host === d || host.endsWith(`.${d}`))) {
    return true;
  }
  // Any Vercel deployment URL for this project (preview + production aliases)
  return allowedHostSuffixes.some((s) => host.endsWith(s));
}

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser clients (curl, health checks) send no Origin header.
      if (!origin) return callback(null, true);
      return callback(null, isAllowedOrigin(origin));
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (_req, res) => ok(res, { status: 'ok' }));

// Public site API and admin API
app.use('/api', publicRouter);
app.use('/api/admin', adminRouter);

// 404 fallback
app.use((_req, res) => fail(res, 404, 'Route not found'));

export default app;
