"use client";

import { motion, useReducedMotion } from "motion/react";
import { EmailCaptureForm } from "./email-capture-form";
import { SubscriberCount } from "./subscriber-count";
import { TrustStrip } from "./trust-strip";

interface FinalCtaProps {
  audience?: "buyer" | "vendor";
}

function AnimatedHeading({ text, reduce }: { text: string; reduce: boolean }) {
  const words = text.split(" ");

  if (reduce) return <>{text}</>;

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 26,
            delay: i * 0.07,
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

export function FinalCta({ audience = "buyer" }: FinalCtaProps) {
  const reduce = useReducedMotion();
  const isVendor = audience === "vendor";

  return (
    <section className="bg-bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36, scale: 0.97 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={reduce ? {} : { type: "spring", stiffness: 260, damping: 26 }}
        >
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-12 shadow-[0_24px_60px_rgba(8,28,92,0.22),inset_0_1px_0_rgba(255,255,255,0.15)] sm:px-12 sm:py-16"
            style={{
              background:
                "linear-gradient(135deg, #0B36B0 0%, #1450E5 42%, #1E5BFF 100%)",
            }}
          >
            {/* Top-centre radial glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
              style={{
                background:
                  "radial-gradient(50% 40% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
              }}
            />

            {/* Dot texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
                backgroundSize: "30px 30px",
              }}
            />

            {/* Floating orb 1 — top-left */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl"
              style={{ animation: "orb-drift-1 16s ease-in-out infinite" }}
            />

            {/* Floating orb 2 — bottom-right */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -right-16 h-96 w-96 rounded-full bg-white/[0.05] blur-3xl"
              style={{ animation: "orb-drift-2 20s ease-in-out infinite" }}
            />

            {/* Floating orb 3 — centre depth */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue-dark/50 blur-3xl"
              style={{ animation: "orb-drift-3 12s ease-in-out infinite" }}
            />

            <div className="relative mx-auto max-w-2xl text-center">
              {/* Word-by-word heading reveal */}
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                <AnimatedHeading
                  text={isVendor ? "Ready to sell on Ziora?" : "Be first through the door."}
                  reduce={reduce ?? false}
                />
              </h2>

              <motion.p
                className="mx-auto mt-4 max-w-md text-base text-white/85 sm:text-lg"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reduce ? {} : { type: "spring", stiffness: 280, damping: 24, delay: 0.32 }}
              >
                {isVendor
                  ? "Join the vendor waitlist today and be first in line when applications open in your wave."
                  : "Join the waitlist today and get early access when Ziora opens in your wave."}
              </motion.p>

              {/* Glass form panel */}
              <motion.div
                className="relative mx-auto mt-8 w-full max-w-[480px] text-left"
                initial={reduce ? false : { opacity: 0, scale: 0.9, y: 22 }}
                whileInView={reduce ? {} : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reduce ? {} : { type: "spring", stiffness: 260, damping: 24, delay: 0.48 }}
              >
                {/* Pulsing ambient halo */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-3 rounded-[32px] bg-white/[0.09] blur-2xl sm:-inset-4"
                  style={{ animation: "cta-glow-pulse 3.2s ease-in-out infinite" }}
                />

                {/* Pulsing outer ring */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-[3px] rounded-[25px] border border-white/25"
                  style={{ animation: "cta-glow-pulse 3.2s ease-in-out infinite 0.6s" }}
                />

                <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-white/[0.11] p-4 shadow-[0_18px_50px_rgba(8,28,92,0.28),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[26px] sm:p-5 supports-[backdrop-filter]:bg-white/[0.09]">
                  {/* Specular top edge */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  />
                  {/* Inner vignette */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/[0.06]"
                  />

                  <div className="relative">
                    <p className="mb-3 text-center text-[13px] font-medium text-white/75">
                      {isVendor
                        ? "Join the vendor waitlist — takes 10 seconds"
                        : "Reserve your spot — takes 10 seconds"}
                    </p>
                    <EmailCaptureForm
                      variant="hero"
                      pill
                      glass
                      tone="light"
                      presetRole={audience}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="mt-6 text-sm text-white/80"
                initial={reduce ? false : { opacity: 0 }}
                whileInView={reduce ? {} : { opacity: 1 }}
                viewport={{ once: true }}
                transition={reduce ? {} : { duration: 0.5, delay: 0.7 }}
              >
                <SubscriberCount variant="compact" />
              </motion.p>

              {/* Trust strip */}
              <motion.div
                className="mt-10 flex justify-center border-t border-white/10 pt-8"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={reduce ? {} : { type: "spring", stiffness: 280, damping: 24, delay: 0.82 }}
              >
                <TrustStrip tone="light" className="justify-center gap-x-6 gap-y-3" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
