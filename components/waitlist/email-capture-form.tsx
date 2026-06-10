"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Spinner } from "@/components/icons";
import { cn } from "@/lib/utils";
import { subscribeSchema, type SubscribeFormValues } from "@/lib/waitlist/schema";
import { SignupModal } from "./signup-modal";

type Variant = "hero" | "inline" | "sticky";
type Tone = "light" | "dark";

interface EmailCaptureFormProps {
  variant?: Variant;
  className?: string;
  /** Show the optional role-interest selector below the email row. */
  withRole?: boolean;
  /** Render input + button inside a single rounded "pill" container (desktop). */
  pill?: boolean;
  /** Frosted glass styling for hero panels on dark gradients. */
  glass?: boolean;
  /** Tone of helper/validation text against its background. */
  tone?: Tone;
  /** When set, parent owns the signup modal (e.g. hero). */
  onSignupRequest?: (email: string) => void;
  /** Pre-select buyer or vendor role in the signup modal. */
  presetRole?: "buyer" | "vendor";
}

const ROLE_OPTIONS: { value: "buyer" | "vendor" | "both"; label: string }[] = [
  { value: "buyer", label: "I want to buy" },
  { value: "vendor", label: "I want to sell" },
  { value: "both", label: "Both" },
];

export function EmailCaptureForm({
  variant = "hero",
  className,
  withRole = false,
  pill = false,
  glass = false,
  tone = "dark",
  onSignupRequest,
  presetRole,
}: EmailCaptureFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const ownsModal = !onSignupRequest;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: "", firstName: "", company: "" },
  });

  const role = watch("roleInterest");

  async function onSubmit(values: SubscribeFormValues) {
    setServerError(null);

    try {
      // Simulate validation / processing latency
      await new Promise((resolve) => setTimeout(resolve, 600));
      if (onSignupRequest) {
        onSignupRequest(values.email.trim().toLowerCase());
        return;
      }
      setSubmittedEmail(values.email);
      setShowModal(true);
    } catch (err) {
      setServerError("Something went wrong. Please try again shortly.");
    }
  }

  const compact = variant === "sticky";

  const helperColor = tone === "light" ? "text-white/70" : "text-text-muted";
  const errorColor = tone === "light" ? "text-red-100" : "text-red-500";

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={cn(
          "w-full",
          variant === "hero" && !pill && "max-w-[440px]",
          className,
        )}
      >
        {/* Honeypot — visually hidden, off-screen, not announced */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <div
          className={cn(
            "flex flex-col gap-2.5",
            !compact && !pill && "sm:flex-row sm:items-start",
            pill &&
              !glass &&
              "rounded-2xl bg-white p-2 shadow-xl shadow-brand-blue-dark/15 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full",
            pill &&
              glass &&
              "rounded-2xl border border-white/15 bg-white/10 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)] sm:flex-row sm:items-center sm:gap-1.5 sm:rounded-full",
          )}
        >
          <div className="flex-1">
            <label htmlFor={`email-${variant}`} className="sr-only">
              Email address
            </label>
            <input
              id={`email-${variant}`}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="your@email.com"
              aria-invalid={!!errors.email}
              className={cn(
                "h-12 w-full text-base focus:outline-none",
                pill && !glass &&
                  "rounded-xl bg-bg-card px-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-brand-blue-light/30 sm:rounded-full sm:bg-transparent sm:px-5 sm:focus:ring-0",
                pill &&
                  glass &&
                  "rounded-xl bg-white/10 px-4 text-white placeholder:text-white/40 focus:ring-2 focus:ring-white/25 sm:rounded-full sm:bg-transparent sm:px-5 sm:focus:ring-0",
                !pill &&
                  "rounded-xl border border-transparent bg-bg-card px-4 text-text-primary placeholder:text-text-muted transition-shadow focus:ring-2 focus:ring-brand-blue-light/30",
                errors.email && "ring-2 ring-red-400/50",
              )}
              {...register("email")}
              onChange={(e) => {
                setValue("email", e.target.value);
                if (serverError) setServerError(null);
              }}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className={cn(
              "h-12 w-full shrink-0",
              !compact && !pill && "sm:w-auto",
              pill && "sm:h-11 sm:w-auto sm:px-6",
              glass &&
                "shadow-[0_4px_14px_rgba(13,63,199,0.45)] hover:shadow-[0_6px_18px_rgba(13,63,199,0.5)]",
            )}
          >
            {isSubmitting ? (
              <>
                <Spinner className="animate-spin" />
                Joining…
              </>
            ) : (
              <>
                Get early access
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        {withRole && (
          <div
            className={cn(
              "mt-3 flex flex-wrap gap-2",
              pill && "justify-center",
            )}
          >
            {ROLE_OPTIONS.map((opt) => {
              const active = role === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() =>
                    setValue("roleInterest", active ? undefined : opt.value)
                  }
                  aria-pressed={active}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors",
                    active
                      ? "bg-brand-blue text-white"
                      : tone === "light"
                        ? "bg-white/15 text-white hover:bg-white/25"
                        : "bg-bg-card text-text-secondary hover:bg-[#E1E9FF]",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Validation + server messaging */}
        <div aria-live="polite" className="min-h-[20px]">
          {errors.email && (
            <p className={cn("mt-2 text-sm", errorColor)}>{errors.email.message}</p>
          )}
          {serverError && (
            <p className={cn("mt-2 text-sm", errorColor)}>{serverError}</p>
          )}
        </div>

        {!compact && (
          <p className={cn("mt-1 text-[13px]", pill && "text-center", helperColor)}>
            Free to join · No spam · Unsubscribe anytime
          </p>
        )}
      </form>

      {ownsModal && (
        <SignupModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          email={submittedEmail}
          presetRole={presetRole}
        />
      )}
    </>
  );
}
