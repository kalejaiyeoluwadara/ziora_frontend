# Ziora Waitlist — Project Scope
**Pre-Launch Marketing | Standard & Premium Tiers**
Prepared for: Opeoluwa Lawson (Ziora) | Repos: `ziora_frontend` + `ziora_backend`

---

## Purpose

The Ziora waitlist is a pre-marketplace launch surface. It captures early interest, builds an owned audience before the MVP goes live, and (Premium tier) turns signups into organic growth through referrals.

This scope is **independent of the marketplace MVP** in `SCOPE.md`. The waitlist ships first; captured subscribers are later invited into the full platform based on rank (Premium) or signup order (Standard).

---

## Tier Overview

| | **Standard** | **Premium** |
|---|---|---|
| Custom landing page | ✓ | ✓ |
| Custom backend + API | ✓ | ✓ |
| Admin dashboard (view signups) | ✓ | ✓ |
| Unique referral link per subscriber | — | ✓ |
| Public waitlist leaderboard | — | ✓ |
| Rank-based early access at launch | — | ✓ |
| Referral confirmation emails | — | ✓ |

**Recommendation:** Ship Standard first to validate conversion and ops; layer Premium referral mechanics in a fast follow once baseline signup flow is stable.

---

## Scope Philosophy

- **Mobile-first.** Primary traffic is Instagram, WhatsApp, and mobile browsers — design for 375px first.
- **Trust-first.** Ziora brand tokens, clear privacy copy, no dark patterns.
- **Minimal friction.** Email + optional name at signup; phone optional until launch invite.
- **Admin-owned.** No third-party waitlist SaaS — full control over data, exports, and launch cohorts.
- **Launch-ready data.** Every signup record must be exportable and mappable to a future Ziora `User` account.

---

## 1. Frontend Scope (`ziora_frontend`)

### 1.1 Public Pages — Standard (required)

| Page / Route | Description |
|---|---|
| **`/` — Waitlist landing** | Hero, value proposition, social proof strip, email signup form, FAQ, footer. Branded with Ziora design tokens (`brand-blue`, `accent-orange`, etc.). |
| **`/joined` — Confirmation** | Post-signup success state. Shows position in queue (Standard: chronological `#`). CTA to follow Ziora on social. |
| **`/privacy`** | Waitlist-specific privacy policy snippet (data use, no spam, unsubscribe). |
| **`/terms`** | Lightweight terms for waitlist participation. |

#### Landing page sections

1. **Hero** — Headline, subcopy, primary email capture form (inline, above fold).
2. **Value props** — 3 cards: trusted vendors, secure payments (Paystack), Lagos-first delivery.
3. **How it works** — 3-step visual: join → get early access → shop verified sellers.
4. **Social proof** — Subscriber count (live from API), optional founder quote.
5. **FAQ** — Accordion: when does Ziora launch, is it free, how do I get access, data privacy.
6. **Footer** — Logo, social links, privacy/terms, contact email.

#### Signup form fields (Standard)

| Field | Required | Validation |
|---|---|---|
| Email | Yes | Valid email, unique per waitlist |
| First name | No | 1–50 chars |
| Role interest | No | `buyer` \| `vendor` \| `both` (radio or select) |

#### UX requirements

- Inline validation with Zod + React Hook Form.
- Loading, success, and error states on submit — no blank screens.
- Duplicate email: friendly message (“You’re already on the list”) with link to resend confirmation.
- Honeypot field for basic bot protection (hidden input).
- `?ref=` query param captured on landing (Premium — stored silently even if UI not built yet).

---

### 1.2 Public Pages — Premium (add-on)

| Page / Route | Description |
|---|---|
| **`/joined` (enhanced)** | Shows referral link, copy button, share to WhatsApp/Twitter/X, current rank, referrals count, “X more referrals to climb Y spots” hint. |
| **`/leaderboard`** | Public paginated leaderboard: rank, display name (or anonymised), referral count. Top 100 visible; user’s own rank pinned if logged in via magic link token. |
| **`/r/[code]`** | Referral redirect: validates code → sets cookie/session `ref` → redirects to `/`. |

#### Referral UX

- Each subscriber gets a short, human-readable code (e.g. `ziora.app/r/ope-7k2m`).
- Share sheet: Copy link, WhatsApp (`wa.me` with prefilled message), X/Twitter intent URL.
- Leaderboard updates on a sensible cache (ISR 60s or client refetch) — rank does not need to be real-time to the second.
- Display name on leaderboard: first name + last initial by default; option to opt into full name later via email link.

---

### 1.3 Admin Dashboard — Standard (required)

Protected route group: `/admin/*` (or separate subdomain `admin.ziora.app` in production).

| Page | Description |
|---|---|
| **`/admin/login`** | Email + password for admin users (not the same as future marketplace admin — separate credential set for waitlist phase). |
| **`/admin`** | Overview: total signups, signups today/7d/30d, buyer vs vendor interest breakdown, simple growth chart. |
| **`/admin/subscribers`** | Searchable, sortable, paginated table of all signups. Columns: email, name, role interest, source, referred by, referral count, rank, signed up at, status. |
| **`/admin/subscribers/[id]`** | Single subscriber detail + activity (referrals made, referred by). |
| **`/admin/export`** | CSV export of full subscriber list (filtered or all). One-click download. |

#### Admin table filters

- Date range (signed up between)
- Role interest
- Referral count (min/max) — Premium
- Status: `active` \| `unsubscribed` \| `invited` \| `converted`
- Search by email or name

---

### 1.4 Frontend Technical Requirements

| Requirement | Detail |
|---|---|
| **Framework** | Next.js 14+ App Router (`ziora_frontend`) |
| **Styling** | Tailwind CSS + Ziora design tokens from `AGENTS.md` |
| **Forms** | React Hook Form + Zod |
| **Data fetching** | TanStack Query for admin; server actions or `fetch` for public signup |
| **Fonts** | Inter or Plus Jakarta Sans (per brand guide) |
| **SEO** | `<title>`, `<meta description>`, Open Graph image for waitlist |
| **Analytics** | Plausible or PostHog event: `waitlist_signup`, `referral_share`, `referral_signup` (Premium) |
| **Performance** | Lighthouse mobile ≥ 90 on landing page |
| **Env** | `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL` |

---

## 2. Backend Scope (`ziora_backend`)

### 2.1 Core Service — Standard (required)

#### Subscriber model (`WaitlistSubscriber`)

| Field | Type | Notes |
|---|---|---|
| `_id` | ObjectId | |
| `email` | string | Unique, indexed, lowercase normalised |
| `firstName` | string? | |
| `roleInterest` | enum | `buyer` \| `vendor` \| `both` |
| `status` | enum | `active` \| `unsubscribed` \| `invited` \| `converted` |
| `source` | string? | UTM or `organic` |
| `signupIp` | string? | Rate-limit / fraud signal |
| `position` | number | Chronological position at signup (Standard display) |
| `referralCode` | string | Unique, indexed — generated at signup (used in Premium) |
| `referredBy` | ObjectId? | Ref to another `WaitlistSubscriber` |
| `referralCount` | number | Default 0 — incremented on valid referred signups (Premium) |
| `rank` | number? | Computed/stored leaderboard rank (Premium) |
| `unsubscribeToken` | string | UUID for one-click unsubscribe link |
| `invitedAt` | Date? | When launch invite email sent |
| `convertedAt` | Date? | When they completed marketplace registration |
| `createdAt` / `updatedAt` | Date | Mongoose timestamps |

#### Admin user model (`WaitlistAdmin`)

Separate from future marketplace `User`. Fields: `email`, `passwordHash`, `name`, `lastLoginAt`.

---

### 2.2 API Endpoints — Standard

Base path: `/api/v1/waitlist/`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/subscribe` | Public | Create subscriber. Body: `{ email, firstName?, roleInterest?, source?, ref? }`. Returns `{ position, referralCode }`. |
| `GET` | `/stats` | Public | `{ totalSubscribers, signupsToday }` for landing social proof. |
| `GET` | `/verify` | Public | Query `?email=` — check if already subscribed (for friendly duplicate UX). |
| `POST` | `/unsubscribe` | Public | Body `{ token }` — marks `unsubscribed`. |
| `POST` | `/admin/login` | Public | Returns JWT for admin session. |
| `GET` | `/admin/subscribers` | Admin JWT | Paginated list with filters. |
| `GET` | `/admin/subscribers/:id` | Admin JWT | Single subscriber + referral tree (Premium). |
| `GET` | `/admin/overview` | Admin JWT | Dashboard metrics. |
| `GET` | `/admin/export` | Admin JWT | CSV stream of subscribers. |
| `PATCH` | `/admin/subscribers/:id` | Admin JWT | Update status (e.g. mark `invited`). |

#### Response conventions (match marketplace)

```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Email already registered", "code": "DUPLICATE_EMAIL" }
```

#### Validation & security

- Rate limit: 5 signups per IP per hour; 20 admin login attempts per IP per hour.
- Email normalisation (trim, lowercase).
- Honeypot field rejected server-side if filled.
- Input sanitisation on all string fields.
- CORS: allow `NEXT_PUBLIC_SITE_URL` only.
- Admin routes: Bearer JWT middleware.

---

### 2.3 Referral Service — Premium (add-on)

#### Referral rules

1. On signup, generate unique `referralCode` (8-char alphanumeric, collision-checked).
2. If `ref` query param or cookie present and valid, set `referredBy` on new subscriber.
3. Increment `referralCount` on referrer when referred signup is **confirmed** (email verified if verification enabled, else immediate).
4. **Self-referral blocked** — same email, same IP within 24h, or circular referral chain.
5. **Rank formula** (recommended):

   ```
   score = referralCount × 10 + (1 / signupTimestamp)
   rank = position in descending score, tie-break by earlier signup
   ```

   Recompute rank via background job every 5 minutes (or on each new referral for MVP if volume is low).

#### Additional endpoints — Premium

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/leaderboard` | Public | `{ entries: [{ rank, displayName, referralCount }], total }` paginated. |
| `GET` | `/subscriber/me` | Token | Magic link token from confirmation email — returns rank, referral link, stats. |
| `GET` | `/ref/:code` | Public | Validates code; returns `{ valid, referrerDisplayName? }` for redirect page. |

#### Rank → early access mapping (at launch)

| Rank | Access wave |
|---|---|
| 1 – 50 | Wave 1 — day 0 |
| 51 – 200 | Wave 2 — day 3 |
| 201 – 500 | Wave 3 — day 7 |
| 501+ | Wave 4 — day 14 |

Admin can override waves per subscriber in dashboard. Document in admin UI as configurable launch cohorts.

---

### 2.4 Notifications — Standard + Premium

| Trigger | Channel | Template |
|---|---|---|
| New signup | Email (Resend) | Welcome + position (Standard) or welcome + referral link + rank (Premium) |
| Referral success | Email (Premium) | “Someone joined using your link — you’re now #X” |
| Unsubscribe confirm | Email | Confirmation of removal |
| Launch invite | Email | Wave-based invite with registration link |

SMS (Termii) is **out of scope** for waitlist v1 unless explicitly added later.

---

### 2.5 Backend Technical Requirements

| Requirement | Detail |
|---|---|
| **Runtime** | Node.js + Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT for admin only (no subscriber accounts in Standard) |
| **Email** | Resend with HTML templates |
| **Jobs** | `node-cron` for rank recalculation (Premium) and daily metrics rollup |
| **Deploy** | Railway or Render; env via dashboard |
| **Health** | `GET /health` for uptime checks |

#### Environment variables

```bash
# Backend
MONGODB_URI=
JWT_SECRET=
RESEND_API_KEY=
WAITLIST_FROM_EMAIL=hello@ziora.app
ADMIN_SEED_EMAIL=           # Initial admin (seed script)
ADMIN_SEED_PASSWORD=
FRONTEND_URL=https://ziora.app
```

---

## 3. Admin Dashboard — Shared Requirements

### Metrics (overview page)

- Total subscribers (active)
- New signups: today / 7 days / 30 days
- Growth chart (daily signups, last 30 days)
- Role breakdown pie: buyer / vendor / both
- Top referral sources (UTM) — if UTM captured
- Premium: average referrals per subscriber, top 10 referrers widget

### Subscriber management actions

- View / search / filter / export
- Mark as `invited` (bulk select for launch waves)
- Mark as `converted` when they register on marketplace
- Premium: manually adjust referral count (fraud correction) — audit log entry required

### Export format (CSV)

```
email,first_name,role_interest,position,rank,referral_count,referred_by_email,source,status,signed_up_at
```

---

## 4. User Flows

### Standard flow

```mermaid
flowchart LR
    A[Visitor lands on /] --> B[Enters email + submits]
    B --> C[POST /subscribe]
    C --> D{Duplicate?}
    D -->|Yes| E[Friendly already-joined message]
    D -->|No| F[Create subscriber + send welcome email]
    F --> G[/joined — show position #]
```

### Premium flow (extends Standard)

```mermaid
flowchart LR
    A[Visitor opens /r/CODE] --> B[Set ref cookie → redirect /]
    B --> C[Signs up]
    C --> D[Link referredBy + increment referrer count]
    D --> E[Recompute ranks]
    E --> F[/joined — show rank + referral link]
    F --> G[User shares link]
    G --> A
    F --> H[/leaderboard — public rankings]
```

---

## 5. Integrations

| Integration | Purpose | Tier |
|---|---|---|
| **Resend** | Transactional email | Standard |
| **MongoDB Atlas** | Subscriber + admin data | Standard |
| **Vercel** | Frontend hosting | Standard |
| **Railway / Render** | Backend hosting | Standard |
| **PostHog / Plausible** | Conversion analytics | Standard (recommended) |

---

## 6. Out of Scope (Waitlist v1)

Do not build these in the first waitlist release:

- Phone / OTP verification at signup
- Paid “skip the line” tiers
- Native mobile apps
- Marketplace product browsing on waitlist site
- Full marketplace admin panel (vendor approvals, orders, etc.)
- Subscriber login/password accounts (magic link token only in Premium for `/subscriber/me`)
- Social login (Google) on waitlist
- Multi-language support
- SMS notifications
- Integration with Paystack or logistics APIs

---

## 7. Acceptance Criteria

### Standard — complete when:

1. Visitor can sign up with email on mobile in under 30 seconds.
2. Duplicate emails are handled gracefully without duplicate records.
3. Confirmation page shows accurate chronological position.
4. Welcome email delivers within 60 seconds of signup.
5. Admin can log in, view paginated subscriber list, and search by email.
6. Admin can export full subscriber CSV.
7. Public stats endpoint powers live subscriber count on landing page.
8. Unsubscribe link works and sets status to `unsubscribed`.
9. Landing page scores ≥ 90 Lighthouse mobile.
10. All subscriber data is stored in MongoDB with no third-party waitlist dependency.

### Premium — additionally complete when:

1. Each subscriber receives a unique, working referral link on confirmation.
2. Visiting `/r/[code]` attributes the next signup to the correct referrer.
3. Self-referral and same-IP abuse rules block invalid credit.
4. Public leaderboard displays top referrers with correct ranks.
5. Referrer receives email when a referral completes signup.
6. Subscriber can see updated rank and referral count via confirmation email magic link.
7. Admin dashboard shows referral count and rank columns with working filters.
8. Rank recalculation job runs on schedule and matches documented formula.
9. Admin can assign launch waves by rank range for invite campaigns.

---

## 8. Phased Delivery Plan

### Phase A — Standard (Week 1)

| Day | Frontend | Backend |
|---|---|---|
| 1–2 | Landing page UI + form + brand tokens | Express scaffold, MongoDB, `WaitlistSubscriber` model |
| 3 | Confirmation page, error states | `POST /subscribe`, `GET /stats`, rate limiting |
| 4 | Admin login + subscribers table | Admin auth, list + overview endpoints |
| 5 | Export UI, privacy/terms pages | CSV export, Resend welcome email, seed admin script |

### Phase B — Premium (Week 2)

| Day | Frontend | Backend |
|---|---|---|
| 1 | Referral redirect `/r/[code]`, cookie handling | Referral attribution on subscribe, self-referral guards |
| 2 | Enhanced `/joined` with share buttons | Rank job + `GET /leaderboard` |
| 3 | `/leaderboard` page | Referral notification email |
| 4 | Magic link subscriber stats view | `GET /subscriber/me`, admin referral columns |
| 5 | QA, analytics events, launch wave admin UI | Bulk invite status, end-to-end referral tests |

---

## 9. Repository Mapping

| Concern | Repository | Path convention |
|---|---|---|
| Landing, joined, leaderboard, admin UI | `ziora_frontend` | `app/(waitlist)/`, `app/admin/` |
| Shared UI components | `ziora_frontend` | `components/waitlist/` |
| Icons | `ziora_frontend` | `components/icons.tsx` |
| API client hooks | `ziora_frontend` | `lib/api/waitlist.ts` |
| Express routes + models | `ziora_backend` | `src/routes/waitlist/`, `src/models/` |
| Email templates | `ziora_backend` | `src/emails/waitlist/` |
| Rank cron job | `ziora_backend` | `src/jobs/recalculateRanks.ts` |

---

## 10. Launch Handoff → Marketplace MVP

When the marketplace MVP (`SCOPE.md`) is ready:

1. Export `invited` cohort from waitlist admin by rank wave.
2. Send launch email with unique registration link: `ziora.app/register?invite=<token>`.
3. On marketplace registration, match by email → set waitlist `status: converted`, `convertedAt`.
4. Pre-fill buyer/vendor role from `roleInterest`.
5. Deprecate waitlist landing or redirect `/` to marketplace homepage.

---

## 11. Open Decisions (Client Sign-off)

| # | Decision | Options | Default recommendation |
|---|---|---|---|
| 1 | Tier for v1 launch | Standard only vs Premium from day one | Standard first, Premium week 2 |
| 2 | Email verification before counting referral | Required vs immediate | Immediate for MVP; add verification if fraud appears |
| 3 | Leaderboard anonymity | First name + initial vs full name opt-in | First name + last initial |
| 4 | Waitlist domain | `ziora.app` root vs `waitlist.ziora.app` | `ziora.app` until marketplace replaces it |
| 5 | Display name on signup | Collect first name at signup vs email only | Email required; first name optional |

---

*Last updated: June 2026 | Ziora Waitlist — Standard & Premium Scope*
