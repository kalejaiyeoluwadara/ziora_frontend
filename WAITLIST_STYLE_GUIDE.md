# Ziora Waitlist — Style & UX Guide
**Premium Pre-Launch Experience | Design + Interaction Standards**
Companion to: `WAITLIST_SCOPE.md` · Brand tokens: `AGENTS.md`

---

## 1. Design North Star

Ziora's waitlist should feel like **Temu's discovery energy** filtered through **Amazon's credibility** and **Flutterwave's modern African tech polish** — not like a generic SaaS template or a scrappy startup form.

### The premium test

Before shipping any screen, ask:

1. Would a Lagos buyer trust this page with their email in under 3 seconds?
2. Does it feel like a marketplace is coming — not just another newsletter?
3. Is there exactly one obvious action per viewport?
4. Would someone screenshot the confirmation page and share it on WhatsApp?

If any answer is no, revise.

### Reference benchmarks (what we're stealing, not copying)

| Brand | What to borrow | What to avoid |
|---|---|---|
| **Robinhood** | Position counter, referral loop, one-field signup, sunk-cost psychology | US fintech visual clichés (neon green, stock charts) |
| **Superhuman** | Exclusivity, outcome-driven headline, premium restraint | Mandatory onboarding calls — too heavy for marketplace waitlist |
| **Harry's** | Clean D2C promise, tiered referral rewards, no fluff | Physical-product reward tiers — Ziora uses access waves |
| **Dropbox** | Product-aligned rewards (early access = the product) | Storage-specific mechanics |
| **Premium D2C bento** | Trust-through-data cards, live counters, editorial layout | Dark-mode analyst aesthetic — Ziora stays light + blue |
| **Flutterwave / Tingg** | Warm African confidence, clarity over jargon, mobile-first trust | Overly playful illustration systems — Ziora is commerce, not payments infra |

Sources: [LaunchList referral guide](https://getlaunchlist.com/blog/waitlist-referral-program-guide), [Flowjam waitlist examples](https://www.flowjam.com/blog/waitlist-landing-page-examples-10-high-converting-pre-launch-designs-how-to-build-yours), [Raze Growth SaaS waitlist design](https://razegrowth.com/blog/saas-waitlist-design-essentials), [Yu-kai Chou leaderboard design](https://yukaichou.com/gamification-analysis/leaderboard-design-definitive-guide-octalysis/), [Fintech trust patterns](https://www.utsubo.com/blog/fintech-website-trust-design-patterns).

---

## 2. Brand Expression on the Waitlist

The waitlist is Ziora's first impression. Every visual decision maps to `AGENTS.md` tokens.

### 2.1 Colour system

| Role | Token | Hex | Waitlist usage |
|---|---|---|---|
| Hero wash | `brand-blue` | `#1450E5` | Full-bleed hero gradient start |
| CTA / links | `brand-blue-light` | `#1E5BFF` | Primary buttons, active states |
| CTA hover | `brand-blue-dark` | `#0D3FC7` | Button hover, pressed |
| Page canvas | `bg-white` | `#FFFFFF` | Main background |
| Section rhythm | `bg-section` | `#F5F7FC` | Alternating bands, leaderboard bg |
| Cards / inputs | `bg-card` | `#EEF3FF` | Bento cells, form fields, stat tiles |
| Headlines | `text-primary` | `#111827` | H1–H3, position numbers |
| Body | `text-secondary` | `#4B5563` | Subheads, FAQ, helper text |
| Meta / placeholders | `text-muted` | `#9CA3AF` | Labels, timestamps, rank deltas |
| Urgency / rewards | `accent-orange` | `#FF6B00` | Milestone badges, referral rewards |
| Countdown / deals | `accent-deal` | `#FF8A00` | Launch countdown strip |
| Verified / success | `accent-success` | `#22C55E` | Checkmarks, "You're in" states |

**Gradient hero (signature treatment):**

```css
/* Tailwind arbitrary example */
background: linear-gradient(165deg, #1450E5 0%, #1E5BFF 45%, #EEF3FF 100%);
```

Use gradients only in the hero and confirmation celebration state — not on every card. Restraint signals premium.

### 2.2 Typography

| Element | Font | Weight | Size (mobile → desktop) | Tracking |
|---|---|---|---|---|
| Display / H1 | Plus Jakarta Sans | 700 | 32px → 48px | -0.02em |
| H2 section titles | Plus Jakarta Sans | 600 | 24px → 32px | -0.01em |
| H3 card titles | Inter | 600 | 18px → 20px | normal |
| Body | Inter | 400 | 16px → 18px | normal |
| Labels / badges | Inter | 500 | 12px → 13px | 0.08em uppercase |
| Position / rank numbers | Inter or tabular nums | 700 | 40px → 64px | -0.03em |

**Rule:** Headlines name the **outcome**, not the category.

- ✗ "Nigeria's next marketplace"
- ✓ "Shop verified sellers. Pay securely. Get it delivered."

Numbers (position, rank, subscriber count) use `font-variant-numeric: tabular-nums` so digits don't jump on live updates.

### 2.3 Spacing & layout grid

- **Base unit:** 4px. All spacing multiples of 4.
- **Content max-width:** 1120px (`max-w-7xl`), centered.
- **Section padding:** `py-16` mobile → `py-24` desktop.
- **Card padding:** `p-6` mobile → `p-8` desktop.
- **Gutter:** 16px mobile, 24px tablet+.

**Layout pattern:** Bento grid for trust sections (2×2 on mobile, 3-column on desktop). Hero stays single-column — never bury the CTA inside a grid cell above the fold.

### 2.4 Elevation & borders

Premium waitlists use **soft depth**, not heavy shadows.

| Surface | Treatment |
|---|---|
| Cards on `bg-white` | `border border-black/5`, `shadow-sm` |
| Cards on `bg-section` | `bg-white` fill, no shadow |
| Primary CTA | No shadow; colour contrast carries weight |
| Modals / share sheet | `shadow-xl`, `rounded-2xl` |
| Input fields | `bg-card`, `border-transparent`, focus ring `ring-2 ring-brand-blue-light/30` |

**Border radius scale:** `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for hero form container, `rounded-full` for CTAs and badges only.

### 2.5 Motion

Motion should feel **confident and brief** — never playful-bouncy (that reads cheap on fintech/commerce).

| Interaction | Duration | Easing | Notes |
|---|---|---|---|
| Button hover | 150ms | ease-out | Background colour only |
| Form submit → success | 300ms | ease-in-out | Crossfade to success state |
| Subscriber count tick | 400ms | ease-out | Count-up animation on load |
| Position reveal (post-signup) | 600ms | spring (low bounce) | Number rolls into place once |
| Section scroll-in | 500ms | ease-out | `opacity + translateY(12px)`, respect `prefers-reduced-motion` |
| Leaderboard row highlight | 200ms | ease-out | Background flash when user's row enters view |

**Never:** parallax, auto-playing video heroes, infinite pulse on CTA, confetti on every signup.

### 2.6 Iconography & illustration

- All icons live in `components/icons.tsx` — never inline SVG in pages.
- Icon style: 1.5px stroke, rounded caps, 24×24 default.
- Trust icons: shield (secure payment), check-badge (verified vendor), truck (delivery), lock (data privacy).
- **No stock photos of smiling people with shopping bags.** Use:
  - Abstract product grid mockups (blurred)
  - Category silhouette cards
  - Optional subtle Lagos skyline line art in footer only

---

## 3. Page-by-Page UX Specification

### 3.1 Landing page (`/`)

#### Above the fold (non-negotiable on 375px)

Must be visible without scrolling on iPhone SE / in Instagram in-app browser:

```
┌─────────────────────────────────┐
│  [Ziora logo]                   │
│                                 │
│  Shop verified sellers.         │  ← H1 outcome headline
│  Pay securely. Get it delivered.│
│                                 │
│  Join [2,847]+ early members    │  ← live counter, real data only
│  launching in Lagos first.      │
│                                 │
│  ┌─────────────────────────┐   │
│  │  your@email.com         │   │  ← single input, email keyboard
│  └─────────────────────────┘   │
│  ┌─────────────────────────┐   │
│  │   Get early access  →   │   │  ← full-width CTA, 48px min height
│  └─────────────────────────┘   │
│  Free to join · No spam         │
│                                 │
│  [Paystack] [Verified] [Kwik]   │  ← trust strip, monochrome logos
└─────────────────────────────────┘
```

#### Section order (scroll)

1. Hero + form (above fold)
2. **Trust bento** — 4 cells: verified vendors, Paystack payments, Lagos same-day, buyer protection
3. **How it works** — 3 steps with numbered circles, not a timeline widget
4. **Who it's for** — two audience cards (buyers / vendors) without splitting the signup flow
5. **Social proof** — subscriber count + optional founder quote or "Built for Nigerian commerce"
6. **FAQ** — 5–6 questions max, accordion
7. **Final CTA band** — repeat email form (for end-of-scroll intent)
8. **Footer** — logo, social, privacy, terms, contact

#### Navigation rules

- **No header nav links** on waitlist v1. Logo + optional "Leaderboard" link only (Premium).
- No hamburger menu. No blog. No "About us" page.
- Footer holds legal links only.

#### Copy tone

| Context | Tone | Example |
|---|---|---|
| Hero | Confident, specific | "The marketplace Lagos buyers can actually trust." |
| Form helper | Low-pressure | "Free to join. We'll email you when it's your turn." |
| Trust bento | Factual | "Payments secured by Paystack. Your money is protected." |
| FAQ | Direct | "When do you launch?" → "We're onboarding vendors now. Waitlist members get access in waves starting Q3 2026." |

Avoid: "revolutionary", "disrupting", "the future of", "don't miss out!!!"

---

### 3.2 Confirmation page (`/joined`)

This is the **most important screen in Premium tier**. Robinhood, Dropbox, and Harry's all treat post-signup as the viral engine — not the landing page.

#### Standard confirmation

```
┌─────────────────────────────────┐
│         ✓ (accent-success)        │
│                                 │
│      You're on the list           │
│                                 │
│      #2,847                       │  ← large tabular number
│      in line for early access     │
│                                 │
│  We'll email you at               │
│  user@email.com when your         │
│  wave opens.                      │
│                                 │
│  [Follow on Instagram]            │
│  [Follow on X]                    │
└─────────────────────────────────┘
```

#### Premium confirmation (extends Standard)

Add below position/rank:

```
┌─────────────────────────────────┐
│  Move up the list                 │
│  Invite friends who'd shop here   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ziora.app/r/ope-7k2m  📋│   │  ← copy button, haptic on mobile
│  └─────────────────────────┘   │
│                                 │
│  [WhatsApp]  [Copy]  [Share]    │  ← one-tap, 44px touch targets
│                                 │
│  ── Your next milestone ──       │
│  ▓▓▓▓▓▓░░░░  2 / 3 referrals    │
│  1 more → Wave 2 early access     │
│                                 │
│  ── Top referrers ──             │
│  1. Ada O.        12 referrals    │
│  2. Tunde A.       9 referrals    │
│  ...                            │
│  47. You           2 referrals    │  ← neighbourhood view
└─────────────────────────────────┘
```

#### Confirmation UX rules

1. **Show position/rank within 1 second** of redirect — skeleton → number animation.
2. **Referral link above the fold** on mobile (Premium).
3. **WhatsApp share is primary** in Nigeria — make it the first share button, not Twitter.
4. Pre-filled WhatsApp message:

   > I just joined the Ziora waitlist — verified sellers, secure Paystack checkout, delivery across Lagos. Join here and we'll both move up: {referralLink}

5. **Do not ask for more info** on this page. Optional name/role was on landing or comes via email later.
6. Duplicate email path: "You're already #1,204 on the list" + resend link option.

---

### 3.3 Leaderboard (`/leaderboard`) — Premium

#### Layout

- Hero strip: "Early access goes to top referrers first"
- **Top 10** public list with rank, display name (first name + last initial), referral count, optional badge for top 3.
- **Your neighbourhood:** if token present, pin a card showing user at centre with 5 above + 5 below ([Yu-kai Chou neighbourhood pattern](https://yukaichou.com/gamification-analysis/leaderboard-design-definitive-guide-octalysis/)).
- CTA at bottom: "Join the waitlist" → `/`.

#### Leaderboard anti-patterns (do not ship)

| Anti-pattern | Why it fails | Ziora alternative |
|---|---|---|
| Showing rank #9,847 of 10,000 | Demotivates 99% of users | Neighbourhood view + milestone progress |
| Fake or inflated top referrers | Destroys trust instantly | Fraud detection + manual admin review |
| Full legal names without consent | Privacy risk | First name + last initial default |
| Real-time twitchy reordering | Anxiety, not motivation | Refresh every 60s or on page load |
| Leaderboard as landing page hero | Confusing for new visitors | Separate route, linked from confirmation |

#### Top 3 badge treatment

| Rank | Badge colour | Label |
|---|---|---|
| 1 | `accent-orange` gradient | Founding Insider |
| 2 | `brand-blue-light` | Early Access |
| 3 | `bg-card` + blue border | Priority Member |

---

### 3.4 Referral redirect (`/r/[code]`)

- Instant redirect to `/` with `ref` cookie set (7-day TTL).
- Optional 800ms branded splash: "Ada invited you to Ziora" → auto-redirect.
- Invalid code: redirect to `/` silently (no error page — don't break the funnel).

---

### 3.5 Admin dashboard (`/admin/*`)

Admin is **functional, not marketing** — clean data table aesthetic.

- Sidebar nav: Overview, Subscribers, Export.
- Use neutral greys; brand blue only for primary actions.
- Dense table on desktop; card list on mobile.
- No animations beyond row hover highlight.

---

## 4. Component Library

Build these once in `components/waitlist/`:

| Component | Purpose | Key props |
|---|---|---|
| `WaitlistHero` | Hero + inline form | `stats`, `onSubmit` |
| `EmailCaptureForm` | Reusable signup form | `variant: 'hero' \| 'inline' \| 'sticky'` |
| `TrustBento` | 4-cell trust grid | — |
| `HowItWorks` | 3-step strip | — |
| `AudienceCards` | Buyer / vendor cards | — |
| `LiveCounter` | Animated subscriber count | `count`, `label` |
| `FaqAccordion` | FAQ section | `items[]` |
| `PositionReveal` | Animated rank/position number | `value`, `label` |
| `ReferralShareCard` | Link + copy + share buttons | `code`, `url`, `rank` |
| `MilestoneProgress` | Referral progress bar | `current`, `nextReward` |
| `LeaderboardTable` | Top N + neighbourhood | `entries`, `highlightId` |
| `TrustStrip` | Paystack / verified / delivery logos | — |
| `StickyMobileCta` | Fixed bottom CTA on scroll | appears after hero leaves viewport |

### Form component spec

```
Height:        48px input, 52px button (thumb-friendly)
Width:         100% mobile; max 420px centered in hero
Input type:    email, autocomplete="email", inputMode="email"
Button:        Full-width mobile; inline pair on desktop (input flex-1, button auto)
States:        default, focus, loading (spinner in button), error (inline below), success (redirect)
```

### CTA copy hierarchy

| Priority | Label | Use |
|---|---|---|
| Primary | `Get early access` | Hero, sticky, final band |
| Secondary | `Join the waitlist` | Leaderboard bottom, referral splash |
| Tertiary | `Copy link` / `Share on WhatsApp` | Confirmation page |

Never use: "Submit", "Sign up", "Subscribe" (reads newsletter, not marketplace).

---

## 5. Premium Tier — Referral UX Playbook

### 5.1 Milestone structure (Ziora-specific)

Align rewards with **access waves** — zero marginal cost, high perceived value ([LaunchList reward design](https://getlaunchlist.com/blog/waitlist-referral-program-guide)):

| Referrals | Reward | Confirmation copy |
|---|---|---|
| 0 | Wave 4 (default queue) | "You're on the list." |
| 1 | Move up ~100 positions | "You moved up! One friend down." |
| 3 | Wave 3 priority | "Wave 3 unlocked — 1 week earlier access." |
| 5 | Wave 2 priority | "You're in Wave 2. Five referrals well spent." |
| 10 | Wave 1 + founding badge | "Founding member status. Top 10% of referrers." |
| 25 | Vendor fast-track review | "Selling on Ziora? Your vendor application gets priority review." |

Show the **next milestone** on confirmation page, not the full table (reduces cognitive load).

### 5.2 Share surfaces (every touchpoint)

| Surface | What to show |
|---|---|
| Confirmation page | Link, rank, next milestone, WhatsApp |
| Welcome email | Link above fold, position, one CTA button |
| Day 3 email | "You're X referrals from Wave 3" |
| Week 2 email | Leaderboard snapshot, top 5 names |
| Pre-launch email | "Access opens in 48h for Wave 1" |

### 5.3 Fraud & credibility UX

Visible integrity builds premium trust:

- Subscriber count is **real** — never seed fake numbers.
- Leaderboard shows "Verified signups only" footnote.
- If rate-limited or suspicious: "We couldn't process that signup. Try again shortly." — no accusatory copy.
- Admin can flag/remove entries; leaderboard respects removal on next refresh.

---

## 6. Mobile-First Rules (Nigeria context)

Primary traffic: **WhatsApp shares, Instagram stories, Twitter/X, TikTok bio links.**

| Rule | Spec |
|---|---|
| Viewport target | 375×667 minimum; test in Instagram in-app browser |
| Tap targets | Minimum 44×44px; 48px for CTAs |
| Sticky CTA | Show after user scrolls past hero form |
| Font size | 16px minimum on inputs (prevents iOS zoom) |
| Load time | LCP < 2.5s on 3G; no hero video |
| Images | WebP, max 100KB hero visual |
| WhatsApp | `https://wa.me/?text=` with encoded prefill — primary share channel |
| Data cost | Page weight < 500KB total initial load |

### Social in-app browser checklist

- [ ] CTA visible without scroll at 640px viewport height (Instagram chrome)
- [ ] Form not hidden behind keyboard when input focused
- [ ] Copy-to-clipboard works in Safari + Chrome WebView
- [ ] WhatsApp share opens native share sheet on Android

---

## 7. Trust & Premium Signals

Fintech trust patterns ([Utsubo](https://www.utsubo.com/blog/fintech-website-trust-design-patterns), [WSA](https://wsa.design/news/fintech-services-ui-ux-design-how-trust-is-built-in-seconds)) adapted for Ziora:

### Place near the form (not footer)

1. **Payment trust** — "Secured by Paystack" with monochrome logo
2. **Verification** — "Every vendor manually reviewed"
3. **Data** — "We'll never sell your email"
4. **Social proof** — Live subscriber count (real)

### Typography trust rule

Brand personality lives in **colour, photography, and copy** — not decorative fonts. Body and UI stay neutral Inter. Premium ≠ ornate.

### What premium is NOT

- Dark mode hero with neon accents
- Fake countdown timers that reset on refresh
- "Only 47 spots left" when spots are unlimited
- Testimonials from people who haven't used the product
- Pop-ups, exit intent overlays, chat widgets

---

## 8. Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `< 640px` | Single column, full-width CTA, sticky bottom CTA, stacked bento (1 col) |
| `640–1024px` | 2-column bento, hero form inline (input + button row) |
| `> 1024px` | 3-column bento, hero text left / form right split, max-width container |

---

## 9. Accessibility

- Colour contrast: WCAG AA minimum (4.5:1 body text, 3:1 large text).
- Focus rings visible on all interactive elements.
- `prefers-reduced-motion`: disable count-up and scroll animations.
- Form errors announced to screen readers (`aria-live="polite"`).
- Leaderboard table: semantic `<table>` with headers, not div grid.

---

## 10. SEO & Share Metadata

```html
<title>Ziora — Shop verified sellers in Lagos | Join the waitlist</title>
<meta name="description" content="Join the Ziora waitlist for early access to Nigeria's trusted multi-vendor marketplace. Secure Paystack payments. Verified vendors. Lagos-first delivery." />

<!-- Open Graph (critical for WhatsApp link previews) -->
<meta property="og:title" content="I'm on the Ziora waitlist" />
<meta property="og:description" content="Verified sellers. Secure checkout. Join early access." />
<meta property="og:image" content="/og/waitlist-og.png" />  <!-- 1200×630, brand blue gradient + logo -->
```

WhatsApp uses Open Graph for link previews — a polished OG image is non-negotiable for viral sharing.

---

## 11. Email Template Style

Match the landing page: white background, brand blue CTA button, Inter font stack.

| Email | Subject line | Primary CTA |
|---|---|---|
| Welcome (Standard) | You're #[position] on the Ziora waitlist | Follow us for updates |
| Welcome (Premium) | You're #[rank] — share to move up | Copy your referral link |
| Referral success | Someone joined through your link | See your new rank |
| Launch invite | Your Ziora access is ready | Create your account |

Keep emails **single-column, 600px max-width**, one CTA per email.

---

## 12. Quality Checklist (pre-ship)

### Visual

- [ ] All colours from `AGENTS.md` tokens — no arbitrary Tailwind blues
- [ ] Plus Jakarta Sans on headings, Inter on body
- [ ] Icons imported from `icons.tsx` only
- [ ] No dark mode styles (out of scope)
- [ ] OG image designed and tested in WhatsApp preview

### UX

- [ ] One primary action per viewport
- [ ] Email-only above fold; optional fields deferred
- [ ] Confirmation page loads position/rank immediately
- [ ] WhatsApp share is first share option (Premium)
- [ ] Duplicate email handled gracefully
- [ ] Loading / empty / error states on every async action
- [ ] Sticky mobile CTA after hero scroll

### Premium referral

- [ ] Referral link on confirmation above fold
- [ ] Milestone progress shows next reward only
- [ ] Leaderboard uses neighbourhood view, not global rank for most users
- [ ] Top 10 public; user's row highlighted
- [ ] Self-referral blocked silently

### Performance & trust

- [ ] Lighthouse mobile ≥ 90
- [ ] LCP < 2.5s
- [ ] Subscriber count is live and accurate
- [ ] Paystack trust badge visible near form
- [ ] Privacy link within footer reach

---

## 13. File Map (implementation)

| Asset | Path |
|---|---|
| Style guide | `WAITLIST_STYLE_GUIDE.md` ← this file |
| Functional scope | `WAITLIST_SCOPE.md` |
| Brand tokens | `AGENTS.md` |
| Landing page | `app/(waitlist)/page.tsx` |
| Confirmation | `app/(waitlist)/joined/page.tsx` |
| Leaderboard | `app/(waitlist)/leaderboard/page.tsx` |
| Components | `components/waitlist/*` |
| Icons | `components/icons.tsx` |
| Tailwind tokens | `app/globals.css` (CSS variables matching AGENTS.md) |

---

*Last updated: June 2026 | Ziora Waitlist Style & UX Guide*
