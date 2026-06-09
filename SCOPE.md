# Ziora Marketplace — Project Scope
**Frontend & Backend | MVP v1**
Prepared by: Oluwadara | Client: Opeoluwa Lawson (Ziora)

---

## Scope Philosophy

Ziora MVP is not a feature race. It is a trust machine. The platform ships when and only when a buyer can find a product, pay for it, and receive it — and a vendor can list a product, receive an order, and get paid. Every item in this scope is traceable back to that loop.

---

## 1. Frontend Scope

### 1.1 Public / Buyer-Facing Pages

| Page | Description |
|---|---|
| **Homepage** | Hero banner, featured categories, flash sale strip, curated vendor picks, trending products grid |
| **Category / Browse page** | Filterable product grid (price, category, rating, vendor), sort options, pagination |
| **Product Detail page** | Images gallery, description, price, vendor info + badge, stock status, Add to Cart, reviews section, Q&A |
| **Search Results page** | Full-text search output, same filter panel as Browse |
| **Vendor Storefront page** | Vendor banner, bio, verified badge, product listings, ratings |
| **Cart** | Line items, quantity controls, subtotal, coupon input, proceed to checkout |
| **Checkout flow** | Address entry → delivery method → order summary → payment |
| **Payment confirmation** | Success/failure states, order number, what happens next |
| **Order Tracking page** | Order status timeline, delivery partner status updates |
| **Orders History page** | List of past orders with status chips |
| **Order Detail page** | Full order breakdown, tracking, return/dispute trigger |
| **Buyer Profile** | Personal details, saved addresses, notification preferences |
| **Wishlist** | Saved products, move to cart |
| **Auth pages** | Sign up, Log in, Forgot password, Reset password, Email verification |

### 1.2 Vendor Dashboard

| Page | Description |
|---|---|
| **Vendor Onboarding** | Multi-step: business info → ID upload → bank details → review |
| **Dashboard Home** | Revenue summary, recent orders, pending actions, low stock alerts |
| **Product Management** | List, create, edit, delete products; bulk CSV import |
| **Order Management** | Incoming orders, status updates (confirm, dispatch), order detail |
| **Storefront Settings** | Banner image, store description, social links |
| **Payout & Earnings** | Wallet balance, payout history, bank account management |
| **Discount & Promos** | Create coupon codes, flash sale scheduling |
| **Analytics** | Basic: revenue by period, top products, order volume chart |
| **Messaging** | Vendor-to-buyer thread view |
| **Settings** | Account details, notification preferences, password change |

### 1.3 Admin Panel

| Page | Description |
|---|---|
| **Admin Dashboard** | Platform GMV, active vendors, pending approvals, dispute count |
| **Vendor Approvals** | Review applications, approve/reject with reason |
| **User Management** | Search buyers/vendors, suspend accounts, view profiles |
| **Order Oversight** | Full order list, filter by status, intervene on disputes |
| **Dispute Management** | Open disputes, resolution workflow, refund trigger |
| **Payout Management** | Weekly batch review, approve/hold payouts |
| **Product Moderation** | Flag and remove listings |
| **Platform Settings** | Commission rates per category, payout threshold, fee config |

### 1.4 Frontend Technical Requirements

- **Framework:** Next.js 14 (App Router, SSR + ISR for product/category pages)
- **Styling:** Tailwind CSS with custom design tokens (see AGENT.md)
- **Responsive:** Mobile-first, 375px → 1440px. PWA manifest + service worker for installability.
- **Performance:** Core Web Vitals targets — LCP < 2.5s, CLS < 0.1. Product images via Cloudinary with `next/image`.
- **SEO:** Dynamic `<title>` and `<meta>` per product/category. Structured data (JSON-LD) on product pages.
- **Auth:** JWT stored in `httpOnly` cookies. Refresh token rotation.
- **Payments:** Paystack Inline JS popup (no redirect). Post-payment webhook verification before order confirmation.
- **Real-time:** Lightweight polling for order status updates in MVP (WebSockets in v2).
- **Error states:** Every async UI has loading, empty, and error states. No blank screens.

---

## 2. Backend Scope

### 2.1 Auth & User Management

- Buyer registration (email + password, OTP phone verification)
- Vendor registration (extended: business name, ID upload, bank details)
- Social login — Google (OAuth 2.0)
- JWT access + refresh token issuance and rotation
- Email verification flow (Resend)
- Password reset via email link
- Role-based access control middleware (`buyer`, `vendor`, `admin`)
- Account suspension (admin action)

### 2.2 Product & Catalog Service

- CRUD for products (vendor-scoped)
- Product schema: name, description, images (Cloudinary URLs), price, compare-at price, stock qty, category, tags, attributes (flexible map)
- Category tree management (admin-managed taxonomy)
- Bulk product import via CSV (async job, success/error report)
- Product search: full-text (MongoDB Atlas Search or basic regex MVP)
- Filter API: category, price range, rating, vendor, in-stock
- Product review + rating (buyer only, post-purchase)
- Product Q&A (buyer ask, vendor answer)
- Recently viewed (client-side + optionally persisted)
- Wishlist (buyer-owned list of product IDs)

### 2.3 Vendor Management Service

- Vendor profile CRUD
- Onboarding state machine: `PENDING → UNDER_REVIEW → APPROVED / REJECTED`
- KYC document upload (ID) → Cloudinary, admin review
- Bank account storage (account number, bank code — no raw card data)
- Vendor storefront data (banner, bio, social links)
- Vendor public rating (aggregated from product reviews)
- Multiple staff admins per vendor store (optional, if time allows)

### 2.4 Order & Cart Service

- Cart (server-side preferred for logged-in users; local storage fallback for guests)
- Cart merge on login
- Checkout: address selection, delivery method selection, order total calculation (subtotal + delivery fee)
- Multi-vendor order splitting: one buyer checkout → separate sub-orders per vendor
- Order creation (locks stock, creates Paystack payment intent)
- Order status updates (vendor and admin actions)
- Delivery fee calculation via Kwik/GIG APIs (zone-based)
- Order cancellation (before dispatch, with refund trigger)

### 2.5 Payment Service (Paystack)

- Initialize transaction (Paystack Inline)
- Webhook handler: `charge.success`, `charge.failed`, `refund.processed`
- Idempotent webhook processing (deduplicate by Paystack reference)
- Escrow logic: funds held as platform balance on `PAID`, released to vendor wallet on `DELIVERED + 48h`
- Coupon code validation and discount application at checkout
- Refund trigger (dispute resolution or admin action)

### 2.6 Payout Service

- Vendor wallet (platform-managed balance)
- Earnings ledger (credit on order complete, debit on payout)
- Weekly batch payout job (cron — runs every Monday)
- Paystack Transfer API for vendor payouts
- Minimum payout threshold enforcement
- Payout history per vendor
- 7-day dispute hold before auto-completing earnings

### 2.7 Logistics Service

- Kwik Delivery integration: request same-day pickup + delivery (Lagos intra)
- GIG Logistics integration: standard + intercity booking
- Delivery fee estimation API (used at checkout)
- Tracking webhook handlers: update order status on carrier status changes
- Fallback: manual status update by vendor if logistics API unavailable

### 2.8 Notifications Service

| Trigger | Channels |
|---|---|
| Order placed (buyer) | Email + SMS |
| Order received (vendor) | Email + SMS |
| Order dispatched (buyer) | Email + SMS |
| Order delivered (buyer) | Email |
| Payment received (vendor) | Email |
| Payout processed (vendor) | Email + SMS |
| Account verified (buyer/vendor) | Email |
| Password reset | Email |
| New review posted (vendor) | Email |

- Email: Resend with HTML templates
- SMS: Termii (Nigerian numbers, OTP + transactional)

### 2.9 Dispute & Returns Service

- Buyer opens dispute (within 7-day window after `DELIVERED`)
- Dispute states: `OPEN → UNDER_REVIEW → RESOLVED_BUYER / RESOLVED_VENDOR / ESCALATED`
- Admin intervention workflow
- Refund trigger on buyer-favoured resolution
- Evidence upload (buyer photos)

### 2.10 Messaging Service (Vendor ↔ Buyer)

- Thread per order (scoped to an order for context)
- Message CRUD with read receipts
- Admin can view threads for dispute resolution
- MVP: REST polling; WebSockets in v2

### 2.11 Admin APIs

- Platform-wide analytics: GMV, orders by status, active vendors
- Vendor approval/rejection with reason
- User suspension
- Manual payout intervention
- Platform config: commission rates by category, payout schedule, minimum threshold

---

## 3. Integrations

| Integration | Purpose | Priority |
|---|---|---|
| **Paystack** | Payments, transfers, refunds | Must-have |
| **Cloudinary** | Product images, KYC document uploads | Must-have |
| **Kwik Delivery** | Lagos same-day delivery | Must-have |
| **GIG Logistics** | Nationwide / intercity shipping | Must-have |
| **Resend** | Transactional email | Must-have |
| **Termii** | OTP + transactional SMS (NG numbers) | Must-have |
| **Google OAuth** | Social login | Should-have |
| **MongoDB Atlas Search** | Full-text product search | Should-have |

---

## 4. Out of Scope (MVP)

These are explicitly excluded. Do not design for them, do not leave stubs.

- Native iOS / Android apps
- Dark mode
- Multilingual support (Yoruba, Igbo, Hausa, Pidgin)
- Multi-currency (USD/GBP)
- Affiliate / referral system
- Blog / editorial section
- ERP / CRM / accounting integrations
- Social media API integrations
- Vendor mobile app
- B2B bulk ordering or invoice flows
- Advanced AI recommendations (product discovery AI is v2+)

---

## 5. MVP Acceptance Criteria

The MVP is complete when all of the following are verifiable in production:

1. A guest can browse products and add to cart without an account.
2. A new buyer can register, verify their email and phone, and complete a purchase via Paystack.
3. An order correctly splits by vendor and each vendor receives their sub-order notification.
4. Buyer can track order status updates in real time (polling).
5. Vendor receives and processes an order, marking it dispatched with a tracking reference.
6. Buyer confirms delivery; 48h hold begins, funds release to vendor wallet after hold.
7. Weekly payout batch correctly transfers vendor wallet balance via Paystack Transfer.
8. Admin can approve/reject a vendor application from the admin panel.
9. Admin can intervene on a dispute and trigger a refund.
10. Platform is PWA-installable on Android Chrome.
11. Product pages score ≥ 80 on Lighthouse (mobile).
12. All 20–50 onboarded launch vendors have active, discoverable listings.

---

## 6. Phased Delivery Plan

### Phase 1 — Foundation (Weeks 1–4)
- Monorepo setup, CI/CD pipelines, environment config
- Auth system (buyer + vendor + admin roles)
- Product catalog (CRUD, categories, images)
- Vendor onboarding flow (self-service + admin approval)
- Basic homepage + browse + product detail pages

### Phase 2 — Commerce Core (Weeks 5–8)
- Cart + checkout flow
- Paystack payment integration + webhook handling
- Order management (buyer and vendor views)
- Escrow / wallet logic
- Notifications (email + SMS)
- Logistics API integration (Kwik + GIG)

### Phase 3 — Trust & Operations (Weeks 9–11)
- Order tracking
- Dispute and returns flow
- Vendor payout system (wallet + weekly batch)
- Admin panel (approvals, oversight, config)
- Messaging (vendor ↔ buyer, order-scoped)

### Phase 4 — Polish & Launch Readiness (Weeks 12–13)
- SEO (meta tags, JSON-LD, sitemap)
- PWA setup (manifest, service worker)
- Performance audit (Lighthouse, image optimisation)
- Security audit (rate limiting, input validation, OWASP basics)
- Load testing core flows
- Vendor onboarding for launch cohort (20–50 vendors)
- Soft launch

---

*Last updated: June 2026 | Prepared by Oluwadara for Ziora / Opeoluwa Lawson*