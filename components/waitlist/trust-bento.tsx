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
  },
  {
    icon: PaystackMark,
    title: "Payments secured by Paystack",
    body: "Your money is held safely and only released to the vendor after your order is delivered.",
    span: "",
  },
  {
    icon: Truck,
    title: "Lagos same-day delivery",
    body: "Fast, tracked delivery across Lagos with nationwide shipping at launch.",
    span: "",
  },
  {
    icon: Lock,
    title: "Buyer protection built in",
    body: "Didn't get what you ordered? Open a dispute and get your money back.",
    span: "sm:col-span-2",
  },
];

export function TrustBento() {
  return (
    <section className="bg-bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-xl font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
            A marketplace built for trust, not just transactions.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CELLS.map(({ icon: Icon, title, body, span }, i) => (
            <Reveal key={title} delay={i * 0.05} className={span}>
              <div className="h-full rounded-xl border border-black/5 bg-bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-bg-card text-brand-blue">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text-primary">
                  {title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-6 text-text-secondary">
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
