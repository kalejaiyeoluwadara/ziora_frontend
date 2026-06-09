# AGENT.md — Ziora Marketplace

> This file defines the project context, conventions, and working rules for any developer or AI agent working on the Ziora codebase. Read this before touching anything.

---

## Project Overview

**Ziora** is a multi-vendor e-commerce marketplace built for the Nigerian market — Lagos-first, mobile-first, trust-first. Think Temu's discovery experience + Amazon's credibility + Flutterwave's modern African tech aesthetic.

The MVP goal is a single, working end-to-end flow: a buyer discovers a product → pays securely → receives their order → vendor gets paid. Nothing else ships until that loop is airtight.

**Client:** Opeoluwa Lawson (Founder & Product Lead)
**Contact:** maplinknigeria@gmail.com | +2347047794556
**Dev contact:** kalejaiyeoluwadara1@gmail.com

---

## Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **State management:** Zustand (cart, auth state)
- **Data fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **UI components:** Radix UI primitives (unstyled, custom-themed)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (REST API)
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (access + refresh token pattern)
- **File/media storage:** Cloudinary
- **Email:** Resend (transactional) / Nodemailer fallback
- **SMS:** Termii or Twilio Nigeria

### Payments
- **Primary gateway:** Paystack
- **Wallet:** Platform-managed escrow per order, released post-delivery

### Logistics
- **Intra-Lagos (same-day):** Kwik Delivery API
- **Intercity / standard:** GIG Logistics API

### Infrastructure
- **Hosting:** Vercel (frontend) + Railway or Render (backend)
- **Media:** Cloudinary
- **DB:** MongoDB Atlas
- **Repo:** GitHub (monorepo — `/apps/web`, `/apps/api`, `/packages/shared`)

---

## Monorepo Structure

```
ziora/
├── apps/
│   ├── web/                  # Next.js frontend
│   └── api/                  # Express backend
├── packages/
│   └── shared/               # Shared types, validators, constants
├── .env.example
├── AGENT.md                  # ← you are here
└── README.md
```

---

## Brand & Design Tokens

Always derive UI decisions from these tokens. Do not hardcode arbitrary colours or use Tailwind defaults for brand elements.

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-blue` | `#1450E5` | Hero banners, primary brand |
| `brand-blue-light` | `#1E5BFF` | Buttons, CTAs, highlights |
| `brand-blue-dark` | `#0D3FC7` | Hover states, depth |
| `bg-white` | `#FFFFFF` | Main background |
| `bg-section` | `#F5F7FC` | Alternating section fills |
| `bg-card` | `#EEF3FF` | Product cards, light containers |
| `text-primary` | `#111827` | Body copy, headings |
| `text-secondary` | `#4B5563` | Supporting text, labels |
| `text-muted` | `#9CA3AF` | Placeholders, meta info |
| `accent-orange` | `#FF6B00` | Discount tags, promo labels |
| `accent-deal` | `#FF8A00` | Flash sale countdowns |
| `accent-success` | `#22C55E` | Verified badges, success states |

### Typography

- **Display / headings:** Inter or Plus Jakarta Sans (bold weights)
- **Body:** Inter (400/500)
- **Utility / labels:** Inter (12–13px, uppercase tracking for badges)

### Design Principles

- Mobile-first. All layouts designed for 375px viewport upward.
- Clean and uncluttered. Negative space is intentional.
- Trust signals are visible at all times (verified badges, secure payment icons, order tracking states).
- Friendly discovery tone in browse flows; neutral and precise during checkout and payment flows.

---

## Environment Variables

Never commit secrets. Use `.env.local` locally, set production values in Vercel/Railway dashboards.

```bash
# Backend
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
KWIK_API_KEY=
GIG_API_KEY=
RESEND_API_KEY=
TERMII_API_KEY=

# Frontend
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
```

---

## User Roles

| Role | Description |
|---|---|
| `buyer` | Registered consumer. Can browse, purchase, review, track orders. |
| `vendor` | Approved seller. Has storefront, product management, payout access. |
| `admin` | Platform operator. Approves vendors, manages disputes, oversees payouts. |
| `guest` | Unauthenticated. Can browse and add to cart; prompted to sign in at checkout. |

---

## Core Domain Models (Summary)

Full schemas live in `apps/api/src/models/`.

- **User** — shared base (buyer + vendor flag)
- **Vendor** — profile, verification status, bank details, store config
- **Product** — listing, images (Cloudinary), category, vendor ref, stock
- **Order** — line items, buyer, vendor(s), status FSM, logistics ref
- **Payment** — Paystack ref, amount, status, linked order
- **Payout** — vendor earnings, hold period, release status
- **Review** — product + vendor rating, moderated
- **Dispute** — linked to order, resolution status

---

## Order Status FSM

```
PENDING → PAID → PROCESSING → DISPATCHED → DELIVERED → COMPLETED
                                                      ↘ DISPUTED → RESOLVED
                          ↘ CANCELLED
```

- Vendor funds are held in escrow from `PAID` state.
- Funds release to vendor wallet 48–72h after `DELIVERED` is confirmed.
- 7-day dispute window from `DELIVERED` before auto-completing.
- Weekly batch payout every Monday; minimum threshold TBD.

---

## API Conventions

- **Base URL:** `/api/v1/`
- **Auth:** Bearer JWT in `Authorization` header
- **Errors:** Always return `{ success: false, message: string, code?: string }`
- **Success:** Always return `{ success: true, data: ... }`
- **Pagination:** `?page=1&limit=20` — returns `{ data, total, page, pages }`
- HTTP status codes must be semantically correct (200/201/400/401/403/404/409/500)

---

## What NOT to Build in MVP

Do not scope, stub, or reference these in v1 code. They come post-traction:

- Native iOS / Android apps
- Multilingual support (Yoruba, Igbo, Hausa)
- Dark mode
- Affiliate / referral programme
- CRM / ERP integrations
- Social media API integrations
- Multi-currency (USD, GBP) — NGN only at launch
- Advanced analytics beyond basic sales dashboard
- Vendor mobile app
- B2B-specific flows (bulk orders, invoicing)

---

## Testing

- Unit tests: Vitest
- API integration tests: Supertest
- E2E: Playwright (critical paths: signup, product listing, checkout, payout)
- Run `pnpm test` before every PR merge
- CI runs on all PRs via GitHub Actions

---

## Git Conventions

- Branch naming: `feat/`, `fix/`, `chore/`, `docs/`
- PR titles follow Conventional Commits: `feat(checkout): add Paystack inline popup`
- No direct pushes to `main`. All changes via PR.
- One approval required for merge.

---

## Key Decisions Log

| Decision | Rationale |
|---|---|
| Paystack over Flutterwave | Better Nigerian SME adoption, simpler onboarding docs |
| MongoDB over PostgreSQL | Flexible product schema (varying attributes per category) |
| Commission-only at launch | Reduces friction for vendor onboarding; subscription tiers later |
| Hybrid logistics (Kwik + GIG) | Kwik for Lagos same-day; GIG for nationwide reliability |
| Manual vendor approval | Marketplace quality and trust control during early growth |
| PWA over native apps | Speed to market; covers mobile-first audience without separate app stores |