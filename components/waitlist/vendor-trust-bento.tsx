import {
  BadgeCheck,
  Lock,
  PaystackMark,
  Truck,
} from "@/components/icons";
import { Reveal } from "./reveal";

const VENDOR_CELLS = [
  {
    icon: BadgeCheck,
    title: "Manual seller verification",
    body: "Every vendor is reviewed before they can list — buyers trust verified storefronts from day one.",
    span: "sm:col-span-2",
  },
  {
    icon: PaystackMark,
    title: "Secure Paystack payouts",
    body: "Buyer payments are held in escrow and released to you after delivery is confirmed.",
    span: "",
  },
  {
    icon: Truck,
    title: "Built-in logistics",
    body: "Same-day Kwik delivery in Lagos and nationwide GIG shipping at launch.",
    span: "",
  },
  {
    icon: Lock,
    title: "No upfront fees",
    body: "No signup fees, no listing fees — just a 5% commission on completed sales.",
    span: "sm:col-span-2",
  },
];

export function VendorTrustBento() {
  return (
    <section className="bg-bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="max-w-xl font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
            Everything you need to sell with confidence.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {VENDOR_CELLS.map(({ icon: Icon, title, body, span }, i) => (
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
