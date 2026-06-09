import { ZioraLogo } from "@/components/icons";
import { AvatarCluster } from "./avatar-cluster";
import { EmailCaptureForm } from "./email-capture-form";
import { HeroPreview } from "./hero-preview";
import { SubscriberCount } from "./subscriber-count";
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
          <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.08em] text-white ring-1 ring-inset ring-white/15 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-success/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-success" />
            </span>
            Launching in Lagos · Q3 2026
          </span>

          <h1 className="mt-6 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-white sm:text-[52px] lg:text-[60px]">
            Shop verified sellers.
            <br className="hidden sm:block" /> Pay securely. Get it delivered.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-7 text-white/85">
            The marketplace Lagos buyers can actually trust. Join the waitlist
            for early access before a single product is listed.
          </p>

          {/* Pill signup form */}
          <div className="mt-8 w-full max-w-[520px]">
            <EmailCaptureForm variant="hero" pill tone="light" />
          </div>

          {/* Social proof */}
          <div className="mt-6 flex items-center gap-3">
            <AvatarCluster />
            <p className="text-sm font-medium text-white/85">
              <SubscriberCount variant="compact" />
            </p>
          </div>

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
