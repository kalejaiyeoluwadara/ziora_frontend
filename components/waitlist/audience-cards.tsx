"use client";

import { useState } from "react";
import { BadgeCheck, ShieldCheck, Lock, Truck, Check, CheckCircle } from "@/components/icons";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

function EscrowSimulator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const steps = [
    { id: 1, label: "1. Secure" },
    { id: 2, label: "2. Transit" },
    { id: 3, label: "3. Release" },
  ] as const;

  return (
    <div className="relative mt-8 w-full">
      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-xs">
        {/* Stepper Tabs */}
        <div className="flex border-b border-black/5 pb-2">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={cn(
                "flex-1 text-center pb-2 text-[10px] font-semibold transition-all duration-300 border-b-2 -mb-2.5 cursor-pointer",
                step === s.id
                  ? "border-brand-blue-light text-brand-blue-light font-bold"
                  : "border-transparent text-text-muted hover:text-text-secondary"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content of Active Step */}
        <div className="mt-4 min-h-[110px] flex flex-col justify-between">
          {step === 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-accent-orange/15 bg-accent-orange/[0.02] p-2.5">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-accent-orange animate-pulse" />
                  <div>
                    <p className="text-[10px] font-bold text-text-primary">₦45,000 Paid via Paystack</p>
                    <p className="text-[9px] text-text-muted">Held securely by Ziora Escrow</p>
                  </div>
                </div>
                <span className="rounded bg-accent-orange/10 px-2 py-0.5 text-[8px] font-bold tracking-wider text-accent-orange">
                  SECURED 🔒
                </span>
              </div>
              <p className="text-[10px] text-text-secondary leading-4">
                Your money is debited but held safely by the platform. The vendor is notified to package and ship your order.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-brand-blue-light/15 bg-brand-blue-light/[0.02] p-2.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-brand-blue-light animate-bounce" />
                  <div>
                    <p className="text-[10px] font-bold text-text-primary">Dispatched via Kwik Delivery</p>
                    <p className="text-[9px] text-text-muted">Tracking ref: KWK-9827</p>
                  </div>
                </div>
                <span className="rounded bg-brand-blue-light/10 px-2 py-0.5 text-[8px] font-bold tracking-wider text-brand-blue-light">
                  IN TRANSIT 🛵
                </span>
              </div>
              <p className="text-[10px] text-text-secondary leading-4">
                Track your order in real-time as it makes its way to your doorstep. Escrow funds remain fully protected.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-accent-success/20 bg-accent-success/[0.02] p-2.5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-accent-success" />
                  <div>
                    <p className="text-[10px] font-bold text-text-primary">Order Delivered & Verified</p>
                    <p className="text-[9px] text-text-muted">Escrow released to vendor</p>
                  </div>
                </div>
                <span className="rounded bg-accent-success/10 px-2 py-0.5 text-[8px] font-bold tracking-wider text-accent-success">
                  RELEASED 🔓
                </span>
              </div>
              <p className="text-[10px] text-text-secondary leading-4">
                Once you confirm delivery, the funds are instantly released to the vendor. Complete peace of mind.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EarningsCalculator() {
  const [sales, setSales] = useState<number>(150000);

  const zioraCut = sales * 0.05;
  const takeHome = sales * 0.95;

  return (
    <div className="relative mt-8 w-full">
      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-xs">
        {/* Slider input */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-semibold text-text-secondary">
            <span>Projected Monthly Sales</span>
            <span className="font-mono text-xs font-bold text-brand-blue-light">
              ₦{sales.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min={20000}
            max={500000}
            step={10000}
            value={sales}
            onChange={(e) => setSales(Number(e.target.value))}
            className="w-full h-1.5 bg-black/5 rounded-lg appearance-none cursor-pointer accent-brand-blue-light"
          />
        </div>

        {/* Live Ledger breakdown */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          
          {/* Commission box */}
          <div className="rounded-lg bg-bg-section/60 p-2.5 border border-black/[0.02]">
            <p className="text-[8px] font-semibold uppercase tracking-[0.03em] text-text-muted">Ziora Flat Fee (5%)</p>
            <p className="mt-1 text-xs font-bold text-text-secondary font-mono tabular-nums">
              ₦{zioraCut.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* Earnings box */}
          <div className="rounded-lg bg-brand-blue-light/[0.02] p-2.5 border border-brand-blue-light/10">
            <p className="text-[8px] font-semibold uppercase tracking-[0.03em] text-brand-blue-light">Your Net Earnings</p>
            <p className="mt-1 text-sm font-bold text-accent-success font-mono tabular-nums">
              ₦{takeHome.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>

        </div>

        {/* Supporting info */}
        <div className="mt-3.5 flex items-center justify-between text-[9px] text-text-muted">
          <span>Escrow releases 48h after delivery</span>
          <span className="font-semibold text-brand-blue-light uppercase tracking-wider text-[8px]">
            No signup or listing fees
          </span>
        </div>
      </div>
    </div>
  );
}

export function AudienceCards() {
  return (
    <section className="bg-bg-white py-16 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header to match HowItWorks aesthetic */}
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
              Built for buyers and vendors
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm text-text-secondary sm:text-[15px]">
              A trust-first ecosystem designed to protect every transaction and power local commerce.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          
          {/* Card 1: For Buyers */}
          <Reveal delay={0.06} className="flex h-full">
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-bg-card/50 p-6 sm:p-9 w-full transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-sm">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-blue shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-blue-light">
                  For buyers
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-text-primary">
                  Shop with confidence
                </h3>
                
                <ul className="mt-5 space-y-3">
                  {[
                    "Discover verified sellers across categories",
                    "Pay securely — money held until delivery",
                    "Track every order from cart to doorstep",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14px] leading-6 text-text-secondary">
                      <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-blue-light/10 text-brand-blue-light">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <EscrowSimulator />
            </div>
          </Reveal>

          {/* Card 2: For Vendors */}
          <Reveal delay={0.12} className="flex h-full">
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-bg-card/50 p-6 sm:p-9 w-full transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-sm">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-blue shadow-xs">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-blue-light">
                  For vendors
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-text-primary">
                  Sell to ready buyers
                </h3>
                
                <ul className="mt-5 space-y-3">
                  {[
                    "Reach trust-first shoppers from day one",
                    "Get paid reliably after every delivery",
                    "Simple storefront, no upfront fees",
                  ].map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14px] leading-6 text-text-secondary">
                      <span className="mt-1 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand-blue-light/10 text-brand-blue-light">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <EarningsCalculator />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
