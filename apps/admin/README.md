# Sri Lakshmi Matrimony — Admin Panel

Separate React + Vite app for staff to manage the entire system. Deploys
independently (e.g. to `admin.srilakshmimatrimony.com`). Talks only to the API;
uses Supabase Auth for login.

## Run

```bash
cd apps/admin
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
```

Requires the API running (`apps/api`, default `http://localhost:4000`).

## Config (`apps/admin/.env`, gitignored)

| Var | Purpose |
|-----|---------|
| `VITE_API_URL` | Base URL of the API (prod: the deployed API URL) |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Browser-safe anon key (login only) |

## Default login

`demo@demo.com` / `demo12345678` — change both under **Account** after first sign-in.

## Features

- **Login** (Supabase Auth) with a route guard; non-staff are rejected by the API.
- **Dashboard** — counts for leads + every content type.
- **Leads** — view website enquiries, change status (new → contacted → converted → closed), delete.
- **Profiles** — full CRUD; set status to `approved` to publish to the public site.
- **Content CRUD** — communities, testimonials, FAQs (bilingual), success stories, membership plans.
- **Account** — change login email and/or password.

## Structure

- `src/lib/api.ts` — fetch wrapper that attaches the Supabase JWT to every request.
- `src/resources.ts` — declarative field config; drives the generic CRUD pages.
- `src/components/ResourceCrud.tsx` — one component powers list/create/edit/delete for all content types.
- `src/auth/` — session context + guard.

## Deploy (later)

Build is a static SPA — host on Vercel/Netlify/Cloudflare Pages at the admin
subdomain. Set `VITE_API_URL` to the deployed API and add that admin origin to
the API's `CORS_ORIGINS`. SPA routing needs a catch-all rewrite to `index.html`.
