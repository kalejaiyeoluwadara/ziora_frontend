"use client";

import { useState } from "react";
import { Check, CheckCircle, Lock, ShieldCheck, Truck } from "@/components/icons";
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
        <div className="flex border-b border-black/5 pb-2">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={cn(
                "flex-1 text-center pb-2 text-[10px] font-semibold transition-all duration-300 border-b-2 -mb-2.5 cursor-pointer",
                step === s.id
                  ? "border-brand-blue-light text-brand-blue-light font-bold"
                  : "border-transparent text-text-muted hover:text-text-secondary",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

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
                Your money is debited but held safely by the platform. The seller is notified to package and ship your order.
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
                    <p className="text-[9px] text-text-muted">Escrow released to seller</p>
                  </div>
                </div>
                <span className="rounded bg-accent-success/10 px-2 py-0.5 text-[8px] font-bold tracking-wider text-accent-success">
                  RELEASED 🔓
                </span>
              </div>
              <p className="text-[10px] text-text-secondary leading-4">
                Once you confirm delivery, the funds are released to the seller. Complete peace of mind.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BuyerBenefits() {
  return (
    <section className="bg-bg-white py-16 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
              Shop with confidence
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm text-text-secondary sm:text-[15px]">
              A trust-first marketplace designed to protect every purchase from cart to doorstep.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mx-auto max-w-xl">
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-bg-card/50 p-6 sm:p-9 transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-sm">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-blue shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-blue-light">
              For buyers
            </p>
            <h3 className="mt-1 font-display text-xl font-bold text-text-primary">
              Everything you need to buy safely
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

            <EscrowSimulator />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
