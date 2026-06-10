import { EmailCaptureForm } from "./email-capture-form";
import { SubscriberCount } from "./subscriber-count";
import { Reveal } from "./reveal";
import { TrustStrip } from "./trust-strip";

interface FinalCtaProps {
  audience?: "buyer" | "vendor";
}

export function FinalCta({ audience = "buyer" }: FinalCtaProps) {
  const isVendor = audience === "vendor";

  return (
    <section className="bg-bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-12 shadow-[0_24px_60px_rgba(8,28,92,0.2),inset_0_1px_0_rgba(255,255,255,0.15)] sm:px-12 sm:py-16"
            style={{
              background:
                "linear-gradient(135deg, #0B36B0 0%, #1450E5 42%, #1E5BFF 100%)",
            }}
          >
            {/* Top-center radial glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
              style={{
                background:
                  "radial-gradient(50% 40% at 50% 0%, rgba(255,255,255,0.22), transparent 60%)",
              }}
            />

            {/* Soft dot texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
                {isVendor ? "Ready to sell on Ziora?" : "Be first through the door."}
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base text-white/85 sm:text-lg">
                {isVendor
                  ? "Join the vendor waitlist today and be first in line when applications open in your wave."
                  : "Join the waitlist today and get early access when Ziora opens in your wave."}
              </p>

              {/* iOS-style frosted glass panel for final CTA */}
              <div className="relative mx-auto mt-8 w-full max-w-[480px] text-left">
                {/* Ambient halo */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 rounded-[32px] bg-white/[0.08] blur-2xl sm:-inset-4"
                />

                <div className="relative overflow-hidden rounded-[22px] border border-white/20 bg-white/[0.11] p-4 shadow-[0_18px_50px_rgba(8,28,92,0.28),inset_0_1px_0_rgba(255,255,255,0.42)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[26px] sm:p-5 supports-[backdrop-filter]:bg-white/[0.09]">
                  {/* Specular top edge */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  />
                  {/* Soft inner vignette */}
                  <div
                    aria-hidden
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
              </div>

              <p className="mt-6 text-sm text-white/80">
                <SubscriberCount variant="compact" />
              </p>

              {/* Trust strip matching the hero */}
              <div className="mt-10 flex justify-center border-t border-white/10 pt-8">
                <TrustStrip tone="light" className="justify-center gap-x-6 gap-y-3" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
