import { BadgeCheck, PaystackMark, Truck } from "@/components/icons";
import { cn } from "@/lib/utils";

interface TrustStripProps {
  className?: string;
  /** On a dark/gradient hero, use light text. */
  tone?: "light" | "dark";
}

const ITEMS = [
  { icon: PaystackMark, label: "Secured by Paystack" },
  { icon: BadgeCheck, label: "Verified vendors" },
  { icon: Truck, label: "Lagos-first delivery" },
];

export function TrustStrip({ className, tone = "dark" }: TrustStripProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2",
        className,
      )}
    >
      {ITEMS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className={cn(
            "flex items-center gap-1.5 text-[13px] font-medium",
            tone === "light" ? "text-white/85" : "text-text-secondary",
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {label}
        </li>
      ))}
    </ul>
  );
}
