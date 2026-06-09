"use client";

import { motion, useReducedMotion } from "motion/react";
import { getMilestoneProgress } from "@/lib/waitlist/milestones";
import { cn } from "@/lib/utils";

interface MilestoneProgressProps {
  referralCount: number;
  className?: string;
}

/** Shows progress toward the NEXT milestone only (reduces cognitive load). */
export function MilestoneProgress({
  referralCount,
  className,
}: MilestoneProgressProps) {
  const reduce = useReducedMotion();
  const { next, remaining, progress, current } =
    getMilestoneProgress(referralCount);

  if (!next) {
    return (
      <div className={cn("rounded-xl bg-bg-card p-4", className)}>
        <p className="text-sm font-medium text-text-primary">
          You&apos;ve unlocked every reward. Legend. 🏆
        </p>
      </div>
    );
  }

  const pct = Math.round(progress * 100);

  return (
    <div className={cn("rounded-xl bg-bg-card p-4", className)}>
      <div className="flex items-center justify-between text-[13px] font-medium">
        <span className="text-text-secondary">Your next milestone</span>
        <span className="tabular-nums text-text-primary">
          {current} / {next.referrals} referrals
        </span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white">
        <motion.div
          className="h-full rounded-full bg-accent-orange"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <p className="mt-2.5 text-[14px] text-text-primary">
        <span className="font-semibold text-accent-orange">
          {remaining} more
        </span>{" "}
        → {next.reward}
      </p>
    </div>
  );
}
