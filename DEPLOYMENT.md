# Deployment (Vercel)

This repo is a small monorepo deployed as **three Vercel projects**, all from
this one GitHub repo, each with a different **Root Directory**:

| Project | Root Directory | What it is | Domain |
|---------|----------------|-----------|--------|
| Public site | `.` (repo root) | Marketing site (existing project) | `srilakshmi…` / current Vercel URL |
| API | `apps/api` | Express backend (serverless functions) | e.g. `api.srilakshmi…` |
| Admin | `apps/admin` | Admin panel (Vite SPA) | e.g. `admin.srilakshmi…` |

> The API holds the Supabase **service-role** key. Both frontends are clients
> that call the API. Never put the service-role key in a frontend project.

## Deploy order

Deploy the **API first** (the frontends need its URL).

### 1. API project (`apps/api`)
1. Vercel → **Add New → Project** → import this repo.
2. Set **Root Directory = `apps/api`**.
3. Framework preset: **Other** (it's serverless functions via `vercel.json`).
4. **Environment Variables** (values are in `apps/api/.env`, or from the
   Supabase dashboard → Project Settings → API):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`  ← secret
   - `CORS_ORIGINS` = the public site URL + admin URL, comma-separated
     (e.g. `https://srilakshmi….vercel.app,https://admin.srilakshmi….vercel.app`)
5. Deploy → note the resulting URL (e.g. `https://sri-lakshmi-api.vercel.app`).
6. Sanity check: open `<api-url>/health` → `{"success":true,...}`.

### 2. Public site project (existing, root `.`)
1. Project → Settings → **Environment Variables**:
   - `VITE_API_URL` = the API URL from step 1.
2. Redeploy. Profiles and forms will now talk to the live API.

### 3. Admin project (`apps/admin`)
1. Add New → Project → same repo → **Root Directory = `apps/admin`**.
2. Framework preset: **Vite** (auto-detected). `vercel.json` adds SPA fallback.
3. **Environment Variables**:
   - `VITE_API_URL` = the API URL from step 1.
   - `VITE_SUPABASE_URL` = same as `SUPABASE_URL`.
   - `VITE_SUPABASE_ANON_KEY` = the anon key (browser-safe).
4. Deploy. Add the custom domain `admin.<your-domain>` under Settings → Domains.
5. Make sure the admin's final URL is included in the API's `CORS_ORIGINS`
   (re-deploy the API if you change it).

## First-time data setup

Run the bootstrap once (locally, against the prod Supabase) to create the admin
login and seed content:

```bash
cd apps/api
npm install
npm run bootstrap   # creates demo@demo.com / demo12345678 + seeds communities/testimonials/faqs
```

Then log into the admin and change the email/password under **Account**.

## Local development

```bash
# API        → http://localhost:4000
cd apps/api && npm install && npm run dev
# Admin      → http://localhost:5173
cd apps/admin && npm install && npm run dev
# Public site→ http://localhost:3000
npm install && npm run dev
```

Each app reads its own `.env` (see the `.env.example` in each).
