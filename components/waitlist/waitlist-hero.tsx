import { ZioraLogo } from "@/components/icons";
import { HeroKicker } from "./hero-kicker";
import { HeroSignupGlass } from "./hero-signup-glass";
import { HeroSocialProof } from "./hero-social-proof";
import { HeroPreview } from "./hero-preview";
import { TrustStrip } from "./trust-strip";

export function WaitlistHero() {
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
        <header className="flex items-center justify-between">
          <ZioraLogo className="h-7 text-white" />
          <a
            href="/leaderboard"
            className="rounded-full px-3 py-1.5 text-[13px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            Leaderboard
          </a>
        </header>

        {/* Centered hero content */}
        <div className="mx-auto flex max-w-2xl flex-col items-center pt-12 text-center sm:pt-16">
          <HeroKicker />

          <h1 className="mt-6 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
            Shop verified sellers.
            <br className="hidden sm:block" /> Pay securely. Get it delivered.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-7 text-white/85">
            The marketplace Lagos buyers can actually trust. Join the waitlist
            for early access before a single product is listed.
          </p>

          <div className="mt-8 w-full max-w-[540px]">
            <HeroSignupGlass />
          </div>

          <HeroSocialProof className="mt-6" />

          {/* Trust strip */}
          <div className="mt-7">
            <TrustStrip tone="light" className="justify-center" />
          </div>
        </div>

        {/* Marketplace preview peeking from the bottom */}
        <div className="mx-auto mt-14 max-h-[300px] max-w-4xl overflow-hidden sm:max-h-[380px]">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}
