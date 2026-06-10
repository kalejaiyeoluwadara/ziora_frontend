import { EmailCaptureForm } from "./email-capture-form";
import { cn } from "@/lib/utils";

interface HeroSignupGlassProps {
  className?: string;
  onSignupRequest?: (email: string) => void;
  signupLabel?: string;
}

/**
 * iOS-style frosted glass panel for the hero signup — blur, specular edge,
 * and a soft halo so the form floats above the gradient.
 */
export function HeroSignupGlass({
  className,
  onSignupRequest,
  signupLabel = "Reserve your spot — takes 10 seconds",
}: HeroSignupGlassProps) {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Ambient halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-[36px] bg-white/[0.08] blur-2xl sm:-inset-4"
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
            {signupLabel}
          </p>
          <EmailCaptureForm
            variant="hero"
            pill
            glass
            tone="light"
            onSignupRequest={onSignupRequest}
          />
        </div>
      </div>
    </div>
  );
}
