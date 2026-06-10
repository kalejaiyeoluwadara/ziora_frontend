"use client";

import { motion, useReducedMotion } from "motion/react";
import { Lock } from "@/components/icons";
import { cn } from "@/lib/utils";

interface HeroPreviewProps {
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES = [
  "All Categories", "Deals", "Fashion", "Electronics", "Health & Wellness",
  "Home", "Beauty", "Food", "Music",
];
const ACTIVE_CAT = "Fashion";

const BRANDS = [
  { name: "Adire Lagos", checked: true },
  { name: "Konga Basics", checked: true },
  { name: "TechHub NG", checked: true },
  { name: "Beauty Lane", checked: false },
  { name: "HomeStyle", checked: true },
  { name: "SnackBox", checked: false },
];

const PRODUCTS = [
  {
    bg: "#F0F4FF",
    icon: "⌚",
    name: "Smart Watch Pro Fitne...",
    price: "₦54,000",
    oldPrice: null,
    badge: "Top Item",
    heart: true,
    rating: null,
  },
  {
    bg: "#F5F0FF",
    icon: "👜",
    name: "Leather Crossbody Bag for Women",
    price: "₦18,900",
    oldPrice: null,
    badge: null,
    heart: true,
    rating: null,
  },
  {
    bg: "#F0F0F0",
    icon: "🥊",
    name: "Premium Boxing Gloves for...",
    price: "₦36,800",
    oldPrice: "₦52,000",
    badge: null,
    heart: false,
    rating: null,
  },
  {
    bg: "#EEFBF3",
    icon: "🏹",
    name: "Club Kit 1 Recurve Archer...",
    price: "₦48,900",
    oldPrice: null,
    badge: null,
    heart: false,
    rating: null,
  },
  {
    bg: "#EEF3FF",
    icon: "👕",
    name: "Classic Ankara Print Pullover Hoodie",
    price: "₦24,500",
    oldPrice: null,
    badge: null,
    heart: false,
    rating: "4.6/5",
  },
  {
    bg: "#F8F8F8",
    icon: "👟",
    name: "Lightweight Running T...",
    price: "₦42,000",
    oldPrice: null,
    badge: "Top Item",
    heart: true,
    rating: null,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function SearchIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="6" cy="6" r="4.5" stroke="#9CA3AF" strokeWidth="1.3" />
      <path d="M9.5 9.5l3 3" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill={filled ? "#1450E5" : "none"} stroke={filled ? "#1450E5" : "#CBD5E1"} strokeWidth="1.2" aria-hidden>
      <path d="M7 12s-5.5-3.5-5.5-6.5C1.5 3.5 3 2 4.75 2 5.9 2 6.8 2.7 7 3c.2-.3 1.1-1 2.25-1C11 2 12.5 3.5 12.5 5.5 12.5 8.5 7 12 7 12z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartSmallIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M1 1h1.5l1 6h7l1.5-4H4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="11" r="1" />
      <circle cx="10" cy="11" r="1" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <rect x="2" y="1.5" width="10" height="11" rx="1.5" />
      <path d="M5 4.5h4M5 7h4M5 9.5h2.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <circle cx="7" cy="4.5" r="2.5" />
      <path d="M2 13c0-2.5 2.2-4 5-4s5 1.5 5 4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card                                                       */
/* ------------------------------------------------------------------ */

function ProductCard({
  product,
  index,
  reduce,
}: {
  product: (typeof PRODUCTS)[number];
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative overflow-hidden rounded-xl bg-white"
    >
      {/* Heart */}
      <div className="absolute top-2 right-2 z-[2]">
        <HeartIcon filled={product.heart} />
      </div>

      {/* Product image area */}
      <div
        className="relative flex aspect-[4/3] items-center justify-center rounded-xl"
        style={{ backgroundColor: product.bg }}
      >
        <span className="text-[32px] leading-none select-none sm:text-[36px]" aria-hidden>
          {product.icon}
        </span>

        {/* Rating badge */}
        {product.rating && (
          <span className="absolute bottom-2 left-2 inline-flex items-center gap-[2px] rounded-full bg-white/90 px-1.5 py-[2px] text-[8px] font-bold text-text-primary shadow-sm backdrop-blur-sm">
            {product.rating}
            <svg width="7" height="7" viewBox="0 0 10 10" fill="#F59E0B" aria-hidden>
              <path d="M5 .8l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.2 2.5 8.5l.5-2.8-2-2 2.8-.4L5 .8z" />
            </svg>
          </span>
        )}
      </div>

      {/* Badge + Info */}
      <div className="px-2.5 pt-2 pb-2.5">
        {/* Top item badge */}
        {product.badge && (
          <span className="mb-1 inline-block rounded-full bg-accent-orange/15 px-2 py-[2px] text-[7px] font-bold text-accent-orange">
            {product.badge}
          </span>
        )}

        <p className="truncate text-[10px] font-semibold leading-snug text-text-primary">
          {product.name}
        </p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-[3px] rounded-full bg-bg-section px-2 py-[3px]">
            <CartSmallIcon />
            <span className="text-[9px] font-bold text-text-primary">{product.price}</span>
          </span>
          {product.oldPrice && (
            <span className="text-[8px] text-text-muted line-through">{product.oldPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar                                                            */
/* ------------------------------------------------------------------ */

function Sidebar() {
  return (
    <div className="hidden w-[170px] shrink-0 flex-col gap-4 pr-3 sm:flex">
      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-primary">Price Range</span>
          <span className="text-[8px] font-medium text-brand-blue">Reset</span>
        </div>
        <p className="mt-[2px] text-[7px] text-text-muted">The average price is ₦30,000</p>

        {/* Mini histogram */}
        <div className="mt-2 flex h-[28px] items-end gap-[2px]">
          {[12, 20, 35, 45, 38, 25, 40, 50, 42, 30, 18, 28, 35, 22, 15, 10].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-[1px]"
              style={{
                height: `${h * 0.56}px`,
                backgroundColor: i >= 2 && i <= 11 ? "#1450E5" : "#E5E7EB",
                opacity: i >= 2 && i <= 11 ? 0.5 + (i - 2) * 0.05 : 0.5,
              }}
            />
          ))}
        </div>

        {/* Slider track */}
        <div className="relative mt-1 h-[3px] rounded-full bg-bg-card">
          <div className="absolute left-[12%] right-[25%] h-full rounded-full bg-brand-blue" />
          <div className="absolute left-[12%] top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-blue bg-white shadow-sm" />
          <div className="absolute right-[25%] top-1/2 h-[10px] w-[10px] translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-blue bg-white shadow-sm" />
        </div>
        <div className="mt-1.5 flex justify-between">
          <span className="rounded-full bg-bg-section px-1.5 py-[2px] text-[7px] font-semibold text-text-primary">₦2,000</span>
          <span className="rounded-full bg-bg-section px-1.5 py-[2px] text-[7px] font-semibold text-text-primary">₦80,000</span>
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <span className="text-[10px] font-bold text-text-primary">Star Rating</span>
        <div className="mt-1 flex items-center gap-1">
          {[1, 2, 3, 4].map((s) => (
            <svg key={s} width="10" height="10" viewBox="0 0 10 10" fill="#F59E0B" aria-hidden>
              <path d="M5 .8l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.2 2.5 8.5l.5-2.8-2-2 2.8-.4L5 .8z" />
            </svg>
          ))}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#E5E7EB" aria-hidden>
            <path d="M5 .8l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.2 2.5 8.5l.5-2.8-2-2 2.8-.4L5 .8z" />
          </svg>
          <span className="ml-0.5 text-[7px] text-text-muted">4 Stars & up</span>
        </div>
      </div>

      {/* Brand */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-text-primary">Brand</span>
          <span className="text-[8px] font-medium text-brand-blue">Reset</span>
        </div>
        <div className="mt-1.5 space-y-1.5">
          {BRANDS.map((brand) => (
            <label key={brand.name} className="flex items-center gap-1.5">
              <span
                className={cn(
                  "flex h-3 w-3 items-center justify-center rounded-[3px] border",
                  brand.checked
                    ? "border-brand-blue bg-brand-blue"
                    : "border-black/15 bg-white",
                )}
              >
                {brand.checked && (
                  <svg width="7" height="7" viewBox="0 0 10 10" fill="none" aria-hidden>
                    <path d="M2.5 5l2 2 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="text-[8px] text-text-secondary">{brand.name}</span>
            </label>
          ))}
        </div>
        <span className="mt-1 inline-block text-[7px] font-medium text-brand-blue">More Brands</span>
      </div>

      {/* Delivery Options */}
      <div>
        <span className="text-[10px] font-bold text-text-primary">Delivery Options</span>
        <div className="mt-1.5 flex gap-1">
          <span className="rounded-full bg-brand-blue px-2.5 py-[3px] text-[8px] font-semibold text-white">
            Standard
          </span>
          <span className="rounded-full border border-black/10 bg-white px-2.5 py-[3px] text-[8px] font-medium text-text-secondary">
            Pick Up
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export function HeroPreview({ className }: HeroPreviewProps) {
  const reduce = !!useReducedMotion();

  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      {/* Preview label */}

      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-t-2xl border border-white/30 bg-white shadow-[0_-4px_30px_rgba(11,54,176,0.25),0_8px_40px_rgba(0,0,0,0.15)]"
      >
        {/* ── Browser chrome ── */}
        <div className="flex items-center gap-2 border-b border-black/[0.06] bg-gradient-to-b from-[#F6F6F6] to-[#ECECEC] px-4 py-2">
          <div className="flex gap-[6px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#FEBC2E]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#28C840]" />
          </div>
          <div className="ml-2 flex gap-1 opacity-40">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M7.5 2.5L4 6l3.5 3.5" stroke="#666" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="#666" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="ml-1 flex h-[24px] flex-1 max-w-[260px] items-center gap-1.5 rounded-md border border-black/[0.06] bg-white px-2.5">
            <Lock className="h-[9px] w-[9px] shrink-0 text-accent-success" />
            <span className="truncate text-[10px] text-text-muted">ziora.app/store</span>
          </div>
        </div>

        {/* ── Site header ── */}
        <div className="border-b border-black/[0.04] bg-white px-4 py-2.5 sm:px-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-1.5">
              <div className="flex h-[18px] w-[18px] items-center justify-center rounded bg-brand-blue">
                <span className="text-[8px] font-extrabold leading-none text-white">Z</span>
              </div>
              <span className="text-[11px] font-bold tracking-tight text-text-primary">ziora</span>
            </div>

            {/* Search */}
            <div className="mx-3 flex h-[24px] flex-1 max-w-[200px] items-center gap-1.5 rounded-full border border-black/[0.06] bg-bg-section px-2.5">
              <SearchIcon />
              <span className="text-[8px] text-text-muted/50">Search</span>
            </div>

            {/* Right nav */}
            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-[3px] text-[8px] font-medium text-text-secondary sm:inline-flex">
                <OrdersIcon />
                Orders
              </span>
              <span className="hidden items-center gap-[3px] text-[8px] font-medium text-text-secondary sm:inline-flex">
                <HeartIcon filled={false} />
                Favourites
              </span>
              <span className="inline-flex items-center gap-[3px] text-[8px] font-medium text-text-secondary">
                <UserIcon />
              </span>
              <span className="relative inline-flex items-center gap-[3px] text-[8px] font-medium text-text-secondary">
                <CartSmallIcon />
                <span className="text-[8px]">Cart</span>
                <span className="absolute -top-1 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-accent-orange text-[6px] font-bold text-white">
                  3
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ── Category tabs ── */}
        <div className="border-b border-black/[0.04] bg-white px-4 py-1.5 sm:px-5">
          <div className="flex items-center gap-1 overflow-hidden">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className={cn(
                  "shrink-0 whitespace-nowrap rounded-full px-2.5 py-[4px] text-[8px] font-semibold transition-colors",
                  cat === ACTIVE_CAT
                    ? "bg-brand-blue text-white"
                    : "text-text-secondary hover:bg-bg-section",
                )}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* ── Content: sidebar + grid ── */}
        <div className="flex bg-bg-section px-4 pt-3 sm:px-5">
          {/* Left sidebar */}
          <Sidebar />

          {/* Product grid */}
          <div className="min-w-0 flex-1">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {PRODUCTS.map((product, i) => (
                <ProductCard
                  key={product.name}
                  product={product}
                  index={i}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none h-6 bg-gradient-to-t from-bg-section/80 to-transparent"
        />
      </motion.div>
    </div>
  );
}
