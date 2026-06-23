import express from 'express';
import cors from 'cors';
import { env } from './env.js';
import { ok, fail } from './http.js';
import { publicRouter } from './routes/public.js';
import { adminRouter } from './routes/admin.js';

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

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${env.port}`);
});
