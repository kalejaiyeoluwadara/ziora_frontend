"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  BadgeCheck,
  Lock,
  PaystackMark,
  Truck,
} from "@/components/icons";
import { Reveal } from "./reveal";

const CELLS = [
  {
    icon: BadgeCheck,
    title: "Every vendor verified",
    body: "We manually review every seller before they can list. No fakes, no guesswork.",
    span: "sm:col-span-2",
    iconClass: "bg-[#EEF3FF] text-brand-blue",
    glowShadow: "0 0 0 1.5px rgba(20,80,229,0.18), 0 28px 52px rgba(20,80,229,0.12)",
    accentGrad: "linear-gradient(135deg, rgba(238,243,255,0.6), transparent 70%)",
  },
  {
    icon: PaystackMark,
    title: "Payments secured by Paystack",
    body: "Your money is held safely and only released to the vendor after your order is delivered.",
    span: "",
    iconClass: "bg-[#EDFAF3] text-accent-success",
    glowShadow: "0 0 0 1.5px rgba(34,197,94,0.16), 0 28px 52px rgba(34,197,94,0.1)",
    accentGrad: "linear-gradient(135deg, rgba(237,250,243,0.55), transparent 70%)",
  },
  {
    icon: Truck,
    title: "Lagos same-day delivery",
    body: "Fast, tracked delivery across Lagos with nationwide shipping at launch.",
    span: "",
    iconClass: "bg-[#FFF4EC] text-accent-orange",
    glowShadow: "0 0 0 1.5px rgba(255,107,0,0.16), 0 28px 52px rgba(255,107,0,0.1)",
    accentGrad: "linear-gradient(135deg, rgba(255,244,236,0.55), transparent 70%)",
  },
  {
    icon: Lock,
    title: "Buyer protection built in",
    body: "Didn't get what you ordered? Open a dispute and get your money back.",
    span: "sm:col-span-2",
    iconClass: "bg-[#EEF3FF] text-brand-blue",
    glowShadow: "0 0 0 1.5px rgba(20,80,229,0.18), 0 28px 52px rgba(20,80,229,0.12)",
    accentGrad: "linear-gradient(135deg, rgba(238,243,255,0.6), transparent 70%)",
  },
];

export function TrustBento() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-xl font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
            A marketplace built for trust, not just transactions.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CELLS.map(({ icon: Icon, title, body, span, iconClass, glowShadow, accentGrad }, i) => (
            <motion.div
              key={title}
              className={span}
              initial={reduce ? false : { opacity: 0, y: 44, scale: 0.94 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={
                reduce
                  ? {}
                  : { type: "spring", stiffness: 300, damping: 22, delay: i * 0.09 }
              }
            >
              <motion.div
                className="group relative h-full overflow-hidden rounded-2xl border border-black/5 bg-bg-white p-6 sm:p-8"
                whileHover={reduce ? {} : { scale: 1.03, y: -10 }}
                transition={reduce ? {} : { type: "spring", stiffness: 380, damping: 26 }}
              >
                {/* Accent tint flood on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: accentGrad }}
                />

                {/* Glow border + drop shadow on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: glowShadow }}
                />

                <div className="relative">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 ease-out group-hover:scale-110 group-hover:-rotate-3 ${iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-6 text-text-secondary">
                    {body}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
