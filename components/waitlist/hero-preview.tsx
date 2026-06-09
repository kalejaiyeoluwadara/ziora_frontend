import { BadgeCheck } from "@/components/icons";
import { cn } from "@/lib/utils";

interface HeroPreviewProps {
  className?: string;
}

const PRODUCTS = [
  { hue: "linear-gradient(135deg,#DCE6FF,#9CB6FF)", price: "₦24,500", deal: false },
  { hue: "linear-gradient(135deg,#FFE2C7,#FFB877)", price: "₦8,900", deal: true },
  { hue: "linear-gradient(135deg,#D6F5E4,#86E0B3)", price: "₦52,000", deal: false },
  { hue: "linear-gradient(135deg,#E6DBFF,#B79CFF)", price: "₦14,200", deal: false },
  { hue: "linear-gradient(135deg,#CFE0FF,#8FB0FF)", price: "₦31,750", deal: false },
  { hue: "linear-gradient(135deg,#FFD9DE,#FF9FB0)", price: "₦6,300", deal: true },
  { hue: "linear-gradient(135deg,#D8F0FF,#8FD6FF)", price: "₦19,900", deal: false },
  { hue: "linear-gradient(135deg,#E9ECF2,#C3CBD9)", price: "₦44,000", deal: false },
];

/**
 * Abstract marketplace mock inside a browser window — shows "what's coming"
 * without stock photos. Peeks from the bottom of the hero (clipped by parent).
 */
export function HeroPreview({ className }: HeroPreviewProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto w-full max-w-4xl overflow-hidden rounded-t-2xl border border-white/40 bg-white shadow-2xl shadow-brand-blue-dark/30",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-bg-section px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <span className="ml-3 flex h-6 flex-1 max-w-[220px] items-center rounded-full bg-white px-3 text-[11px] font-medium text-text-muted">
          ziora.app
        </span>
      </div>

      {/* Storefront mock */}
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-3 w-24 rounded-full bg-bg-card" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-bg-card" />
            <div className="h-6 w-6 rounded-full bg-bg-card" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-black/5 bg-white"
            >
              <div
                className="relative aspect-[4/3] w-full"
                style={{ background: p.hue }}
              >
                {p.deal && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-accent-orange px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                    Deal
                  </span>
                )}
              </div>
              <div className="p-2.5">
                <div className="h-2 w-4/5 rounded-full bg-bg-card" />
                <div className="mt-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-bold text-text-primary">
                    {p.price}
                  </span>
                  <BadgeCheck className="h-3.5 w-3.5 text-accent-success" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
