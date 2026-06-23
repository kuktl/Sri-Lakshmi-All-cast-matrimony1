// Vercel serverless entry. Express apps are valid (req, res) handlers, so we
// export the configured app directly. All routes are rewritten here via
// vercel.json. Locally, use `npm start` (src/index.ts) instead.
import app from '../src/app.js';

export default app;
