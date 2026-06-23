# Sri Lakshmi Matrimony — API

Express + TypeScript backend. The **only** component that holds Supabase
credentials; both frontends (public site + admin) are dumb clients that call
this API. Uses the Supabase service-role key server-side and enforces auth in
Express, so no privileged key ever reaches a browser.

## Run

```bash
cd apps/api
npm install
npm run dev      # tsx watch on http://localhost:4000
# or: npm start  # run once
npm run lint     # tsc --noEmit
```

Configuration lives in `apps/api/.env` (gitignored). Required vars:
`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
optional `PORT` (default 4000) and `CORS_ORIGINS`.

## Response envelope

Every response is `{ success, data, error }`.

## Public endpoints (no auth)

| Method | Path | Notes |
|--------|------|-------|
| GET | `/health` | liveness |
| GET | `/api/profiles?gender=Bride\|Groom` | approved profiles only |
| GET | `/api/communities` | active rows |
| GET | `/api/testimonials` | active rows |
| GET | `/api/faqs` | active rows |
| GET | `/api/success-stories` | active rows |
| GET | `/api/membership-plans` | active rows |
| POST | `/api/leads` | submit registration / expert-call lead |

## Admin endpoints (require staff JWT)

Send `Authorization: Bearer <supabase-access-token>`. The user must exist in the
`staff` table.

| Method | Path | Notes |
|--------|------|-------|
| GET | `/api/admin/me` | current staff identity |
| GET/PATCH/DELETE | `/api/admin/leads[/:id]` | manage leads (status updates) |
| CRUD | `/api/admin/profiles[/:id]` | full management (all statuses) |
| CRUD | `/api/admin/communities[/:id]` | |
| CRUD | `/api/admin/testimonials[/:id]` | |
| CRUD | `/api/admin/faqs[/:id]` | |
| CRUD | `/api/admin/success-stories[/:id]` | |
| CRUD | `/api/admin/membership-plans[/:id]` | |

CRUD = `GET /` (list), `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`.

## Architecture notes

- `src/supabase.ts` — service-role + anon clients (anon used only to verify staff JWTs). Provides a `ws` transport because Node < 22 lacks native WebSocket.
- `src/middleware/auth.ts` — `requireStaff`: validates the Supabase JWT, then checks the `staff` table.
- `src/resources.ts` — declarative table config + zod schemas.
- `src/routes/adminResource.ts` — generic CRUD router reused per resource.
- All inputs validated with zod; all DB tables have RLS enabled with no policies (service-role only).
