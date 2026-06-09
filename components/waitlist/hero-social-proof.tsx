"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { AvatarCluster } from "./avatar-cluster";
import { SubscriberCount } from "./subscriber-count";
import { HERO_SOCIAL_MEMBERS } from "@/lib/waitlist/content";
import { cn } from "@/lib/utils";

const CLUSTER_MEMBERS = HERO_SOCIAL_MEMBERS.slice(0, 5);
const TICKER_MEMBERS = HERO_SOCIAL_MEMBERS;

const tickerSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.7,
};

interface HeroSocialProofProps {
  className?: string;
}

export function HeroSocialProof({ className }: HeroSocialProofProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const member = TICKER_MEMBERS[index % TICKER_MEMBERS.length];
  const clusterActive = index % CLUSTER_MEMBERS.length;

  useEffect(() => {
    if (reduce) return;

    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % TICKER_MEMBERS.length);
    }, 3400);

    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className={cn("relative w-full max-w-md sm:max-w-lg", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-[28px] bg-white/[0.06] blur-xl"
      />

      <div
        className={cn(
          "relative flex flex-col items-center gap-3.5 rounded-[20px]",
          "border border-white/15 bg-white/[0.08] px-6 py-5",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_12px_32px_rgba(8,28,92,0.18)]",
          "backdrop-blur-xl backdrop-saturate-150",
          "supports-[backdrop-filter]:bg-white/[0.06]",
          "sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-3.5",
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />

        <AvatarCluster members={CLUSTER_MEMBERS} activeIndex={clusterActive} />

        <div className="w-full min-w-0 flex-1 text-center sm:text-left">
          <div className="relative h-6 sm:h-5 overflow-hidden w-full">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={member.name}
                initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, y: -14, filter: "blur(4px)" }
                }
                transition={tickerSpring}
                className="absolute inset-0 flex items-center justify-center text-sm font-medium sm:justify-start"
              >
                <span className="font-semibold text-white">{member.name}</span>
                <span className="ml-1.5 text-white/65">just joined</span>
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-0.5 sm:mt-0 text-[13px] font-medium text-white/70">
            <SubscriberCount variant="compact" />
          </p>
        </div>
      </div>
    </div>
  );
}
