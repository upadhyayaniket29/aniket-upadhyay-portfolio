# Synk IN free MVP setup

## What already works without any account or paid service

- The landing and Resources pages.
- `/dashboard`: free GitHub public-profile analysis through GitHub's public API.
- Free, transparent rule-based resume review and Synk Score starter calculation.
- Browser-local persistence for dashboard inputs; data remains on that device.

## Free Supabase setup: required for real user accounts and cloud data

1. Create a free project at [Supabase](https://supabase.com/).
2. In **SQL Editor**, run `supabase/schema.sql` from this repository.
3. Copy `.env.example` to `.env.local`.
4. Fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from **Project Settings → API**.
5. In **Authentication → Providers**, enable Email. GitHub sign-in is optional and requires a free GitHub OAuth App.
6. Restart `npm.cmd run dev` after changing `.env.local`.

The Supabase free tier is suitable for development and early testing. Do not commit `.env.local`.

## GitHub API

The dashboard currently uses GitHub's public, unauthenticated API. It is free, but has a 60-request/hour/IP limit. For production, create a GitHub OAuth App and store its secret in server-side environment variables; never expose it in frontend code.

## What is intentionally not implemented as paid AI

No OpenAI or other paid model is called. The score is deterministic and inspectable in `lib/score.ts`; it is a coaching signal, not an automated hiring decision. For PDFs, video interviews, semantic portfolio analysis and advanced personalised recommendations, you will need either a paid AI model or a self-hosted/open-source model plus infrastructure.

## Start the app

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:3000/dashboard` to test the functional student flow.
