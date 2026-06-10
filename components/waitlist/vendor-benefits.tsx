"use client";

import { useState } from "react";
import { BadgeCheck, Check } from "@/components/icons";
import { Reveal } from "./reveal";

function EarningsCalculator() {
  const [sales, setSales] = useState<number>(150000);

  const zioraCut = sales * 0.05;
  const takeHome = sales * 0.95;

  return (
    <div className="relative mt-8 w-full">
      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-xs">
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

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-bg-section/60 p-2.5 border border-black/[0.02]">
            <p className="text-[8px] font-semibold uppercase tracking-[0.03em] text-text-muted">5% commission per sale</p>
            <p className="mt-1 text-xs font-bold text-text-secondary font-mono tabular-nums">
              ₦{zioraCut.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="rounded-lg bg-brand-blue-light/[0.02] p-2.5 border border-brand-blue-light/10">
            <p className="text-[8px] font-semibold uppercase tracking-[0.03em] text-brand-blue-light">Your Net Earnings</p>
            <p className="mt-1 text-sm font-bold text-accent-success font-mono tabular-nums">
              ₦{takeHome.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

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

export function VendorBenefits() {
  return (
    <section className="bg-bg-white py-16 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
              Built for Nigerian sellers
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm text-text-secondary sm:text-[15px]">
              Reach trust-first shoppers, get paid reliably, and grow without upfront costs.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mx-auto max-w-xl">
          <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-bg-card/50 p-6 sm:p-9 transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-sm">
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

            <EarningsCalculator />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
