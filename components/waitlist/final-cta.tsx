import { EmailCaptureForm } from "./email-capture-form";
import { SubscriberCount } from "./subscriber-count";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="bg-bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16"
            style={{
              background:
                "linear-gradient(135deg, #0D3FC7 0%, #1450E5 55%, #1E5BFF 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative mx-auto max-w-xl text-center">
              <h2 className="font-display text-2xl font-bold tracking-[-0.01em] text-white sm:text-4xl">
                Be first through the door.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-white/85">
                Join the waitlist today and get early access when Ziora opens in
                your wave.
              </p>
              <div className="mx-auto mt-7 w-full max-w-[480px]">
                <EmailCaptureForm variant="inline" pill tone="light" />
              </div>
              <p className="mt-5 text-sm text-white/80">
                <SubscriberCount variant="compact" />
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
