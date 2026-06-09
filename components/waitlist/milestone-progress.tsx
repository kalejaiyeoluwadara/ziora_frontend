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
      <div className={cn("rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm", className)}>
        <p className="text-sm font-semibold text-white flex items-center gap-1.5">
          <span>You&apos;ve unlocked every reward. Legend.</span> 🏆
        </p>
      </div>
    );
  }

  const pct = Math.round(progress * 100);

  return (
    <div className={cn("rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm", className)}>
      <div className="flex items-center justify-between text-[13px] font-medium">
        <span className="text-white/60">Your next milestone</span>
        <span className="tabular-nums text-white font-semibold">
          {current} / {next.referrals} referrals
        </span>
      </div>

      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-orange to-accent-deal shadow-[0_0_8px_rgba(255,107,0,0.5)]"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <p className="mt-3 text-[14px] text-white/95 leading-none">
        <span className="font-bold text-[#FF8A00] drop-shadow-[0_2px_4px_rgba(255,138,0,0.1)]">
          {remaining} more
        </span>{" "}
        → <span className="font-medium">{next.reward}</span>
      </p>
    </div>
  );
}
