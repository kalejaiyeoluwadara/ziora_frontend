"use client";

import { useWaitlistStats } from "@/lib/api/hooks";
import { cn } from "@/lib/utils";
import { LiveCounter } from "./live-counter";

interface SubscriberCountProps {
  className?: string;
  /** Render style: inline sentence, compact phrase, or large stat. */
  variant?: "inline" | "stat" | "compact";
}

/**
 * Live subscriber count. Per the style guide, the number must be REAL — when
 * the API is unavailable we degrade to neutral copy rather than a fake number.
 */
export function SubscriberCount({
  className,
  variant = "inline",
}: SubscriberCountProps) {
  const { data, isLoading, isError } = useWaitlistStats();

  if (variant === "stat") {
    return (
      <div className={cn("text-center", className)}>
        {isLoading ? (
          <div className="mx-auto h-12 w-40 animate-pulse rounded-lg bg-bg-card" />
        ) : isError || !data ? (
          <p className="font-display text-3xl font-bold text-text-primary">
            Built for Nigerian commerce
          </p>
        ) : (
          <p className="font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            <LiveCounter value={data.totalSubscribers} />
            <span className="text-brand-blue-light">+</span>
          </p>
        )}
        <p className="mt-1 text-sm text-text-secondary">
          early members and counting
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    if (isLoading) {
      return (
        <span
          className={cn(
            "inline-block h-4 w-36 animate-pulse rounded bg-white/20 align-middle",
            className,
          )}
        />
      );
    }
    if (isError || !data || data.totalSubscribers <= 0) {
      return <span className={className}>Be one of the first to join</span>;
    }
    return (
      <span className={className}>
        Join{" "}
        <LiveCounter value={data.totalSubscribers} className="font-semibold" />+
        early members
      </span>
    );
  }

  if (isLoading) {
    return (
      <span
        className={cn(
          "inline-block h-4 w-32 animate-pulse rounded bg-white/20 align-middle",
          className,
        )}
      />
    );
  }

  if (isError || !data || data.totalSubscribers <= 0) {
    return (
      <span className={className}>
        Join early members launching in Lagos first.
      </span>
    );
  }

  return (
    <span className={className}>
      Join <LiveCounter value={data.totalSubscribers} className="font-semibold" />
      + early members launching in Lagos first.
    </span>
  );
}
