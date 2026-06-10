import { BUYER_HOW_IT_WORKS } from "@/lib/waitlist/content";
import { referralDisplayUrl } from "@/lib/waitlist/share";
import { Reveal } from "./reveal";
import { BadgeCheck, CheckCircle, Copy, Lock } from "@/components/icons";

interface HowItWorksStep {
  step: number;
  title: string;
  body: string;
}

interface HowItWorksProps {
  steps?: HowItWorksStep[];
  /** Buyer steps include interactive previews; vendor steps are text-only. */
  variant?: "buyer" | "vendor";
  subtitle?: string;
}

function Step1Visual() {
  return (
    <div className="relative mt-6 w-full">
      <div className="relative overflow-hidden rounded-xl border border-black/5 bg-bg-section/60 p-4 transition-all duration-300 group-hover:border-brand-blue-light/10 group-hover:bg-bg-card/45">
        {/* Mock Input Row */}
        <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white p-2 text-xs text-text-muted transition-all duration-300 group-hover:border-brand-blue-light/25">
          <span className="truncate">kemi@ziora.app</span>
          <span className="ml-auto shrink-0 rounded-md bg-brand-blue px-2.5 py-1 text-[10px] font-medium text-white transition-colors duration-300 group-hover:bg-brand-blue-dark">
            Join →
          </span>
        </div>
        
        {/* Success Pop-up */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-accent-success/20 bg-accent-success/5 p-2 text-[11px] text-accent-success opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          <CheckCircle className="h-3.5 w-3.5 shrink-0" />
          <span className="font-medium">Checked in! You're #2,847 in line</span>
        </div>
      </div>
    </div>
  );
}

function Step2Visual() {
  return (
    <div className="relative mt-6 w-full">
      <div className="relative overflow-hidden rounded-xl border border-black/5 bg-bg-section/60 p-4 transition-all duration-300 group-hover:border-brand-blue-light/10 group-hover:bg-bg-card/45">
        {/* Mock Copy Input */}
        <div className="flex items-center justify-between rounded-lg border border-black/5 bg-white p-2 text-[11px] text-text-secondary">
          <span className="font-mono text-text-muted">
            {referralDisplayUrl("kemi")}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-semibold text-brand-blue-light">
            <Copy className="h-3 w-3" />
            <span className="group-hover:hidden">Copy</span>
            <span className="hidden group-hover:inline text-accent-success">Copied!</span>
          </span>
        </div>

        {/* Progress Tracker */}
        <div className="mt-3 space-y-1.5">
          <div className="flex justify-between text-[10px] font-medium text-text-secondary">
            <span>Milestone: Wave 3</span>
            <span className="tabular-nums transition-colors duration-300 group-hover:text-accent-success">
              <span className="group-hover:hidden">2/3 joined</span>
              <span className="hidden group-hover:inline">3/3 unlocked!</span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5">
            <div className="h-full w-2/3 rounded-full bg-brand-blue-light transition-all duration-500 ease-out group-hover:w-full group-hover:bg-accent-success" />
          </div>
          <p className="text-[10px] font-semibold text-accent-orange transition-colors duration-300 group-hover:text-accent-success">
            <span className="group-hover:hidden">1 more friend to move up</span>
            <span className="hidden group-hover:inline">Wave 3 Priority Access Unlocked ⚡</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function Step3Visual() {
  return (
    <div className="relative mt-6 w-full">
      <div className="relative overflow-hidden rounded-xl border border-black/5 bg-bg-section/60 p-4 transition-all duration-300 group-hover:border-brand-blue-light/10 group-hover:bg-bg-card/45">
        {/* Mock Product Card */}
        <div className="flex items-center gap-3">
          {/* Abstract product image */}
          <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-brand-blue-light to-brand-blue-dark opacity-85" />
          
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-semibold text-text-primary">Premium Ankara Tote</span>
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-accent-success" />
            </div>
            <p className="text-[10px] text-text-muted">Verified Vendor</p>
          </div>
        </div>

        {/* Transaction / Escrow Status */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-black/5 bg-white p-2 text-[10px]">
          <div className="flex items-center gap-1 text-text-secondary">
            <Lock className="h-3 w-3 text-brand-blue-light" />
            <span>Escrow Payment</span>
          </div>
          <span className="rounded bg-accent-orange/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-orange transition-all duration-300 group-hover:bg-accent-success/10 group-hover:text-accent-success">
            <span className="group-hover:hidden">PAID</span>
            <span className="hidden group-hover:inline flex items-center gap-0.5">DELIVERED 📦</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function HowItWorks({
  steps = BUYER_HOW_IT_WORKS,
  variant = "buyer",
  subtitle = "Reserve your spot, share with your network, and get ready for a trusted shopping experience.",
}: HowItWorksProps) {
  const showVisuals = variant === "buyer";

  return (
    <section className="bg-bg-section py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-text-primary sm:text-[32px]">
              How it works
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm text-text-secondary sm:text-[15px]">
              {subtitle}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map(({ step, title, body }, i) => (
            <Reveal key={step} delay={i * 0.08} className="flex">
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/5 bg-white p-6 sm:p-8 w-full transition-all duration-300 hover:-translate-y-1 hover:border-black/10 hover:shadow-sm">
                <div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue text-sm font-bold text-white transition-colors duration-300 group-hover:bg-brand-blue-light">
                    {step}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-text-secondary">
                    {body}
                  </p>
                </div>
                {/* Step specific visual previews */}
                {showVisuals && step === 1 && <Step1Visual />}
                {showVisuals && step === 2 && <Step2Visual />}
                {showVisuals && step === 3 && <Step3Visual />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
