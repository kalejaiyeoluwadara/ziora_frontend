"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ZioraLogo } from "@/components/icons";
import { HeroKicker } from "./hero-kicker";
import { HeroSignupGlass } from "./hero-signup-glass";
import { HeroSocialProof } from "./hero-social-proof";
import { HeroPreview } from "./hero-preview";
import { SignupModal } from "./signup-modal";
import { TrustStrip } from "./trust-strip";

const heroStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WaitlistHero() {
  const reduce = !!useReducedMotion();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");

  const handleSignupRequest = (email: string) => {
    setSignupEmail(email);
    setShowSignupModal(true);
  };

  const MotionBlock = reduce ? "div" : motion.div;

  return (
    <section className="relative overflow-hidden">
      {/* Signature deep-blue gradient — hero only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #0B36B0 0%, #1450E5 42%, #1E5BFF 100%)",
        }}
      />
      {/* Top-center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
        }}
      />
      {/* Soft dot texture — no stock photos */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8 sm:pt-8">
        <MotionBlock
          {...(!reduce && {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, ease: "easeOut" },
          })}
          className="flex items-center justify-between"
        >
          <ZioraLogo className="h-7 text-white" />
          <a
            href="/leaderboard"
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            Leaderboard
          </a>
        </MotionBlock>

        <MotionBlock
          {...(!reduce && {
            variants: heroStagger,
            initial: "hidden",
            animate: "show",
          })}
          className="mx-auto flex max-w-2xl flex-col items-center pt-12 text-center sm:pt-16"
        >
          <MotionBlock {...(!reduce && { variants: heroItem })}>
            <HeroKicker />
          </MotionBlock>

          <MotionBlock {...(!reduce && { variants: heroItem })}>
            <h1 className="mt-6 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
              Shop verified sellers.
              <br className="hidden sm:block" /> Pay securely. Get it delivered.
            </h1>
          </MotionBlock>

          <MotionBlock {...(!reduce && { variants: heroItem })}>
            <p className="mt-5 max-w-lg text-lg leading-7 text-white/85">
              The marketplace Lagos buyers can actually trust. Join the waitlist
              for early access before a single product is listed.
            </p>
          </MotionBlock>

          <MotionBlock
            {...(!reduce && { variants: heroItem })}
            className="mt-8 w-full max-w-[540px]"
          >
            <HeroSignupGlass onSignupRequest={handleSignupRequest} />
          </MotionBlock>

            <HeroSocialProof className="mt-6" />

          <MotionBlock {...(!reduce && { variants: heroItem })} className="mt-7">
            <TrustStrip tone="light" className="justify-center" />
          </MotionBlock>
        </MotionBlock>

        <MotionBlock
          {...(!reduce && {
            initial: { opacity: 0, y: 32 },
            animate: { opacity: 1, y: 0 },
            transition: {
              duration: 0.65,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            },
          })}
          className="mx-auto mt-14 max-h-[360px] max-w-4xl overflow-hidden sm:max-h-[440px]"
        >
          <HeroPreview />
        </MotionBlock>
      </div>

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        email={signupEmail}
      />
    </section>
  );
}
