import app from './app';
import { env } from './env';

// Local/long-running server entry. On Vercel the app is served as a serverless
// function (see api/index.ts) and this file is not used.
app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[api] listening on http://localhost:${env.port}`);
});
