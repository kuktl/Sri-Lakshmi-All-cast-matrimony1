<div align="center">

<img src="public/logo.png" alt="Sri Lakshmi All Caste Matrimony" width="420" />

### Community-first Telugu matrimony — verified brides & grooms across Telangana & Andhra Pradesh

A full-stack matrimonial platform: a public marketing site, a secure admin panel, and a Supabase-backed API — built for traditional families with privacy-first matchmaking.

<br/>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%7C%20Auth%20%7C%20Storage-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

<div align="center">
<table>
  <tr>
    <td><img src="public/Colourful-Telugu-wedding-in-Hyderabad-28-of-181.webp" width="260" height="170" /></td>
    <td><img src="public/RING%20CEREMONY.jpg" width="260" height="170" /></td>
    <td><img src="public/Ye-As-Wedding-11011.jpg" width="260" height="170" /></td>
  </tr>
  <tr>
    <td><img src="public/OHP-69-scaled.webp" width="260" height="170" /></td>
    <td><img src="public/Candid%20Wedding%20Photography%20Chennai.jpg" width="260" height="170" /></td>
    <td><img src="public/wedding-Haldi-Photoshoot-in-Hyderabad-234.jpg" width="260" height="170" /></td>
  </tr>
</table>
</div>

---

## ✨ Overview

**Sri Lakshmi All Caste Matrimony** helps Telugu families find suitable matches based on community, location, education, profession, and family values. The platform is a **monorepo with three apps** that share one Supabase backend:

| App | Path | What it is |
|-----|------|-----------|
| 🌸 **Public site** | `/` (repo root) | Marketing site — browse approved profiles, register, enquire |
| 🔐 **Admin panel** | `apps/admin` | Staff dashboard — approve profiles, manage leads |
| ⚙️ **API** | `apps/api` | Express + Supabase backend (serverless on Vercel) |

> **Privacy by design:** candidate names and phone numbers are never exposed publicly. The public API only returns approved, non-identifying fields; full details are shared by the team after a verified request.

---

## 🧩 Key Features

### 🌸 Public site
- 🔎 **Browse verified profiles** with live filters — **Gender · Designation · Caste**
- 📝 **Register a profile** → real **photo upload** (5 MB, image-only) → lands as *pending* for admin review
- 🎂 **Smart DOB → age** — age auto-fills from date of birth and enforces **18+**
- 🧮 **Real-time community counts** on the All Castes page (live from the database)
- 📨 **Every enquiry becomes a lead** — home registration, Talk to Expert, Contact, and Choose-Package forms
- ⏳ **Anti-spam cooldown** — one registration per 5 minutes (persists across refresh)
- 🌐 **Bilingual** — English & Telugu (తెలుగు)

### 🔐 Admin panel
- ✅ **One-click Approve / Reject** for pending profiles
- 🖼️ **Profile photo management** via secure signed uploads
- 📇 **Leads inbox** — grouped by **source page** (Home, Membership, Talk to Expert, Contact, Profile Request) with full enquiry details
- 🔑 **Supabase Auth** — staff sign-in; admin can change own email & password

### ⚙️ Backend / API
- 🛡️ Service-role access only — **RLS-locked tables**, no public DB access
- ✅ **Zod-validated** endpoints with a consistent `{ success, data, error }` envelope
- 🗂️ Signed Storage uploads to a size-capped, image-only bucket

---

## 🏗️ Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│   Public site    │     │   Admin panel    │     │       Supabase      │
│  React + Vite    │     │  React + Vite    │     │  Postgres · Auth ·  │
│   (repo root)    │     │  (apps/admin)    │     │       Storage       │
└────────┬─────────┘     └────────┬─────────┘     └──────────▲──────────┘
         │  fetch                 │  fetch + JWT             │ service role
         │                        │                          │ (server only)
         └───────────┬────────────┘                          │
                     ▼                                        │
            ┌────────────────────┐                           │
            │    Express API     │───────────────────────────┘
            │    (apps/api)      │   verify JWT · Zod · CRUD
            │  serverless/Vercel │
            └────────────────────┘
```

- **Public site** reads approved profiles and posts registrations/leads (no auth).
- **Admin** authenticates with Supabase, sends the JWT to the API, which verifies it before any privileged action.
- **API** is the only component holding the Supabase **service-role** key.

---

## 🛠️ Tech Stack

**Frontend** · React 19 · TypeScript 5.8 · Vite 6 · Tailwind CSS v4 · lucide-react · React Router (admin)
**Backend** · Node.js · Express 4 · Zod · `@supabase/supabase-js`
**Platform** · Supabase (Postgres, Auth, Storage, RLS) · Vercel (static sites + serverless functions)

---

## 📁 Project Structure

```
.
├── src/                      # Public marketing site (React)
│   ├── components/           # Header, Hero, ProfileCard, MatrimonialChannels, …
│   ├── pages/                # Profiles, Registration, About, Contact, All Caste
│   └── lib/                  # api client, options, formatting
├── public/                   # Static assets (logo, imagery)
├── apps/
│   ├── api/                  # Express + Supabase API
│   │   ├── src/routes/       # public + admin routers, generic CRUD
│   │   ├── src/middleware/   # JWT / staff auth
│   │   └── api/index.ts      # Vercel serverless entry
│   └── admin/                # Admin dashboard (React + React Router)
└── .github/workflows/        # CI/CD — deploy to Vercel on push
```

---

## 🚀 Local Development

**Prerequisites:** Node.js 20+

Each app is self-contained. Run all three in separate terminals:

```bash
# 1) API  →  http://localhost:4000
cd apps/api && npm install && npm run dev

# 2) Public site  →  http://localhost:3000
npm install && npm run dev

# 3) Admin panel  →  http://localhost:5173
cd apps/admin && npm install && npm run dev
```

### Environment variables

`apps/api/.env`
```env
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...        # server-only secret
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

`apps/admin/.env` and root `.env`
```env
VITE_API_URL=http://localhost:4000
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...           # browser-safe
```

> 🔒 Secrets live only in gitignored `.env` files (and the Vercel dashboard). Never commit them.

---

## ☁️ Deployment (Vercel via GitHub)

Three Vercel projects, one repo — each with its own **Root Directory**:

| Project | Root Directory | Framework |
|---------|----------------|-----------|
| Public site | `/` | Vite |
| API | `apps/api` | Other (serverless) |
| Admin | `apps/admin` | Vite |

A **GitHub Actions** workflow (`.github/workflows/deploy.yml`) deploys all three on every push to `main` — reliable, GitHub-driven CI/CD. Add these repo **Secrets** (Settings → Secrets and variables → Actions):

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID_PUBLIC
VERCEL_PROJECT_ID_API
VERCEL_PROJECT_ID_ADMIN
```

After deploy, set `CORS_ORIGINS` on the API to your public + admin domains.

---

## 🧭 Registration → Approval Flow

```
Visitor fills Register form  →  pending profile (+ photo) saved
        →  Admin reviews in dashboard  →  one-click Approve
        →  profile appears on the public Profiles page (filterable)
```

---

## 🔑 Admin Access

The admin panel lives at the admin project's URL (e.g. `admin.<your-domain>`). Sign in with the staff credentials configured in Supabase Auth. The signed-in admin can update their own email and password from the **Account** page.

---

<div align="center">

Made with ❤️ for Telugu families · **Sri Lakshmi All Caste Matrimony**

</div>
