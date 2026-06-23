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

app.use(
  cors({
    origin: env.corsOrigins,
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
