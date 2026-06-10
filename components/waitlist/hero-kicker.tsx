/**
 * Early-access admission strip — ticket tear, not another pulsing pill badge.
 */
export function HeroKicker({ audience = "buyer" }: { audience?: "buyer" | "vendor" }) {
  const isVendor = audience === "vendor";

  return (
    <div className="relative inline-flex max-w-full items-stretch">
      <span
        aria-hidden
        className="absolute -left-1.5 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-[#1450E5]"
      />
      <span
        aria-hidden
        className="absolute -right-1.5 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full bg-[#1450E5]"
      />

      <div className="flex min-w-0 items-stretch overflow-hidden rounded-md border border-white/20 bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm">
        <div className="flex items-center px-4 py-2.5 sm:px-5">
          <p className="text-left text-[13px] leading-snug text-white/90 sm:text-[14px]">
            <span className="font-display font-semibold text-white">
              {isVendor ? "Vendor cohort forming." : "No listings yet."}
            </span>{" "}
            <span className="text-white/75">
              {isVendor
                ? "We're onboarding verified sellers in Lagos first."
                : "We're vetting sellers in Lagos first."}
            </span>
          </p>
        </div>

        <div
          aria-hidden
          className="relative w-px shrink-0 self-stretch bg-white/20"
        >
          <span className="absolute inset-y-2 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-white/30" />
        </div>

        <div className="flex shrink-0 flex-col justify-center px-4 py-2 text-left sm:px-5">
          <span className="text-[10px] font-medium tracking-[0.14em] text-white/50">
            {isVendor ? "VENDOR ACCESS" : "EARLY ACCESS"}
          </span>
          <span className="mt-0.5 font-display text-[13px] font-semibold tabular-nums text-white sm:text-[14px]">
            Wave 1 · Q3 &apos;26
          </span>
        </div>
      </div>
    </div>
  );
}
