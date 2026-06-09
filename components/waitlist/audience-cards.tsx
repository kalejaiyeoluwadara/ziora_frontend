import { BadgeCheck, ShieldCheck } from "@/components/icons";
import { Reveal } from "./reveal";

const CARDS = [
  {
    icon: ShieldCheck,
    eyebrow: "For buyers",
    title: "Shop with confidence",
    points: [
      "Discover verified sellers across categories",
      "Pay securely — money held until delivery",
      "Track every order from cart to doorstep",
    ],
  },
  {
    icon: BadgeCheck,
    eyebrow: "For vendors",
    title: "Sell to ready buyers",
    points: [
      "Reach trust-first shoppers from day one",
      "Get paid reliably after every delivery",
      "Simple storefront, no upfront fees",
    ],
  },
];

export function AudienceCards() {
  return (
    <section className="bg-bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {CARDS.map(({ icon: Icon, eyebrow, title, points }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-black/5 bg-bg-card p-7 sm:p-9">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-blue shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.08em] text-brand-blue-light">
                  {eyebrow}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-text-primary">
                  {title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-[15px] leading-6 text-text-secondary"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue-light" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
