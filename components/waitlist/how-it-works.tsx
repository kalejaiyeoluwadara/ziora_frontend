import { HOW_IT_WORKS } from "@/lib/waitlist/content";
import { Reveal } from "./reveal";

export function HowItWorks() {
  return (
    <section className="bg-bg-section py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-center font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
            How it works
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {HOW_IT_WORKS.map(({ step, title, body }, i) => (
            <Reveal key={step} delay={i * 0.08}>
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-base font-bold text-white">
                  {step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  {title}
                </h3>
                <p className="mt-1.5 max-w-xs text-[15px] leading-6 text-text-secondary">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
