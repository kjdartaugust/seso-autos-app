# SESO Autos — *Driving More Than Cars*

A complete, production-ready automotive web application for **SESO Autos**, covering
car sales & importation, rentals, insurance, licensing & registration, and GPS fleet
tracking — built with Next.js 14 (App Router), Prisma + PlanetScale (MySQL),
NextAuth.js, Tailwind CSS and Framer Motion.

## Features

- **Homepage** — cinematic hero, five service quick-access cards, animated stats strip,
  featured vehicles, testimonials carousel and contact CTA.
- **Car Sales & Importation** — filterable listings (make, model, year, price, import
  source), full vehicle detail page with image gallery, specs, import badge and enquiry form.
- **Car Rentals** — fleet browser by category (Economy, Sedan, SUV, Luxury, Vans & Buses)
  with a booking form (date pickers, daily/weekly/monthly/long-term plans, delivery toggle).
- **Insurance** — coverage options, why-choose-us section and a quick quote request form.
- **Licensing & Registration** — service cards, step-by-step process timeline and request form.
- **GPS Tracking & Fleet Security** — feature showcase, ideal-for grid, subscription plan
  cards and a contact form.
- **Admin dashboard** — NextAuth-protected; manage vehicle listings, rental bookings and
  all service inquiries.
- **Demo mode** — runs fully without a database (sample data + non-persisting forms), so it
  deploys to Vercel out of the box.

## Brand

Deep navy `#0A1F5C` · Electric blue `#1565C0` · White · Lime accent `#7CB518` ·
Typeface: Plus Jakarta Sans.

## Getting started

```bash
npm install
cp .env.example .env        # fill in your values (optional for demo mode)
npm run dev
```

Visit `http://localhost:3000`. Admin: `http://localhost:3000/admin/login`
(demo credentials: `admin@sesoautos.com` / `seso-admin-2026`).

## Database (PlanetScale)

1. Create a PlanetScale database and copy its connection string into `DATABASE_URL`.
2. Push the schema and seed sample data:

```bash
npm run db:push
npm run db:seed
```

Without `DATABASE_URL`, the app automatically runs in **demo mode**.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PlanetScale MySQL connection string |
| `NEXTAUTH_SECRET` | NextAuth JWT secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL (e.g. `https://your-app.vercel.app`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded / demo admin credentials |

## Deploy to Vercel

Push to GitHub, import into Vercel, add the environment variables above, and deploy.
The build runs `prisma generate` automatically.

## Tech stack

Next.js 14 · React 18 · TypeScript · Prisma · PlanetScale (MySQL) · NextAuth.js ·
Tailwind CSS · Framer Motion.
