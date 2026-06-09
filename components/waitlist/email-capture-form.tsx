"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Spinner } from "@/components/icons";
import { WaitlistApiError } from "@/lib/api/client";
import { API_ERROR_CODES } from "@/lib/api/types";
import { subscribeToWaitlist } from "@/lib/api/waitlist";
import { cn } from "@/lib/utils";
import { subscribeSchema, type SubscribeFormValues } from "@/lib/waitlist/schema";
import {
  readReferralCode,
  clearReferralCode,
  saveJoinedSession,
} from "@/lib/waitlist/session";

type Variant = "hero" | "inline" | "sticky";
type Tone = "light" | "dark";

interface EmailCaptureFormProps {
  variant?: Variant;
  className?: string;
  /** Show the optional role-interest selector below the email row. */
  withRole?: boolean;
  /** Render input + button inside a single rounded "pill" container (desktop). */
  pill?: boolean;
  /** Tone of helper/validation text against its background. */
  tone?: Tone;
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
  tone = "dark",
}: EmailCaptureFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState(false);

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
    setDuplicate(false);

    const ref = readReferralCode() ?? undefined;
    const source =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("utm_source") ??
          "organic"
        : "organic";

    try {
      const result = await subscribeToWaitlist({
        email: values.email.trim().toLowerCase(),
        firstName: values.firstName?.trim() || undefined,
        roleInterest: values.roleInterest,
        company: values.company,
        ref,
        source,
      });

      saveJoinedSession({
        email: values.email.trim().toLowerCase(),
        position: result.position,
        referralCode: result.referralCode,
        rank: result.rank,
        referralCount: result.referralCount ?? 0,
        firstName: values.firstName?.trim() || undefined,
      });
      clearReferralCode();

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("waitlist_signup"));
      }

      router.push("/joined");
    } catch (err) {
      if (err instanceof WaitlistApiError) {
        if (err.code === API_ERROR_CODES.DUPLICATE_EMAIL) {
          setDuplicate(true);
          return;
        }
        if (err.code === API_ERROR_CODES.RATE_LIMITED) {
          setServerError(
            "We couldn't process that signup. Please try again shortly.",
          );
          return;
        }
        setServerError(err.message);
        return;
      }
      setServerError("Something went wrong. Please try again shortly.");
    }
  }

  const compact = variant === "sticky";

  const helperColor = tone === "light" ? "text-white/70" : "text-text-muted";
  const errorColor = tone === "light" ? "text-red-100" : "text-red-500";
  const dupColor = tone === "light" ? "text-white/80" : "text-text-secondary";

  return (
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
            "rounded-2xl bg-white p-2 shadow-xl shadow-brand-blue-dark/15 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full",
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
              "h-12 w-full text-base text-text-primary placeholder:text-text-muted focus:outline-none",
              pill
                ? "rounded-xl bg-bg-card px-4 focus:ring-2 focus:ring-brand-blue-light/30 sm:rounded-full sm:bg-transparent sm:px-5 sm:focus:ring-0"
                : "rounded-xl border border-transparent bg-bg-card px-4 transition-shadow focus:ring-2 focus:ring-brand-blue-light/30",
              errors.email && "ring-2 ring-red-400/50",
            )}
            {...register("email")}
            onChange={(e) => {
              setValue("email", e.target.value);
              if (duplicate) setDuplicate(false);
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
        {duplicate && (
          <p className={cn("mt-2 text-sm", dupColor)}>
            You&apos;re already on the list. Check your inbox for your spot —
            we&apos;ll be in touch when your wave opens.
          </p>
        )}
      </div>

      {!compact && (
        <p className={cn("mt-1 text-[13px]", pill && "text-center", helperColor)}>
          Free to join · No spam · Unsubscribe anytime
        </p>
      )}
    </form>
  );
}
